"use client";

import { useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { UserAvatar } from "~/components/ui/avatar";
import { SimpleMarkdownEditor } from "~/components/editor/SimpleMarkdownEditor";
import { api } from "~/lib/trpc/client";
import { cn } from "~/lib/utils";
import { Loader2, Send } from "lucide-react";
import type { SerializedEditorState } from "lexical";

interface CommentComposerProps {
  postId: string;
  parentId?: string;
  attachmentId?: string;
  coordinates?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    timestamp?: number;
  };
  onSuccess?: () => void;
  placeholder?: string;
  compact?: boolean;
}

// Check if editor state has actual content
function hasContent(editorState: SerializedEditorState | null): boolean {
  if (!editorState) return false;

  const root = editorState.root;
  if (!root || !Array.isArray(root.children)) return false;

  // Check if there's any non-empty paragraph
  for (const child of root.children) {
    const childNode = child as { type: string; children?: Array<{ type: string; text?: string }> };
    if (childNode.type === "paragraph" && Array.isArray(childNode.children)) {
      for (const textNode of childNode.children) {
        if (textNode.type === "text" && textNode.text?.trim()) {
          return true;
        }
        // Mentions count as content
        if (textNode.type === "mention") {
          return true;
        }
      }
    }
    // Lists also count as content
    if (childNode.type === "list") {
      return true;
    }
  }

  return false;
}

export function CommentComposer({
  postId,
  parentId,
  attachmentId,
  coordinates,
  onSuccess,
  placeholder = "Add a comment...",
  compact = false,
}: CommentComposerProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [key, setKey] = useState(0); // Used to reset the editor
  const utils = api.useUtils();
  const editorRef = useRef<{ clear: () => void } | null>(null);

  const createMutation = api.comment.create.useMutation({
    onSuccess: () => {
      setContent(null);
      setKey((k) => k + 1); // Reset editor by changing key
      utils.comment.byPost.invalidate({ postId });
      utils.post.getById.invalidate({ id: postId });
      onSuccess?.();
    },
  });

  const handleSubmit = useCallback(() => {
    if (!content || !hasContent(content)) return;

    createMutation.mutate({
      postId,
      content,
      parentId,
      attachmentId,
      coordinates,
    });
  }, [content, postId, parentId, attachmentId, coordinates, createMutation]);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <form onSubmit={handleFormSubmit} className="flex items-start gap-3">
      <UserAvatar
        avatarUrl={session?.user?.image}
        name={session?.user?.name ?? "User"}
        className="mt-2 h-8 w-8"
      />
      <div className="flex flex-1 items-end gap-2 rounded-lg bg-muted/50 px-3 py-2">
        <div className="flex-1">
          <SimpleMarkdownEditor
            key={key}
            onChange={setContent}
            placeholder={placeholder}
            disabled={createMutation.isPending}
            minHeight="24px"
            editorRef={editorRef}
          />
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={!hasContent(content) || createMutation.isPending}
          className={cn(
            "h-8 w-8 shrink-0",
            hasContent(content) && !createMutation.isPending
              ? "text-foreground hover:bg-foreground hover:text-background"
              : "text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          )}
        >
          {createMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
