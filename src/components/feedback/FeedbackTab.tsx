"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Brush, Highlighter, MoveRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "~/components/ui/toast";
import { api } from "~/lib/trpc/client";
import { cn, pluralize } from "~/lib/utils";
import { FeedbackCanvas } from "~/components/feedback/FeedbackCanvas";
import { FeedbackRecorder } from "~/components/feedback/FeedbackRecorder";
import { FeedbackPlayer } from "~/components/feedback/FeedbackPlayer";
import { FeedbackRegionComposer } from "~/components/feedback/FeedbackRegionComposer";
import type { SerializedEditorState } from "lexical";
import { DEFAULT_FEEDBACK_MAX_VIDEO_SIZE } from "~/lib/validators";

interface FeedbackTabProps {
  postId: string;
  initialFrameAttachmentUrl?: string | null;
}

type RecordingTool = "PEN" | "ARROW" | "HIGHLIGHT";

interface DraftAnnotationEvent {
  frameId?: string;
  tool: "PEN" | "ARROW" | "HIGHLIGHT" | "FRAME_CHANGE";
  tStartMs: number;
  tEndMs: number;
  payload: unknown;
}

interface RegionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ViewportPoint {
  x: number;
  y: number;
}

interface FeedbackToast {
  id: string;
  title: string;
  description?: string;
}

const COMPOSER_WIDTH_PX = 320;
const COMPOSER_HEIGHT_PX = 280;
const COMPOSER_MARGIN_PX = 8;

function getFrameIdFromFrameChangePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const maybeFrameId = (payload as Record<string, unknown>).frameId;
  return typeof maybeFrameId === "string" ? maybeFrameId : null;
}

function normalizeAttachmentUrl(url: string) {
  return url.split("?")[0] ?? url;
}

