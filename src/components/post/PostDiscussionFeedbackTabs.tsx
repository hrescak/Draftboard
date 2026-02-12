"use client";

import { CommentSection } from "~/components/comments/CommentSection";

interface PostDiscussionFeedbackTabsProps {
  postId: string;
  postAuthorId: string;
  visualFeedbackEnabled: boolean;
}

export function PostDiscussionFeedbackTabs({
  postId,
}: PostDiscussionFeedbackTabsProps) {
  return (
    <div id="comments" className="scroll-mt-20">
      <CommentSection postId={postId} />
    </div>
  );
}

