"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAvatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { formatRelativeTime } from "~/lib/utils";
import { ReactionButton } from "~/components/reactions/ReactionButton";
import { CommentComposer } from "./CommentComposer";
import { SimpleMarkdownContent } from "~/components/editor/SimpleMarkdownEditor";
import { MessageCircle } from "lucide-react";
import type { SerializedEditorState } from "lexical";

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

    if (Array.isArray(nodeObj.children)) {
      nodeObj.children.forEach(extractFromNode);
    }
  }

  children.forEach(extractFromNode);
  return texts.join(" ");
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
    </div>
  );
}
