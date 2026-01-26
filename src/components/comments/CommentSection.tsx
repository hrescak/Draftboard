"use client";

import { useState } from "react";
import { api } from "~/lib/trpc/client";
import { CommentThread } from "./CommentThread";
import { CommentComposer } from "./CommentComposer";
import { Skeleton } from "~/components/ui/skeleton";
import { MessageCircle } from "lucide-react";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { data: comments, isLoading } = api.comment.byPost.useQuery({ postId });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <MessageCircle className="h-5 w-5" />
        Comments
        {comments && comments.length > 0 && (
          <span className="text-muted-foreground">({comments.length})</span>
        )}
      </h2>

      {/* Comment composer */}
      <CommentComposer postId={postId} />

      {/* Comment threads */}
      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} postId={postId} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