export function FeedbackTab({
  postId,
  initialFrameAttachmentUrl = null,
}: FeedbackTabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const utils = api.useUtils();

  const [mode, setMode] = useState<"view" | "record">("view");
  const [activeTool, setActiveTool] = useState<RecordingTool>("PEN");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimeMs, setRecordingTimeMs] = useState(0);
  const [playbackTimeMs, setPlaybackTimeMs] = useState(0);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    searchParams.get("session")
  );
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [pendingAnnotations, setPendingAnnotations] = useState<DraftAnnotationEvent[]>([]);
  const [pendingRegion, setPendingRegion] = useState<RegionRect | null>(null);
  const [composerPosition, setComposerPosition] = useState<ViewportPoint | null>(
    null
  );
  const [composerOpen, setComposerOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [recordingSupported, setRecordingSupported] = useState(true);
  const [toasts, setToasts] = useState<FeedbackToast[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewedArtifactRef = useRef<string | null>(null);
  const viewedSessionsRef = useRef<Set<string>>(new Set());

  const { data: feedbackConfig, isLoading: isLoadingFeedbackConfig } =
    api.site.getFeedbackConfig.useQuery();

  const isFeatureEnabledGlobally = !!feedbackConfig?.visualFeedbackEnabled;
  const maxVideoDurationSec = Math.min(
    3600,
    Math.max(30, feedbackConfig?.feedbackMaxVideoDurationSec ?? 300)
  );
  const maxAudioDurationSec = Math.min(
    300,
    Math.max(5, feedbackConfig?.feedbackMaxAudioDurationSec ?? 30)
  );
  const maxVideoSizeBytes = Math.max(
    10 * 1024 * 1024,
    feedbackConfig?.feedbackMaxVideoSizeBytes ?? DEFAULT_FEEDBACK_MAX_VIDEO_SIZE
  );

  const { data: feedbackData, isLoading: isLoadingFeedbackData } =
    api.feedback.getByPost.useQuery(
      { postId },
      {
        enabled: isFeatureEnabledGlobally,
      }
    );

  const artifact = feedbackData?.artifact;
  const frames = artifact?.frames ?? [];
  const sessions = artifact?.sessions ?? [];
  const highlightedCommentId = searchParams.get("comment");
  const shouldLoadSelectedSession =
    !!selectedSessionId &&
    sessions.some((feedbackSession) => feedbackSession.id === selectedSessionId);

  const {
    data: selectedSession,
    isLoading: isLoadingSelectedSession,
  } = api.feedback.getSession.useQuery(
    { sessionId: selectedSessionId! },
    {
      enabled: shouldLoadSelectedSession,
      retry: false,
    }
  );

  const createSessionMutation = api.feedback.createSession.useMutation();
  const appendAnnotationsMutation = api.feedback.appendAnnotations.useMutation();
  const createCommentMutation = api.feedback.createComment.useMutation();
  const recordViewMutation = api.feedback.recordView.useMutation();
  const recordWatchTimeMutation = api.feedback.recordWatchTime.useMutation();
  const showToast = useCallback((title: string, description?: string) => {
    setToasts((current) => [
      ...current,
      {
        id:
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        title,
        description,
      },
    ]);
  }, []);

  const handlePlaybackTimeUpdate = useCallback((timeMs: number) => {
    setPlaybackTimeMs(timeMs);
  }, []);
  const handlePlaybackWatchChunk = useCallback(
    (deltaMs: number) => {
      if (!selectedSessionId || recordWatchTimeMutation.isPending) {
        return;
      }

      recordWatchTimeMutation.mutate({
        sessionId: selectedSessionId,
        deltaMs,
      });
    },
    [recordWatchTimeMutation, selectedSessionId]
  );

  const updateFeedbackQueryParams = useCallback(
    (updates: {
      session?: string | null;
      comment?: string | null;
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "feedback");

      if (updates.session === null) {
        params.delete("session");
      } else if (updates.session) {
        params.set("session", updates.session);
      }

      if (updates.comment === null) {
        params.delete("comment");
      } else if (updates.comment) {
        params.set("comment", updates.comment);
      }

      const queryString = params.toString();
      router.replace(
        queryString ? `${pathname}?${queryString}` : `${pathname}?tab=feedback`,
        { scroll: false }
      );
    },
    [pathname, router, searchParams]
  );

  const clampComposerPosition = useCallback((point: ViewportPoint): ViewportPoint => {
    if (typeof window === "undefined") {
      return point;
    }

    const maxX = Math.max(
      COMPOSER_MARGIN_PX,
      window.innerWidth - COMPOSER_WIDTH_PX - COMPOSER_MARGIN_PX
    );
    const maxY = Math.max(
      COMPOSER_MARGIN_PX,
      window.innerHeight - COMPOSER_HEIGHT_PX - COMPOSER_MARGIN_PX
    );

    return {
      x: Math.min(maxX, Math.max(COMPOSER_MARGIN_PX, point.x)),
      y: Math.min(maxY, Math.max(COMPOSER_MARGIN_PX, point.y)),
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => {
      const mobile = mediaQuery.matches;
      const supportsCanvasStream =
        typeof HTMLCanvasElement !== "undefined" &&
        typeof HTMLCanvasElement.prototype.captureStream === "function";
      setIsMobile(mobile);
      setRecordingSupported(
        !mobile &&
          supportsCanvasStream &&
          typeof MediaRecorder !== "undefined" &&
          !!navigator.mediaDevices?.getUserMedia
      );
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const sessionParam = searchParams.get("session");
    setSelectedSessionId(sessionParam);
  }, [searchParams]);

  useEffect(() => {
    if (sessions.length === 0) {
      if (selectedSessionId) {
        setSelectedSessionId(null);
        updateFeedbackQueryParams({ session: null, comment: null });
      }
      return;
    }

    if (selectedSessionId && !sessions.some((session) => session.id === selectedSessionId)) {
      setSelectedSessionId(null);
      updateFeedbackQueryParams({ session: null, comment: null });
      return;
    }
  }, [selectedSessionId, sessions, updateFeedbackQueryParams]);

  useEffect(() => {
    if (frames.length === 0) {
      setSelectedFrameId(null);
      return;
    }

    const hasSelectedFrame =
      selectedFrameId && frames.some((frame) => frame.id === selectedFrameId);

    if (!hasSelectedFrame) {
      setSelectedFrameId(frames[0]?.id ?? null);
    }
  }, [frames, selectedFrameId]);

  useEffect(() => {
    if (!initialFrameAttachmentUrl || frames.length === 0) {
      return;
    }

    const normalizedTarget = normalizeAttachmentUrl(initialFrameAttachmentUrl);
    const matchingFrame = frames.find(
      (frame) => normalizeAttachmentUrl(frame.url) === normalizedTarget
    );

    if (matchingFrame && matchingFrame.id !== selectedFrameId) {
      setSelectedFrameId(matchingFrame.id);
    }
  }, [frames, initialFrameAttachmentUrl, selectedFrameId]);

  useEffect(() => {
    if (!artifact?.id || viewedArtifactRef.current === artifact.id) {
      return;
    }

    viewedArtifactRef.current = artifact.id;
    recordViewMutation.mutate({ postId });
  }, [artifact?.id, postId, recordViewMutation]);

  useEffect(() => {
    if (!selectedSessionId || viewedSessionsRef.current.has(selectedSessionId)) {
      return;
    }

    viewedSessionsRef.current.add(selectedSessionId);
    recordViewMutation.mutate({
      postId,
      sessionId: selectedSessionId,
    });
  }, [selectedSessionId, postId, recordViewMutation]);

  useEffect(() => {
    if (!selectedSession || isRecording) {
      return;
    }

    const frameChanges = selectedSession.annotations
      .filter((annotation) => annotation.tool === "FRAME_CHANGE")
      .sort((a, b) => a.tStartMs - b.tStartMs);

    let playbackFrameId: string | null = frames[0]?.id ?? null;

    for (const event of frameChanges) {
      if (event.tStartMs > playbackTimeMs) {
        break;
      }
      const frameId = getFrameIdFromFrameChangePayload(event.payload);
      if (frameId) {
        playbackFrameId = frameId;
      }
    }

    if (playbackFrameId && playbackFrameId !== selectedFrameId) {
      setSelectedFrameId(playbackFrameId);
    }
  }, [selectedSession, playbackTimeMs, frames, isRecording, selectedFrameId]);

  const currentFrame = useMemo(
    () => frames.find((frame) => frame.id === selectedFrameId) ?? frames[0] ?? null,
    [frames, selectedFrameId]
  );

  const canvasAnnotations = useMemo(() => {
    if (isRecording) {
      return pendingAnnotations.map((annotation, index) => ({
        id: `draft-${index}`,
        tool: annotation.tool,
        tStartMs: annotation.tStartMs,
        tEndMs: annotation.tEndMs,
        payload: annotation.payload,
      }));
    }

    return selectedSession?.annotations ?? [];
  }, [isRecording, pendingAnnotations, selectedSession]);

  const feedbackComments = artifact?.comments ?? [];
  const frameComments = feedbackComments.filter(
    (comment) => comment.frame?.id === currentFrame?.id
  );

  const handleSelectFrame = (frameId: string) => {
    if (isRecording && selectedFrameId && selectedFrameId !== frameId) {
      setPendingAnnotations((current) => [
        ...current,
        {
          frameId,
          tool: "FRAME_CHANGE",
          tStartMs: recordingTimeMs,
          tEndMs: recordingTimeMs,
          payload: { frameId },
        },
      ]);
    }

    setSelectedFrameId(frameId);
  };

  const handleSaveRecording = async (recording: {
    videoUrl: string;
    videoMimeType: string;
    videoSize: number;
    durationMs: number;
    hasCamera: boolean;
  }) => {
    const sessionResult = await createSessionMutation.mutateAsync({
      postId,
      type: "VIDEO",
      recording,
    });

    if (pendingAnnotations.length > 0) {
      await appendAnnotationsMutation.mutateAsync({
        sessionId: sessionResult.id,
        events: pendingAnnotations.map((annotation, index) => ({
          frameId: annotation.frameId,
          tool: annotation.tool,
          tStartMs: annotation.tStartMs,
          tEndMs: annotation.tEndMs,
          payload: annotation.payload,
          order: index,
        })),
      });
    }

    setPendingAnnotations([]);
    setSelectedSessionId(sessionResult.id);
    setMode("view");
    updateFeedbackQueryParams({ session: sessionResult.id });

    await Promise.all([
      utils.feedback.getByPost.invalidate({ postId }),
      utils.feedback.getSession.invalidate({ sessionId: sessionResult.id }),
    ]);

    showToast("Video feedback saved", "Your recording is ready to review.");
  };

  const handleCreateComment = async (payload: {
    body?: SerializedEditorState;
    audio?: { url: string; mimeType: string; durationSec: number };
  }) => {
    if (!currentFrame || !pendingRegion) {
      return;
    }

    await createCommentMutation.mutateAsync({
      postId,
      frameId: currentFrame.id,
      sessionId: selectedSessionId || undefined,
      body: payload.body,
      audio: payload.audio,
      region: pendingRegion,
      timestampMs: selectedSessionId ? playbackTimeMs : undefined,
    });

    setComposerOpen(false);
    setPendingRegion(null);
    setComposerPosition(null);
    setMode("view");

    await Promise.all([
      utils.feedback.getByPost.invalidate({ postId }),
      selectedSessionId
        ? utils.feedback.getSession.invalidate({ sessionId: selectedSessionId })
        : Promise.resolve(),
    ]);

    showToast("Feedback submitted", "Your region feedback was added.");
  };

  const frameCount = frames.length;
  const isRecordingFullscreen = isRecording && mode === "record";

  useEffect(() => {
    if (!isRecordingFullscreen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isRecordingFullscreen]);

  if (isLoadingFeedbackConfig || (isFeatureEnabledGlobally && isLoadingFeedbackData)) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Loading visual feedback...
      </p>
    );
  }

  if (!isFeatureEnabledGlobally) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Visual feedback is disabled by your workspace admin.
      </p>
    );
  }

  if (!feedbackData?.visualFeedbackEnabled) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Visual feedback is disabled for this post.
      </p>
    );
  }

  if (!artifact || frameCount === 0) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        No image frames are available for visual feedback.
      </p>
    );
  }

  return (
    <ToastProvider>
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-3 bg-transparent text-base font-normal leading-6">
                {!isRecordingFullscreen && frameCount > 1 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {frames.map((frame) => (
                      <Button
                        key={frame.id}
                        type="button"
                        variant={currentFrame?.id === frame.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelectFrame(frame.id)}
                      >
                        Frame {frame.order + 1}
                      </Button>
                    ))}
                    <Badge variant="secondary">
                      {frameCount} {pluralize(frameCount, "frame")}
                    </Badge>
                  </div>
                )}

                <div
                  className={cn(
                    isRecordingFullscreen &&
                      "fixed inset-0 z-[60] flex flex-col bg-background/95 p-4 backdrop-blur-sm"
                  )}
                >
                  {isRecordingFullscreen && (
                    <div className="mx-auto mb-3 flex w-full max-w-6xl flex-wrap items-center gap-2 rounded-lg border bg-card/95 p-2 shadow-xl">
                      {frameCount > 1 &&
                        frames.map((frame) => (
                          <Button
                            key={frame.id}
                            type="button"
                            variant={currentFrame?.id === frame.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSelectFrame(frame.id)}
                          >
                            Frame {frame.order + 1}
                          </Button>
                        ))}
                      {frameCount > 1 && (
                        <Badge variant="secondary" className="ml-auto">
                          {frameCount} {pluralize(frameCount, "frame")}
                        </Badge>
                      )}
                      <Button
                        type="button"
                        variant={activeTool === "PEN" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTool("PEN")}
                        className="gap-1"
                      >
                        <Brush className="h-3.5 w-3.5" />
                        Pen
                      </Button>
                      <Button
                        type="button"
                        variant={activeTool === "ARROW" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTool("ARROW")}
                        className="gap-1"
                      >
                        <MoveRight className="h-3.5 w-3.5" />
                        Arrow
                      </Button>
                      <Button
                        type="button"
                        variant={activeTool === "HIGHLIGHT" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTool("HIGHLIGHT")}
                        className="gap-1"
                      >
                        <Highlighter className="h-3.5 w-3.5" />
                        Highlight
                      </Button>
                    </div>
                  )}

                  <div
                    className={cn(
                      isRecordingFullscreen &&
                        "mx-auto flex h-full w-full max-w-6xl items-center justify-center pb-24"
                    )}
                  >
                    <FeedbackCanvas
                      frame={currentFrame}
                      annotations={canvasAnnotations}
                      comments={frameComments}
                      mode={mode}
                      activeTool={activeTool}
                      currentTimeMs={playbackTimeMs}
                      recordingTimeMs={recordingTimeMs}
                      isRecording={isRecording}
                      cameraStream={cameraStream}
                      highlightedCommentId={highlightedCommentId}
                      onCanvasReady={(canvas) => {
                        canvasRef.current = canvas;
                      }}
                      onCommentSelect={(commentId) => {
                        updateFeedbackQueryParams({ comment: commentId });
                      }}
                      onAnnotationCreate={(annotationEvent) => {
                        if (!currentFrame) return;

                        setPendingAnnotations((current) => [
                          ...current,
                          {
                            frameId: currentFrame.id,
                            ...annotationEvent,
                          },
                        ]);
                      }}
                      onRegionCreate={({ region, anchorViewport }) => {
                        setPendingRegion(region);
                        setComposerPosition(clampComposerPosition(anchorViewport));
                        setComposerOpen(true);
                      }}
                    />
                  </div>
                </div>

                {composerOpen && pendingRegion && composerPosition && (
                  <div
                    className="fixed z-[80]"
                    style={{
                      left: `${composerPosition.x}px`,
                      top: `${composerPosition.y}px`,
                    }}
                  >
                    <FeedbackRegionComposer
                      open={composerOpen}
                      className="w-[min(320px,calc(100vw-1rem))] border bg-card/95 shadow-2xl backdrop-blur-sm"
                      maxAudioDurationSec={maxAudioDurationSec}
                      submitting={createCommentMutation.isPending}
                      onCancel={() => {
                        setComposerOpen(false);
                        setPendingRegion(null);
                        setComposerPosition(null);
                        setMode("view");
                      }}
                      onSubmit={handleCreateComment}
                    />
                  </div>
                )}

                {!recordingSupported && (
                  <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5" />
                    <p>
                      {isMobile
                        ? "Recording is unavailable on mobile. You can still leave region comments."
                        : "Recording is unavailable in this browser. You can still leave region comments."}
                    </p>
                  </div>
                )}

                {selectedSession?.type === "VIDEO" && (
                  <FeedbackPlayer
                    session={selectedSession}
                    seekToMs={null}
                    onTimeUpdate={handlePlaybackTimeUpdate}
                    onWatchChunk={handlePlaybackWatchChunk}
                  />
                )}

                <FeedbackRecorder
                  canvasRef={canvasRef}
                  maxDurationSec={maxVideoDurationSec}
                  maxSizeBytes={maxVideoSizeBytes}
                  disabled={!recordingSupported || createSessionMutation.isPending || appendAnnotationsMutation.isPending}
                  className={cn(
                    isRecordingFullscreen &&
                      "fixed bottom-4 left-1/2 z-[70] w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 border bg-card/95 shadow-2xl backdrop-blur-sm"
                  )}
                  onTimeUpdate={(timeMs) => {
                    setRecordingTimeMs(timeMs);
                  }}
                  onCameraStreamChange={(stream) => {
                    setCameraStream(stream);
                  }}
                  onRecordingStart={() => {
                    setIsRecording(true);
                    setMode("record");
                    setRecordingTimeMs(0);
                    setPendingAnnotations([]);
                  }}
                  onRecordingStop={() => {
                    setIsRecording(false);
                    setMode("view");
                  }}
                  onSaved={handleSaveRecording}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {(createSessionMutation.error ||
          appendAnnotationsMutation.error ||
          createCommentMutation.error) && (
          <p className="text-sm text-destructive">
            {createSessionMutation.error?.message ||
              appendAnnotationsMutation.error?.message ||
              createCommentMutation.error?.message}
          </p>
        )}

        {isLoadingSelectedSession && selectedSessionId && (
          <p className="text-xs text-muted-foreground">Loading selected session...</p>
        )}
      </div>

      {toasts.map((toastMessage) => (
        <Toast
          key={toastMessage.id}
          duration={3200}
          onOpenChange={(open) => {
            if (open) {
              return;
            }

            setToasts((current) =>
              current.filter((currentToast) => currentToast.id !== toastMessage.id)
            );
          }}
        >
          <div className="grid gap-1">
            <ToastTitle>{toastMessage.title}</ToastTitle>
            {toastMessage.description && (
              <ToastDescription>{toastMessage.description}</ToastDescription>
            )}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
