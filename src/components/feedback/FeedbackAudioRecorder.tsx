"use client";

import { type ReactNode, useRef, useState } from "react";
import { Mic, Square, Loader2, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/client";

export interface RecordedAudio {
  url: string;
  mimeType: string;
  durationSec: number;
}

interface FeedbackAudioRecorderProps {
  maxDurationSec: number;
  disabled?: boolean;
  action?: ReactNode;
  onRecorded: (audio: RecordedAudio) => void;
  onRecordingStateChange?: (isRecording: boolean) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  onClear?: () => void;
}

export function FeedbackAudioRecorder({
  maxDurationSec,
  disabled = false,
  action,
  onRecorded,
  onRecordingStateChange,
  onUploadStateChange,
  onClear,
}: FeedbackAudioRecorderProps) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [durationSec, setDurationSec] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<RecordedAudio | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const getUploadUrlMutation = api.upload.getUploadUrl.useMutation();

  const setUploadingState = (nextState: boolean) => {
    setIsUploading(nextState);
    onUploadStateChange?.(nextState);
  };

  const cleanupStream = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    recorderRef.current = null;
    chunksRef.current = [];
    startedAtRef.current = null;
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  };

  const startRecording = async () => {
    if (disabled || isRecording) return;

    if (!navigator.mediaDevices || typeof MediaRecorder === "undefined") {
      setError("Audio recording is not supported in this browser.");
      return;
    }

    setError(null);
    setDurationSec(0);
    startedAtRef.current = Date.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : undefined,
      });
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        onRecordingStateChange?.(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        const elapsedMs = startedAtRef.current
          ? Date.now() - startedAtRef.current
          : durationSec * 1000;
        const finalDurationSec = Math.max(
          1,
          Math.min(maxDurationSec, Math.ceil(elapsedMs / 1000))
        );
        setDurationSec(finalDurationSec);

        if (blob.size === 0) {
          cleanupStream();
          return;
        }

        try {
          setUploadingState(true);
          const filename = `feedback-audio-${Date.now()}.webm`;
          const upload = await getUploadUrlMutation.mutateAsync({
            filename,
            contentType: blob.type,
            size: blob.size,
          });

          const uploadResponse = await fetch(upload.uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": blob.type,
            },
            body: blob,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Audio upload failed (${uploadResponse.status})`);
          }

          const recordedAudio: RecordedAudio = {
            url: upload.publicUrl,
            mimeType: blob.type,
            durationSec: finalDurationSec,
          };

          setUploadedAudio(recordedAudio);
          onRecorded(recordedAudio);
        } catch (uploadError) {
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "Failed to upload audio"
          );
        } finally {
          setUploadingState(false);
          cleanupStream();
        }
      };

      recorder.start(250);
      setIsRecording(true);
      onRecordingStateChange?.(true);

      timerRef.current = setInterval(() => {
        setDurationSec((current) => {
          const next = current + 1;
          if (next >= maxDurationSec) {
            stopRecording();
            return maxDurationSec;
          }
          return next;
        });
      }, 1000);
    } catch (recordingError) {
      onRecordingStateChange?.(false);
      cleanupStream();
      setError(
        recordingError instanceof Error
          ? recordingError.message
          : "Failed to access microphone"
      );
    }
  };

  const clearAudio = () => {
    setUploadedAudio(null);
    setError(null);
    setDurationSec(0);
    onClear?.();
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {!isRecording ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={startRecording}
            disabled={disabled || isUploading || getUploadUrlMutation.isPending}
            className="gap-2"
          >
            {getUploadUrlMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            Yap
          </Button>
        ) : (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={stopRecording}
            className="gap-2"
          >
            <Square className="h-3.5 w-3.5" />
            Stop ({durationSec}s)
          </Button>
        )}

        {action}

        {uploadedAudio && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAudio}
            className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            Remove audio
          </Button>
        )}
      </div>

      {uploadedAudio && (
        <p className="text-xs text-muted-foreground">
          Audio attached ({uploadedAudio.durationSec}s)
        </p>
      )}

      {isUploading && (
        <p className="text-xs text-muted-foreground">Uploading audio...</p>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
