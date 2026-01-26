"use client";

import { useState, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/lib/trpc/client";
import { Loader2, Send } from "lucide-react";

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

export function CommentComposer({
  postId,
  parentId,
  attachmentId,
  coordinates,
  onSuccess,
  placeholder = "Add a comment...",
  compact = false,
}: CommentComposerProps) {
  const [text, setText] = useState("");
  const utils = api.useUtils();

  const createMutation = api.comment.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.comment.byPost.invalidate({ postId });
      utils.post.getById.invalidate({ id: postId });
      onSuccess?.();
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim()) return;

      // Create a simple Lexical editor state with the text
      const content = {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: text.trim(),
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      };

      createMutation.mutate({
        postId,
        content,
        parentId,
        attachmentId,
        coordinates,
      });
    },
    [text, postId, parentId, attachmentId, coordinates, createMutation]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={compact ? "min-h-[60px]" : "min-h-[80px]"}
        disabled={createMutation.isPending}
      />
      <Button
        type="submit"
        size={compact ? "sm" : "default"}
        disabled={!text.trim() || createMutation.isPending}
        className="shrink-0"
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
