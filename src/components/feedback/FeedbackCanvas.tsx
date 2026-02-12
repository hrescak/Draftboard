"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { FeedbackAudioPlayer } from "~/components/feedback/FeedbackAudioPlayer";
import { UserAvatar } from "~/components/ui/avatar";

type Tool = "PEN" | "ARROW" | "HIGHLIGHT";

interface FeedbackCanvasFrame {
  id: string;
  url: string;
  width?: number | null;
  height?: number | null;
  order: number;
}

interface FeedbackCanvasAnnotation {
  id: string;
  tool: "PEN" | "ARROW" | "HIGHLIGHT" | "FRAME_CHANGE";
  tStartMs: number;
  tEndMs?: number | null;
  payload: unknown;
}

interface FeedbackCanvasComment {
  id: string;
  frameId: string;
  region: unknown;
  status: "OPEN" | "RESOLVED";
  body?: unknown;
  audioUrl?: string | null;
  audioMimeType?: string | null;
  author?: {
    displayName?: string | null;
    avatarUrl?: string | null;
  } | null;
}

interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FeedbackCanvasProps {
  frame: FeedbackCanvasFrame | null;
  annotations: FeedbackCanvasAnnotation[];
  comments: FeedbackCanvasComment[];
  mode: "view" | "record" | "comment";
  activeTool: Tool | null;
  currentTimeMs: number;
  recordingTimeMs: number;
  isRecording: boolean;
  cameraStream?: MediaStream | null;
  highlightedCommentId?: string | null;
  onCanvasReady?: (canvas: HTMLCanvasElement | null) => void;
  onCommentSelect?: (commentId: string) => void;
  onAnnotationCreate?: (event: {
    tool: "PEN" | "ARROW" | "HIGHLIGHT";
    tStartMs: number;
    tEndMs: number;
    payload: unknown;
  }) => void;
  onRegionCreate?: (event: {
    region: NormalizedRect;
    anchorViewport: { x: number; y: number };
  }) => void;
}

interface Point {
  x: number;
  y: number;
}

