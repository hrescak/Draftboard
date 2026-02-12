"use client";

import { Trash2, Video, MessageSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn, formatRelativeTime, pluralize } from "~/lib/utils";

interface FeedbackSessionListItem {
  id: string;
  type: "VIDEO" | "TEXT_ONLY";
  createdAt: Date;
  author: {
    id: string;
    displayName: string;
  };
  _count?: {
    annotations: number;
    comments: number;
  };
}

interface FeedbackSessionListProps {
  sessions: FeedbackSessionListItem[];
  selectedSessionId: string | null;
  canDeleteSession: (session: FeedbackSessionListItem) => boolean;
  onSelect: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
  deletingSessionId?: string | null;
}

export function FeedbackSessionList({
  sessions,
  selectedSessionId,
  canDeleteSession,
  onSelect,
  onDelete,
  deletingSessionId,
}: FeedbackSessionListProps) {
  if (sessions.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        No feedback sessions yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const isSelected = session.id === selectedSessionId;
        const annotationCount = session._count?.annotations ?? 0;
        const commentCount = session._count?.comments ?? 0;

        return (
          <div
            key={session.id}
            className={cn(
              "flex items-start justify-between gap-2 rounded-md border p-3 transition-colors",
              isSelected ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            )}
          >
            <button
              type="button"
              className="flex flex-1 flex-col items-start text-left"
              onClick={() => onSelect(session.id)}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {session.type === "VIDEO" ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
                {session.author.displayName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(new Date(session.createdAt))}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {annotationCount} {pluralize(annotationCount, "annotation")} · {commentCount} {pluralize(commentCount, "comment")}
              </span>
            </button>

            {canDeleteSession(session) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(session.id)}
                disabled={deletingSessionId === session.id}
                className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
