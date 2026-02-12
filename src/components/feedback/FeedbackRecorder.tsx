"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Pause, Play, Square, Video, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/client";
import {
  DEFAULT_FEEDBACK_MAX_VIDEO_SIZE,
  MULTIPART_UPLOAD_MAX_RETRIES_PER_PART,
  MULTIPART_UPLOAD_PARALLEL_PARTS,
  MULTIPART_UPLOAD_PART_SIZE,
} from "~/lib/validators";
import { cn } from "~/lib/utils";

interface SavedRecording {
  videoUrl: string;
  videoMimeType: string;
  videoSize: number;
  durationMs: number;
  hasCamera: boolean;
}

interface FeedbackRecorderProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  maxDurationSec: number;
  maxSizeBytes: number;
  disabled?: boolean;
  className?: string;
  onTimeUpdate: (timeMs: number) => void;
  onCameraStreamChange: (stream: MediaStream | null) => void;
  onRecordingStart: () => void;
  onRecordingStop: () => void;
  onSaved: (recording: SavedRecording) => Promise<void> | void;
}

function chooseRecorderMimeType() {
  const mimeTypes = [
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  for (const mimeType of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  return "";
}

function getFileExtensionForMimeType(mimeType: string) {
  if (mimeType.includes("mp4")) {
    return "mp4";
  }

  return "webm";
}

export function FeedbackRecorder({
  canvasRef,
  maxDurationSec,
  maxSizeBytes,
  disabled = false,
  className,
  onTimeUpdate,
  onCameraStreamChange,
  onRecordingStart,
  onRecordingStop,
  onSaved,
}: FeedbackRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const discardRef = useRef(false);

  const micStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const composedStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const startMultipartMutation = api.upload.startMultipartUpload.useMutation();
  const partUrlMutation = api.upload.getMultipartPartUrl.useMutation();
  const completeMultipartMutation = api.upload.completeMultipartUpload.useMutation();
  const abortMultipartMutation = api.upload.abortMultipartUpload.useMutation();
  const normalizedMaxDurationSec = Number.isFinite(maxDurationSec)
    ? Math.min(3600, Math.max(30, Math.floor(maxDurationSec)))
    : 300;
  const normalizedMaxSizeBytes = Number.isFinite(maxSizeBytes)
    ? Math.max(10 * 1024 * 1024, Math.floor(maxSizeBytes))
    : DEFAULT_FEEDBACK_MAX_VIDEO_SIZE;

  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const cleanupMedia = () => {
    clearTimers();

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }

    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }

    if (composedStreamRef.current) {
      composedStreamRef.current.getTracks().forEach((track) => track.stop());
      composedStreamRef.current = null;
    }

    onCameraStreamChange(null);
    recorderRef.current = null;
    chunksRef.current = [];
  };

  const uploadPartWithRetry = async (
    params: {
      key: string;
      uploadId: string;
      partNumber: number;
      chunk: Blob;
      contentType: string;
    },
    attempt = 0
  ): Promise<{ partNumber: number; etag?: string }> => {
    try {
      const signedPart = await partUrlMutation.mutateAsync({
        key: params.key,
        uploadId: params.uploadId,
        partNumber: params.partNumber,
      });

      const response = await fetch(signedPart.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": params.contentType,
        },
        body: params.chunk,
      });

      if (!response.ok) {
        throw new Error(`Part ${params.partNumber} upload failed (${response.status})`);
      }

      const etag = response.headers.get("etag") || response.headers.get("ETag");
      return {
        partNumber: params.partNumber,
        etag: etag ?? undefined,
      };
    } catch (uploadError) {
      if (attempt + 1 >= MULTIPART_UPLOAD_MAX_RETRIES_PER_PART) {
        throw uploadError;
      }
      return uploadPartWithRetry(params, attempt + 1);
    }
  };

  const uploadRecordingBlob = async (
    blob: Blob,
    mimeType: string
  ): Promise<string> => {
    const extension = getFileExtensionForMimeType(mimeType);
    const start = await startMultipartMutation.mutateAsync({
      filename: `feedback-${Date.now()}.${extension}`,
      contentType: mimeType,
      size: blob.size,
    });

    const totalParts = Math.ceil(blob.size / MULTIPART_UPLOAD_PART_SIZE);
    const uploadedParts: Array<{ partNumber: number; etag?: string }> = [];

    let nextPart = 1;

    const worker = async () => {
      while (nextPart <= totalParts) {
        const partNumber = nextPart;
        nextPart += 1;

        const startByte = (partNumber - 1) * MULTIPART_UPLOAD_PART_SIZE;
        const endByte = Math.min(startByte + MULTIPART_UPLOAD_PART_SIZE, blob.size);
        const chunk = blob.slice(startByte, endByte);

        const uploadedPart = await uploadPartWithRetry({
          key: start.key,
          uploadId: start.uploadId,
          partNumber,
          chunk,
          contentType: mimeType,
        });

        uploadedParts.push(uploadedPart);
      }
    };

    try {
      const workers = Array.from({
        length: Math.min(MULTIPART_UPLOAD_PARALLEL_PARTS, totalParts),
      }).map(() => worker());

      await Promise.all(workers);

      const completeInput =
        uploadedParts.length > 0 && uploadedParts.every((part) => !!part.etag)
          ? {
              key: start.key,
              uploadId: start.uploadId,
              parts: uploadedParts.map((part) => ({
                partNumber: part.partNumber,
                etag: part.etag as string,
              })),
            }
          : {
              key: start.key,
              uploadId: start.uploadId,
            };

      const completed = await completeMultipartMutation.mutateAsync(completeInput);

      return completed.publicUrl;
    } catch (multipartError) {
      try {
        await abortMultipartMutation.mutateAsync({
          key: start.key,
          uploadId: start.uploadId,
        });
      } catch {
        // Ignore abort errors and surface the original multipart failure.
      }
      throw multipartError;
    }
  };

  const stopRecorder = (discard = false) => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return;
    }

    discardRef.current = discard;
    setIsStopping(true);
    recorder.stop();
  };

  const beginRecording = async () => {
    const sourceCanvas = canvasRef.current;
    if (!sourceCanvas) {
      setError("Recording canvas is not available.");
      return;
    }

    if (!navigator.mediaDevices || typeof MediaRecorder === "undefined") {
      setError("Screen recording is not supported in this browser.");
      return;
    }

    setError(null);
    setIsPaused(false);
    setElapsedMs(0);
    elapsedRef.current = 0;
    pausedRef.current = false;
    discardRef.current = false;

    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = micStream;

      const captureScale = Math.min(1, 1920 / sourceCanvas.width);
      const captureCanvas = document.createElement("canvas");
      captureCanvas.width = Math.max(2, Math.round(sourceCanvas.width * captureScale));
      captureCanvas.height = Math.max(2, Math.round(sourceCanvas.height * captureScale));
      const captureContext = captureCanvas.getContext("2d");
      if (!captureContext) {
        throw new Error("Unable to initialize recording surface.");
      }

      captureContext.imageSmoothingEnabled = true;
      captureContext.imageSmoothingQuality = "high";

      const drawCaptureFrame = (
        cameraVideo?: HTMLVideoElement | null
      ) => {
        captureContext.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
        captureContext.drawImage(
          sourceCanvas,
          0,
          0,
          captureCanvas.width,
          captureCanvas.height
        );

        if (cameraVideo && cameraVideo.readyState >= 2) {
          const pipWidth = Math.max(180, Math.floor(captureCanvas.width * 0.22));
          const pipHeight = Math.floor((pipWidth * 9) / 16);
          const pipX = captureCanvas.width - pipWidth - 16;
          const pipY = captureCanvas.height - pipHeight - 16;

          captureContext.fillStyle = "rgba(0, 0, 0, 0.4)";
          captureContext.fillRect(pipX - 2, pipY - 2, pipWidth + 4, pipHeight + 4);
          captureContext.drawImage(cameraVideo, pipX, pipY, pipWidth, pipHeight);
        }
      };

      if (cameraEnabled) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 360,
          },
        });
        cameraStreamRef.current = cameraStream;
        onCameraStreamChange(cameraStream);

        const cameraVideo = document.createElement("video");
        cameraVideo.srcObject = cameraStream;
        cameraVideo.muted = true;
        cameraVideo.playsInline = true;
        await cameraVideo.play();
        const drawComposite = () => {
          drawCaptureFrame(cameraVideo);
          rafRef.current = requestAnimationFrame(drawComposite);
        };
        drawComposite();
      } else {
        const drawCanvasOnly = () => {
          drawCaptureFrame(null);
          rafRef.current = requestAnimationFrame(drawCanvasOnly);
        };
        drawCanvasOnly();
      }

      let streamToRecord = captureCanvas.captureStream(30);

      for (const audioTrack of micStream.getAudioTracks()) {
        streamToRecord.addTrack(audioTrack);
      }

      composedStreamRef.current = streamToRecord;

      const preferredMimeType = chooseRecorderMimeType();
      const recorder = new MediaRecorder(
        streamToRecord,
        preferredMimeType ? { mimeType: preferredMimeType } : undefined
      );
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        clearTimers();
        setIsRecording(false);
        setIsPaused(false);
        onRecordingStop();

        const resolvedMimeType =
          recorder.mimeType || preferredMimeType || "video/webm";
        const blob = new Blob(chunksRef.current, {
          type: resolvedMimeType,
        });

        const durationMs = elapsedRef.current;

        if (discardRef.current) {
          cleanupMedia();
          setIsStopping(false);
          return;
        }

        if (blob.size > normalizedMaxSizeBytes) {
          cleanupMedia();
          setIsStopping(false);
          setError(
            `Recording is too large (${Math.round(blob.size / (1024 * 1024))}MB).`
          );
          return;
        }

        try {
          const publicUrl = await uploadRecordingBlob(blob, resolvedMimeType);
          await onSaved({
            videoUrl: publicUrl,
            videoMimeType: resolvedMimeType,
            videoSize: blob.size,
            durationMs,
            hasCamera: cameraEnabled,
          });
          setError(null);
        } catch (uploadError) {
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "Failed to upload recording"
          );
        } finally {
          cleanupMedia();
          setIsStopping(false);
        }
      };

      recorder.start(1000);
      setIsRecording(true);
      onRecordingStart();

      timerRef.current = setInterval(() => {
        if (pausedRef.current) {
          return;
        }

        elapsedRef.current += 250;
        const nextElapsed = elapsedRef.current;
        setElapsedMs(nextElapsed);
        onTimeUpdate(nextElapsed);

        if (nextElapsed >= normalizedMaxDurationSec * 1000) {
          stopRecorder(false);
        }
      }, 250);
    } catch (recordingError) {
      cleanupMedia();
      setError(
        recordingError instanceof Error
          ? recordingError.message
          : "Unable to start recording"
      );
    }
  };

  const startWithCountdown = () => {
    if (disabled || isRecording || isStopping) return;

    setCountdown(3);
    countdownRef.current = setInterval(() => {
      setCountdown((current) => {
        const next = (current ?? 1) - 1;
        if (next <= 0) {
          clearTimers();
          void beginRecording();
          return null;
        }
        return next;
      });
    }, 1000);
  };

  const togglePause = () => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return;
    }

    if (isPaused) {
      recorder.resume();
      pausedRef.current = false;
      setIsPaused(false);
      return;
    }

    recorder.pause();
    pausedRef.current = true;
    setIsPaused(true);
  };

  const formattedSeconds = Math.floor(elapsedMs / 1000);

  useEffect(() => {
    return () => {
      cleanupMedia();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
        <div className="flex items-center gap-3 rounded-full border border-border/80 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
          {!isRecording ? (
            <>
              <Button
                type="button"
                onClick={startWithCountdown}
                disabled={disabled || isStopping}
                size="sm"
                className="gap-2 rounded-full px-5"
              >
                {isStopping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
                <span className="font-medium">Start Recording</span>
              </Button>

              <div className="h-5 w-px bg-border" />

              <label className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <input
                  type="checkbox"
                  checked={cameraEnabled}
                  onChange={(event) => setCameraEnabled(event.target.checked)}
                  disabled={isRecording || isStopping || disabled}
                  className="h-3.5 w-3.5 rounded border-border accent-primary"
                />
                <Camera className="h-3.5 w-3.5" />
                <span>Camera</span>
              </label>

              <div className="text-xs text-muted-foreground">
                {countdown !== null && `Starting in ${countdown}...`}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                <span className="text-sm font-medium tabular-nums text-destructive">
                  {formattedSeconds}s
                </span>
              </div>

              <div className="h-5 w-px bg-border" />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={togglePause}
                disabled={isStopping}
                className="gap-2 rounded-full"
              >
                {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => stopRecorder(false)}
                disabled={isStopping}
                className="gap-2 rounded-full bg-destructive hover:bg-destructive/90"
              >
                <Square className="h-3.5 w-3.5" />
                Stop & Save
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => stopRecorder(true)}
                disabled={isStopping}
                className="gap-2 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
            </>
          )}
        </div>

        {error && (
          <div className="mt-2 rounded-full border border-destructive/50 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
