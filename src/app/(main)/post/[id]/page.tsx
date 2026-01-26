import { Suspense } from "react";
import { notFound } from "next/navigation";
import { api } from "~/lib/trpc/server";
import { PostDetail } from "~/components/post/PostDetail";
import { CommentSection } from "~/components/comments/CommentSection";
import { Skeleton } from "~/components/ui/skeleton";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await api.post.getById({ id }).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        }
      >
        <PostDetail post={post} />
      </Suspense>

      <div id="comments" className="scroll-mt-20">
        <Suspense fallback={<Skeleton className="h-40" />}>
          <CommentSection postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
