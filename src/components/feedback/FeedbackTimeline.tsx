"use client";

import { PenLine, MoveRight, Highlighter, Frame, MessageSquare } from "lucide-react";
import { cn } from "~/lib/utils";

interface TimelineAnnotation {
  id: string;
  tool: "PEN" | "ARROW" | "HIGHLIGHT" | "FRAME_CHANGE";
  tStartMs: number;
}

interface TimelineComment {
  id: string;
  frameId: string;
  timestampMs?: number | null;
  author: {
    displayName: string;
  };
}

interface FeedbackTimelineProps {
  annotations: TimelineAnnotation[];
  comments: TimelineComment[];
  currentTimeMs: number;
  onJump: (
    timeMs: number,
    options?: { commentId?: string; frameId?: string }
  ) => void;
}

function formatTimelineTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getAnnotationLabel(tool: TimelineAnnotation["tool"]) {
  switch (tool) {
    case "PEN":
      return { label: "Pen", icon: PenLine };
    case "ARROW":
      return { label: "Arrow", icon: MoveRight };
    case "HIGHLIGHT":
      return { label: "Highlight", icon: Highlighter };
    case "FRAME_CHANGE":
      return { label: "Frame change", icon: Frame };
  }
}

export function FeedbackTimeline({
  annotations,
  comments,
  currentTimeMs,
  onJump,
}: FeedbackTimelineProps) {
  const timelineEvents = [
    ...annotations.map((annotation) => ({
      id: `annotation-${annotation.id}`,
      timeMs: annotation.tStartMs,
      type: "annotation" as const,
      annotation,
    })),
    ...comments
      .filter((comment) => typeof comment.timestampMs === "number")
      .map((comment) => ({
        id: `comment-${comment.id}`,
        timeMs: comment.timestampMs as number,
        type: "comment" as const,
        comment,
      })),
  ].sort((a, b) => a.timeMs - b.timeMs);

  if (timelineEvents.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
        Timeline is empty for this session.
      </p>
    );
  }

  return (
    <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
      {timelineEvents.map((event) => {
        const isActive = Math.abs(currentTimeMs - event.timeMs) < 1000;

        if (event.type === "annotation") {
          const { label, icon: Icon } = getAnnotationLabel(event.annotation.tool);
          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onJump(event.timeMs)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",
                isActive && "bg-primary/10 text-primary"
              )}
            >
              <span className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
              <span className="font-mono">{formatTimelineTime(event.timeMs)}</span>
            </button>
          );
        }

        return (
          <button
            key={event.id}
            type="button"
            onClick={() =>
              onJump(event.timeMs, {
                commentId: event.comment.id,
                frameId: event.comment.frameId,
              })
            }
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",
              isActive && "bg-primary/10 text-primary"
            )}
          >
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              Comment by {event.comment.author.displayName}
            </span>
            <span className="font-mono">{formatTimelineTime(event.timeMs)}</span>
          </button>
        );
      })}
    </div>
  );
}
