"use client";

import Link from "next/link";
import Masonry from "react-masonry-css";
import { Play, Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "~/lib/trpc/client";

const masonryBreakpoints = {
  default: 5,
  1280: 4,
  1024: 3,
  640: 2,
};

interface Post {
  id: string;
  title: string | null;
  attachments: Array<{
    id: string;
    type: string;
    url: string;
    filename: string;
    thumbnailUrl: string | null;
  }>;
}

interface GridViewProps {
  posts: Post[];
}

// Extract R2 key from URL
function extractR2Key(url: string): string | null {
  const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

function SignedImage({ url, alt, className }: { url: string; alt: string; className?: string }) {
  const r2Key = extractR2Key(url);
  const { data: signedUrlData, isLoading } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={signedUrlData?.url || url}
      alt={alt}
      className={className}
    />
  );
}

export function GridView({ posts }: GridViewProps) {
  // Filter posts with visual (image/video) attachments only
  const visualPosts = posts
    .map((post) => {
      const firstVisual = post.attachments.find(
        (att) => att.type === "IMAGE" || att.type === "VIDEO"
      );
      return firstVisual ? { post, attachment: firstVisual } : null;
    })
    .filter((item): item is { post: Post; attachment: Post["attachments"][0] } => item !== null);

  if (visualPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No visual posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Posts with images and videos will appear here
        </p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={masonryBreakpoints}
      className="flex w-auto -ml-3"
      columnClassName="pl-3 bg-clip-padding"
    >
      {visualPosts.map(({ post, attachment }) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="group mb-3 block overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-lg bg-muted">
            {attachment.type === "IMAGE" ? (
              <SignedImage
                url={attachment.thumbnailUrl || attachment.url}
                alt={post.title || attachment.filename}
                className="w-full transition-transform group-hover:scale-105"
              />
            ) : (
              <>
                {attachment.thumbnailUrl ? (
                  <SignedImage
                    url={attachment.thumbnailUrl}
                    alt={post.title || attachment.filename}
                    className="w-full"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center">
                    <Play className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                    <Play className="h-4 w-4 text-foreground" />
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      ))}
    </Masonry>
  );
}
