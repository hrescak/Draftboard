"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SerializedEditorState } from "lexical";
import { Loader2, MessageCircle } from "lucide-react";
import { FeedbackAudioPlayer } from "~/components/feedback/FeedbackAudioPlayer";
import { FeedbackPlayer } from "~/components/feedback/FeedbackPlayer";
import { UserAvatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { api } from "~/lib/trpc/client";
import { formatRelativeTime } from "~/lib/utils";
import { ReactionButton } from "~/components/reactions/ReactionButton";
import { CommentComposer } from "./CommentComposer";
import { SimpleMarkdownContent } from "~/components/editor/SimpleMarkdownEditor";

interface CommentThreadProps {
  comment: {
    id: string;
    content: unknown;
    createdAt: Date;
    author: {
      id: string;
      displayName: string;
      avatarUrl: string | null;
    };
    replies: Array<{
      id: string;
      content: unknown;
      createdAt: Date;
      coordinates?: unknown;
      feedbackAudio?: {
        url: string;
        mimeType: string | null;
        durationSec: number | null;
      } | null;
      author: {
        id: string;
        displayName: string;
        avatarUrl: string | null;
      };
      reactions: Array<{
        type: string;
        userId: string;
      }>;
    }>;
    reactions: Array<{
      type: string;
      userId: string;
    }>;
    coordinates?: unknown;
    feedbackAudio?: {
      url: string;
      mimeType: string | null;
      durationSec: number | null;
    } | null;
  };
  postId: string;
}

// Check if content is a valid Lexical editor state
function isLexicalContent(content: unknown): content is SerializedEditorState {
  if (!content || typeof content !== "object") return false;
  const c = content as Record<string, unknown>;
  return c.root !== undefined && typeof c.root === "object";
}

// Fallback: extract plain text for non-Lexical content
function extractPlainText(content: unknown): string {
  if (!content || typeof content !== "object") return "";

  const root = (content as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return "";

  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return "";

  const texts: string[] = [];

  function extractFromNode(node: unknown): void {
    if (!node || typeof node !== "object") return;

    const nodeObj = node as Record<string, unknown>;

    if (nodeObj.type === "text" && typeof nodeObj.text === "string") {
      texts.push(nodeObj.text);
    }

    // Handle mention nodes - extract the display name
    if (nodeObj.type === "mention" && typeof nodeObj.mentionName === "string") {
      texts.push(nodeObj.mentionName);
    }

    if (Array.isArray(nodeObj.children)) {
      nodeObj.children.forEach(extractFromNode);
    }
  }

  children.forEach(extractFromNode);
  return texts.join(" ");
}

interface VisualFeedbackMetadata {
  entryType: "SESSION" | "COMMENT";
  feedbackSessionId: string | null;
  feedbackCommentId: string | null;
  hasAudio: boolean;
}

function parseVisualFeedbackMetadata(
  coordinates: unknown
): VisualFeedbackMetadata | null {
  if (!coordinates || typeof coordinates !== "object") {
    return null;
  }

  const value = coordinates as Record<string, unknown>;
  if (value.source !== "VISUAL_FEEDBACK") {
    return null;
  }

  const entryType =
    value.entryType === "SESSION" || value.entryType === "COMMENT"
      ? value.entryType
      : null;

  if (!entryType) {
    return null;
  }

  return {
    entryType,
    feedbackSessionId:
      typeof value.feedbackSessionId === "string"
        ? value.feedbackSessionId
        : null,
    feedbackCommentId:
      typeof value.feedbackCommentId === "string"
        ? value.feedbackCommentId
        : null,
    hasAudio: value.hasAudio === true,
  };
}

function CommentContent({ content }: { content: unknown }) {
  if (isLexicalContent(content)) {
    return <SimpleMarkdownContent content={content} />;
  }
  // Fallback for old plain text content
  return <p className="text-sm">{extractPlainText(content)}</p>;
}

export function CommentThread({ comment, postId }: CommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const visualFeedback = parseVisualFeedbackMetadata(comment.coordinates);
  const recordWatchTimeMutation = api.feedback.recordWatchTime.useMutation();
  const hasCommentText = extractPlainText(comment.content).trim().length > 0;
  const isVoiceOnlyVisualFeedback =
    visualFeedback?.entryType === "COMMENT" &&
    visualFeedback.hasAudio &&
    !hasCommentText;
  const inlineVideoSessionId =
    visualFeedback?.entryType === "SESSION"
      ? visualFeedback.feedbackSessionId
      : null;
  const shouldLoadInlineVideo = isVideoModalOpen && !!inlineVideoSessionId;
  const {
    data: inlineVideoSession,
    isLoading: isLoadingInlineVideoSession,
    error: inlineVideoSessionError,
  } = api.feedback.getSession.useQuery(
    { sessionId: inlineVideoSessionId ?? "" },
    {
      enabled: shouldLoadInlineVideo,
      retry: false,
    }
  );
  const handleInlineVideoTimeUpdate = useCallback(() => undefined, []);
  const handleInlineVideoWatchChunk = useCallback(
    (deltaMs: number) => {
      if (!inlineVideoSessionId || recordWatchTimeMutation.isPending) {
        return;
      }

      recordWatchTimeMutation.mutate(
        {
          sessionId: inlineVideoSessionId,
          deltaMs,
        },
        {
          onError: () => undefined,
        }
      );
    },
    [inlineVideoSessionId, recordWatchTimeMutation]
  );

  const openFeedbackView = () => {
    if (!visualFeedback) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "feedback");

    if (visualFeedback.feedbackSessionId) {
      params.set("session", visualFeedback.feedbackSessionId);
    } else {
      params.delete("session");
    }

    if (visualFeedback.feedbackCommentId) {
      params.set("comment", visualFeedback.feedbackCommentId);
    } else {
      params.delete("comment");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-4">
      {/* Main comment */}
      <div className="flex gap-3">
        <Link href={`/user/${comment.author.id}`}>
          <UserAvatar avatarUrl={comment.author.avatarUrl} name={comment.author.displayName} className="h-8 w-8" />
        </Link>
        <div className="flex-1">
          <div className="rounded-lg bg-muted px-3 py-2">
            <div className="flex items-center gap-2">
              <Link
                href={`/user/${comment.author.id}`}
                className="text-sm font-medium hover:underline"
              >
                {comment.author.displayName}
              </Link>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(new Date(comment.createdAt))}
              </span>
            </div>
            <div className="mt-1">
              <CommentContent content={comment.content} />
              {isVoiceOnlyVisualFeedback && comment.feedbackAudio?.url && (
                <FeedbackAudioPlayer
                  url={comment.feedbackAudio.url}
                  mimeType={comment.feedbackAudio.mimeType}
                  className="mt-2"
                />
              )}
              {visualFeedback && (
                <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5">
                  {!isVoiceOnlyVisualFeedback && (
                    <p className="text-[11px] font-medium text-primary">
                      {visualFeedback.entryType === "SESSION"
                        ? "Visual feedback video"
                        : visualFeedback.hasAudio
                          ? "Visual feedback comment (audio)"
                          : "Visual feedback comment"}
                    </p>
                  )}
                  {visualFeedback.entryType === "SESSION" &&
                    visualFeedback.feedbackSessionId && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 rounded-full px-1.5 text-[11px] text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setIsVideoModalOpen(true)}
                      >
                        Play video
                      </Button>
                    )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 rounded-full px-1.5 text-[11px] text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={openFeedbackView}
                  >
                    Open feedback
                  </Button>
                </div>
              )}
              {!isVoiceOnlyVisualFeedback && comment.feedbackAudio?.url && (
                <FeedbackAudioPlayer
                  url={comment.feedbackAudio.url}
                  mimeType={comment.feedbackAudio.mimeType}
                  className="mt-2"
                />
              )}
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <ReactionButton
              commentId={comment.id}
              reactions={comment.reactions}
              count={comment.reactions.length}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs text-muted-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageCircle className="h-3 w-3" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <div className="ml-11">
          <CommentComposer
            postId={postId}
            parentId={comment.id}
            onSuccess={() => setShowReplyForm(false)}
            placeholder={`Reply to ${comment.author.displayName}...`}
            compact
          />
        </div>
      )}

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-11 space-y-4 border-l-2 border-muted pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <Link href={`/user/${reply.author.id}`}>
                <UserAvatar avatarUrl={reply.author.avatarUrl} name={reply.author.displayName} className="h-7 w-7" />
              </Link>
              <div className="flex-1">
                <div className="rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/user/${reply.author.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {reply.author.displayName}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(new Date(reply.createdAt))}
                    </span>
                  </div>
                  <div className="mt-1">
                    <CommentContent content={reply.content} />
                  </div>
                </div>
                <div className="mt-1">
                  <ReactionButton
                    commentId={reply.id}
                    reactions={reply.reactions}
                    count={reply.reactions.length}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="w-[96vw] max-w-4xl p-4">
          <DialogTitle className="sr-only">Visual feedback video</DialogTitle>
          <div className="space-y-2">
            {isLoadingInlineVideoSession && (
              <div className="flex h-64 items-center justify-center rounded-lg border bg-background/70">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {inlineVideoSessionError && (
              <p className="text-sm text-destructive">
                Unable to load this feedback video.
              </p>
            )}
            {inlineVideoSession &&
              (inlineVideoSession.type === "VIDEO" ? (
                <FeedbackPlayer
                  session={inlineVideoSession}
                  seekToMs={null}
                  onTimeUpdate={handleInlineVideoTimeUpdate}
                  onWatchChunk={handleInlineVideoWatchChunk}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  This feedback entry has no video recording.
                </p>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
