"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "~/components/ui/button";
import { SimpleMarkdownEditor } from "~/components/editor/SimpleMarkdownEditor";
import { api } from "~/lib/trpc/client";
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
    if (child.type === "paragraph" && Array.isArray(child.children)) {
      for (const textNode of child.children) {
        if (textNode.type === "text" && textNode.text?.trim()) {
          return true;
        }
      }
    }
    // Lists also count as content
    if (child.type === "list") {
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
  placeholder = "Add a comment... (Markdown supported: **bold**, *italic*, [link](url))",
  compact = false,
}: CommentComposerProps) {
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
    <form onSubmit={handleFormSubmit} className="flex gap-2">
      <div className="flex-1 rounded-md border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
        <SimpleMarkdownEditor
          key={key}
          onChange={setContent}
          placeholder={placeholder}
          disabled={createMutation.isPending}
          minHeight={compact ? "40px" : "60px"}
          editorRef={editorRef}
        />
      </div>
      <Button
        type="submit"
        size={compact ? "sm" : "default"}
        disabled={!hasContent(content) || createMutation.isPending}
        className="shrink-0 self-end"
      >
        {createMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