function extractR2Key(url: string): string | null {
  const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

function parseRegion(region: unknown): NormalizedRect | null {
  if (!region || typeof region !== "object") return null;
  const value = region as Record<string, unknown>;
  const x = typeof value.x === "number" ? value.x : null;
  const y = typeof value.y === "number" ? value.y : null;
  const width = typeof value.width === "number" ? value.width : null;
  const height = typeof value.height === "number" ? value.height : null;

  if (x === null || y === null || width === null || height === null) {
    return null;
  }

  return {
    x: Math.max(0, Math.min(1, x)),
    y: Math.max(0, Math.min(1, y)),
    width: Math.max(0, Math.min(1, width)),
    height: Math.max(0, Math.min(1, height)),
  };
}

function extractCommentText(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;

  const root = (body as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return null;

  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return null;

  const pieces: string[] = [];

  const visitNode = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const value = node as Record<string, unknown>;

    if (value.type === "text" && typeof value.text === "string") {
      pieces.push(value.text);
    }

    if (value.type === "mention" && typeof value.mentionName === "string") {
      pieces.push(value.mentionName);
    }

    if (Array.isArray(value.children)) {
      value.children.forEach(visitNode);
    }
  };

  children.forEach(visitNode);

  const text = pieces.join(" ").replace(/\s+/g, " ").trim();
  return text.length > 0 ? text : null;
}

function truncateText(input: string, max = 180) {
  if (input.length <= max) {
    return input;
  }

  return `${input.slice(0, Math.max(0, max - 1)).trim()}…`;
}

function isSignedUrl(url: string) {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

function isAbsoluteHttpUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function drawArrow(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  const headLength = 12;
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 6),
    end.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 6),
    end.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

export function FeedbackCanvas({
  frame,
  annotations,
  comments,
  mode,
  activeTool,
  currentTimeMs,
  recordingTimeMs,
  isRecording,
  cameraStream,
  highlightedCommentId,
  onCanvasReady,
  onCommentSelect,
  onAnnotationCreate,
  onRegionCreate,
}: FeedbackCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const annotationsRef = useRef<FeedbackCanvasAnnotation[]>(annotations);
  const currentTimeRef = useRef(currentTimeMs);
  const isRecordingRef = useRef(isRecording);
  const previewRef = useRef<{ tool: Tool; start: Point; end: Point } | null>(null);

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 1280,
    height: 720,
  });
  const [canvasPixelRatio, setCanvasPixelRatio] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);
  const [regionDraft, setRegionDraft] = useState<NormalizedRect | null>(null);
  const [openCommentPopoverId, setOpenCommentPopoverId] = useState<string | null>(
    null
  );

  const drawingRef = useRef(false);
  const drawingStartTimeRef = useRef(0);
  const drawingPointsRef = useRef<Point[]>([]);
  const regionStartRef = useRef<Point | null>(null);
  const regionStartClientRef = useRef<Point | null>(null);
  const canCreateCommentRegion = mode !== "record";

  const displayFrameUrl = useMemo(() => {
    if (!frame) return null;
    if (isSignedUrl(frame.url)) return frame.url;
    return frame.url;
  }, [frame]);

  const frameR2Key = useMemo(() => {
    if (!displayFrameUrl || isSignedUrl(displayFrameUrl)) return null;
    return extractR2Key(displayFrameUrl);
  }, [displayFrameUrl]);

  const resolvedFrameUrl = useMemo(() => {
    if (!displayFrameUrl) {
      return null;
    }

    if (frameR2Key) {
      return `/api/upload/frame?key=${encodeURIComponent(frameR2Key)}`;
    }

    if (isAbsoluteHttpUrl(displayFrameUrl)) {
      return `/api/upload/frame?src=${encodeURIComponent(displayFrameUrl)}`;
    }

    return displayFrameUrl;
  }, [displayFrameUrl, frameR2Key]);

  useEffect(() => {
    annotationsRef.current = annotations;
  }, [annotations]);

  useEffect(() => {
    currentTimeRef.current = isRecording ? recordingTimeMs : currentTimeMs;
  }, [currentTimeMs, recordingTimeMs, isRecording]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    setCanvasPixelRatio(Math.min(2, Math.max(1, dpr)));
  }, []);

  useEffect(() => {
    setOpenCommentPopoverId(null);
  }, [frame?.id, mode]);

  useEffect(() => {
    if (highlightedCommentId) {
      setOpenCommentPopoverId(highlightedCommentId);
    }
  }, [highlightedCommentId]);

  useEffect(() => {
    if (!frame || !resolvedFrameUrl) {
      imageRef.current = null;
      setIsImageLoading(false);
      setImageLoadError(null);
      return;
    }

    setIsImageLoading(true);
    setImageLoadError(null);

    let isCancelled = false;

    const applyLoadedImage = (image: HTMLImageElement) => {
      imageRef.current = image;
      const naturalWidth = image.naturalWidth || frame.width || 1280;
      const naturalHeight = image.naturalHeight || frame.height || 720;
      const maxWidth = 1920;
      const width = Math.min(maxWidth, naturalWidth);
      const height = Math.round((naturalHeight / naturalWidth) * width);
      setCanvasSize({ width, height });
      setIsImageLoading(false);
      setImageLoadError(null);
    };

    const loadImage = (useAnonymousCors: boolean) => {
      const image = new Image();
      if (useAnonymousCors) {
        image.crossOrigin = "anonymous";
      }

      image.onload = () => {
        if (isCancelled) return;
        applyLoadedImage(image);
      };

      image.onerror = () => {
        if (isCancelled) return;

        if (useAnonymousCors) {
          // Some storage/CDN setups don't expose CORS for image drawing.
          // Retry without crossOrigin so the user can still see and annotate the frame.
          loadImage(false);
          return;
        }

        imageRef.current = null;
        setIsImageLoading(false);
        setImageLoadError("Unable to load this frame image.");
      };

      image.src = resolvedFrameUrl;
    };

    const shouldUseAnonymousCors = resolvedFrameUrl.startsWith("/api/upload/frame?");
    loadImage(shouldUseAnonymousCors);

    return () => {
      isCancelled = true;
    };
  }, [frame, resolvedFrameUrl]);

  useEffect(() => {
    if (!cameraStream) {
      cameraVideoRef.current = null;
      return;
    }

    const video = document.createElement("video");
    video.srcObject = cameraStream;
    video.muted = true;
    video.playsInline = true;
    void video.play();
    cameraVideoRef.current = video;

    return () => {
      video.pause();
      video.srcObject = null;
      if (cameraVideoRef.current === video) {
        cameraVideoRef.current = null;
      }
    };
  }, [cameraStream]);

  useEffect(() => {
    onCanvasReady?.(canvasRef.current);
    return () => {
      onCanvasReady?.(null);
    };
  }, [onCanvasReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrame = 0;

    const render = () => {
      const context = canvas.getContext("2d");
      if (!context) return;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (imageRef.current) {
        context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
      } else {
        context.fillStyle = "#171717";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      const nowMs = currentTimeRef.current;
      const visibleAnnotations = annotationsRef.current.filter((annotation) => {
        if (annotation.tool === "FRAME_CHANGE") {
          return false;
        }
        const tEndMs = annotation.tEndMs ?? annotation.tStartMs + 1800;
        return nowMs >= annotation.tStartMs && nowMs <= tEndMs;
      });

      for (const annotation of visibleAnnotations) {
        context.strokeStyle = annotation.tool === "HIGHLIGHT" ? "#facc15" : "#ef4444";
        context.fillStyle = "rgba(250, 204, 21, 0.25)";
        context.lineWidth = annotation.tool === "PEN" ? 3 : 4;
        context.lineJoin = "round";
        context.lineCap = "round";

        const payload = annotation.payload as Record<string, unknown>;

        if (annotation.tool === "PEN") {
          const points = Array.isArray(payload.points)
            ? payload.points
                .map((point) => {
                  if (!point || typeof point !== "object") return null;
                  const p = point as Record<string, unknown>;
                  if (typeof p.x !== "number" || typeof p.y !== "number") return null;
                  return {
                    x: p.x * canvas.width,
                    y: p.y * canvas.height,
                  };
                })
                .filter((point): point is Point => !!point)
            : [];

          if (points.length >= 2) {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (let index = 1; index < points.length; index += 1) {
              const point = points[index];
              if (!point) continue;
              context.lineTo(point.x, point.y);
            }
            context.stroke();
          }
        }

        if (annotation.tool === "ARROW") {
          const start = payload.start as Record<string, unknown> | undefined;
          const end = payload.end as Record<string, unknown> | undefined;
          if (
            start &&
            end &&
            typeof start.x === "number" &&
            typeof start.y === "number" &&
            typeof end.x === "number" &&
            typeof end.y === "number"
          ) {
            drawArrow(
              context,
              { x: start.x * canvas.width, y: start.y * canvas.height },
              { x: end.x * canvas.width, y: end.y * canvas.height }
            );
          }
        }

        if (annotation.tool === "HIGHLIGHT") {
          const x = typeof payload.x === "number" ? payload.x * canvas.width : null;
          const y = typeof payload.y === "number" ? payload.y * canvas.height : null;
          const width =
            typeof payload.width === "number" ? payload.width * canvas.width : null;
          const height =
            typeof payload.height === "number" ? payload.height * canvas.height : null;

          if (x !== null && y !== null && width !== null && height !== null) {
            context.fillRect(x, y, width, height);
            context.strokeRect(x, y, width, height);
          }
        }
      }

      const preview = previewRef.current;
      if (preview) {
        context.strokeStyle = "#0ea5e9";
        context.fillStyle = "rgba(14, 165, 233, 0.2)";
        context.lineWidth = 3;

        if (preview.tool === "PEN") {
          const points = drawingPointsRef.current;
          if (points.length >= 2) {
            context.beginPath();
            context.moveTo(
              points[0]?.x ?? preview.start.x,
              points[0]?.y ?? preview.start.y
            );
            for (let index = 1; index < points.length; index += 1) {
              const point = points[index];
              if (!point) continue;
              context.lineTo(point.x, point.y);
            }
            context.stroke();
          }
        } else if (preview.tool === "ARROW") {
          drawArrow(context, preview.start, preview.end);
        } else if (preview.tool === "HIGHLIGHT") {
          const x = Math.min(preview.start.x, preview.end.x);
          const y = Math.min(preview.start.y, preview.end.y);
          const width = Math.abs(preview.end.x - preview.start.x);
          const height = Math.abs(preview.end.y - preview.start.y);
          context.fillRect(x, y, width, height);
          context.strokeRect(x, y, width, height);
        }
      }

      if (isRecordingRef.current && cameraVideoRef.current) {
        const cameraVideo = cameraVideoRef.current;
        if (cameraVideo.readyState >= 2) {
          const pipWidth = Math.max(160, Math.floor(canvas.width * 0.2));
          const pipHeight = Math.floor((pipWidth * 9) / 16);
          const x = canvas.width - pipWidth - 16;
          const y = canvas.height - pipHeight - 16;

          context.fillStyle = "rgba(0, 0, 0, 0.35)";
          context.fillRect(x - 2, y - 2, pipWidth + 4, pipHeight + 4);
          context.drawImage(cameraVideo, x, y, pipWidth, pipHeight);
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [canvasSize.height, canvasSize.width]);

  const toCanvasPoint = (event: PointerEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    if (Number.isNaN(x) || Number.isNaN(y)) {
      return null;
    }

    return {
      x: Math.max(0, Math.min(canvas.width, x)),
      y: Math.max(0, Math.min(canvas.height, y)),
    };
  };

  const toNormalizedRect = (start: Point, end: Point): NormalizedRect | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    if (width < 4 || height < 4) {
      return null;
    }

    return {
      x: x / canvas.width,
      y: y / canvas.height,
      width: width / canvas.width,
      height: height / canvas.height,
    };
  };

  const toDefaultClickRegion = (point: Point): NormalizedRect | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const size = Math.max(16, Math.min(36, canvas.width, canvas.height));
    const halfSize = size / 2;
    const x = Math.max(0, Math.min(canvas.width - size, point.x - halfSize));
    const y = Math.max(0, Math.min(canvas.height - size, point.y - halfSize));

    return {
      x: x / canvas.width,
      y: y / canvas.height,
      width: size / canvas.width,
      height: size / canvas.height,
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!frame) return;

    const point = toCanvasPoint(event);
    if (!point) return;

    setOpenCommentPopoverId(null);

    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (mode === "record" && activeTool) {
      event.preventDefault();
      drawingRef.current = true;
      drawingStartTimeRef.current = recordingTimeMs;
      if (activeTool === "PEN") {
        drawingPointsRef.current = [point];
      } else {
        previewRef.current = {
          tool: activeTool,
          start: point,
          end: point,
        };
      }
      return;
    }

    if (canCreateCommentRegion) {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      regionStartRef.current = point;
      regionStartClientRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      setRegionDraft({
        x: point.x / canvas.width,
        y: point.y / canvas.height,
        width: 0,
        height: 0,
      });
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const point = toCanvasPoint(event);
    if (!point) return;

    if (mode === "record" && drawingRef.current && activeTool) {
      if (activeTool === "PEN") {
        drawingPointsRef.current.push(point);
        const points = drawingPointsRef.current;
        previewRef.current = {
          tool: "PEN",
          start: points[0] ?? point,
          end: point,
        };
      } else if (previewRef.current) {
        previewRef.current = {
          ...previewRef.current,
          end: point,
        };
      }
      return;
    }

    if (canCreateCommentRegion && regionStartRef.current) {
      const normalizedRect = toNormalizedRect(regionStartRef.current, point);
      setRegionDraft(normalizedRect);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const point = toCanvasPoint(event);
    if (!point) {
      drawingRef.current = false;
      regionStartRef.current = null;
      regionStartClientRef.current = null;
      setRegionDraft(null);
      return;
    }

    if (mode === "record" && drawingRef.current && activeTool && onAnnotationCreate) {
      const tStartMs = drawingStartTimeRef.current;
      const tEndMs = recordingTimeMs;

      if (activeTool === "PEN" && drawingPointsRef.current.length >= 2) {
        const canvas = canvasRef.current;
        if (canvas) {
          onAnnotationCreate({
            tool: "PEN",
            tStartMs,
            tEndMs,
            payload: {
              points: drawingPointsRef.current.map((drawPoint) => ({
                x: drawPoint.x / canvas.width,
                y: drawPoint.y / canvas.height,
              })),
            },
          });
        }
      }

      if ((activeTool === "ARROW" || activeTool === "HIGHLIGHT") && previewRef.current) {
        const canvas = canvasRef.current;
        if (canvas) {
          if (activeTool === "ARROW") {
            onAnnotationCreate({
              tool: "ARROW",
              tStartMs,
              tEndMs,
              payload: {
                start: {
                  x: previewRef.current.start.x / canvas.width,
                  y: previewRef.current.start.y / canvas.height,
                },
                end: {
                  x: previewRef.current.end.x / canvas.width,
                  y: previewRef.current.end.y / canvas.height,
                },
              },
            });
          } else {
            const normalizedRect = toNormalizedRect(
              previewRef.current.start,
              previewRef.current.end
            );
            if (normalizedRect) {
              onAnnotationCreate({
                tool: "HIGHLIGHT",
                tStartMs,
                tEndMs,
                payload: normalizedRect,
              });
            }
          }
        }
      }

      drawingPointsRef.current = [];
      previewRef.current = null;
      drawingRef.current = false;
      return;
    }

    if (canCreateCommentRegion && regionStartRef.current && onRegionCreate) {
      const selectionRect = toNormalizedRect(regionStartRef.current, point);
      const normalizedRect =
        selectionRect ?? toDefaultClickRegion(regionStartRef.current);
      if (normalizedRect) {
        onRegionCreate({
          region: normalizedRect,
          anchorViewport: selectionRect
            ? {
                x: event.clientX,
                y: event.clientY,
              }
            : (regionStartClientRef.current ?? {
                x: event.clientX,
                y: event.clientY,
              }),
        });
      }
      regionStartRef.current = null;
      regionStartClientRef.current = null;
      setRegionDraft(null);
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drawingRef.current = false;
    drawingPointsRef.current = [];
    previewRef.current = null;
    regionStartRef.current = null;
    regionStartClientRef.current = null;
    setRegionDraft(null);
  };

  const visibleComments = comments
    .filter((comment) => comment.frameId === frame?.id)
    .map((comment) => {
      const region = parseRegion(comment.region);
      return region ? { ...comment, region } : null;
    })
    .filter((comment): comment is FeedbackCanvasComment & { region: NormalizedRect } => !!comment);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-lg border bg-card",
          mode === "record" && activeTool && "cursor-crosshair",
          canCreateCommentRegion && "cursor-cell"
        )}
        style={{
          aspectRatio: `${canvasSize.width}/${canvasSize.height}`,
          width: "100%",
          maxWidth: `${canvasSize.width}px`,
          marginInline: "auto",
        }}
      >
        {isImageLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={Math.max(1, Math.round(canvasSize.width * canvasPixelRatio))}
          height={Math.max(1, Math.round(canvasSize.height * canvasPixelRatio))}
          className="h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        />

        {imageLoadError && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-background/70 p-4">
            <p className="rounded-md border bg-card px-3 py-2 text-xs text-destructive">
              {imageLoadError}
            </p>
          </div>
        )}

        {regionDraft && canCreateCommentRegion && (
          <div
            className="pointer-events-none absolute border-2 border-primary bg-primary/10"
            style={{
              left: `${regionDraft.x * 100}%`,
              top: `${regionDraft.y * 100}%`,
              width: `${regionDraft.width * 100}%`,
              height: `${regionDraft.height * 100}%`,
            }}
          />
        )}

        {visibleComments.map((comment, index) => {
          const commentText = comment.body ? extractCommentText(comment.body) : null;
          const markerX = comment.region.x + comment.region.width / 2;
          const markerY = comment.region.y + comment.region.height / 2;
          const shouldOpenBelowMarker = markerY < 0.25;

          return (
            <div key={comment.id}>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpenCommentPopoverId((current) =>
                    current === comment.id ? null : comment.id
                  );
                  onCommentSelect?.(comment.id);
                }}
                className={cn(
                  "absolute z-10 h-6 w-6 overflow-hidden rounded-full border-2 p-0 shadow-sm",
                  comment.status === "RESOLVED"
                    ? "border-emerald-600 bg-emerald-100"
                    : "border-primary bg-primary/10",
                  highlightedCommentId === comment.id && "ring-2 ring-offset-2"
                )}
                style={{
                  left: `${markerX * 100}%`,
                  top: `${markerY * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                title={
                  comment.author?.displayName
                    ? `Feedback from ${comment.author.displayName}`
                    : `Feedback ${index + 1}`
                }
                aria-label={
                  comment.author?.displayName
                    ? `Open feedback from ${comment.author.displayName}`
                    : `Open feedback ${index + 1}`
                }
              >
                <UserAvatar
                  avatarUrl={comment.author?.avatarUrl}
                  name={comment.author?.displayName ?? "Unknown user"}
                  className="h-full w-full"
                />
              </button>

              {(openCommentPopoverId === comment.id ||
                highlightedCommentId === comment.id) && (
                <div
                  className="absolute z-20 w-72 max-w-[90vw] -translate-x-1/2 rounded-md border bg-popover p-3 text-xs shadow-lg"
                  style={{
                    left: `${markerX * 100}%`,
                    top: `${markerY * 100}%`,
                    transform: shouldOpenBelowMarker
                      ? "translate(-50%, 14px)"
                      : "translate(-50%, calc(-100% - 14px))",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="font-medium">
                      {comment.author?.displayName ?? `Feedback ${index + 1}`}
                    </p>
                    {comment.status === "RESOLVED" ? (
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                        Resolved
                      </span>
                    ) : (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        Open
                      </span>
                    )}
                  </div>

                  {commentText && (
                    <p className="text-foreground/90">{truncateText(commentText)}</p>
                  )}

                  {!commentText && comment.audioUrl && (
                    <p className="text-muted-foreground">Audio feedback note</p>
                  )}

                  {comment.audioUrl && (
                    <FeedbackAudioPlayer
                      url={comment.audioUrl}
                      mimeType={comment.audioMimeType}
                      className="mt-2"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mode === "record" && activeTool && (
        <p className="text-xs text-muted-foreground">
          Recording with {activeTool.toLowerCase()} tool enabled.
        </p>
      )}

      {canCreateCommentRegion && (
        <p className="text-xs text-muted-foreground">
          Click or drag to select a region, then submit text or audio feedback.
        </p>
      )}
    </div>
  );
}
