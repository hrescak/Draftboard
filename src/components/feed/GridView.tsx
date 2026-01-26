"use client";

import Link from "next/link";
import { Play, FileIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { formatRelativeTime, getInitials } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/lib/trpc/client";

interface Post {
  id: string;
  title: string | null;
  createdAt: Date;
  author: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
  };
  attachments: Array<{
    id: string;
    type: string;
    url: string;
    filename: string;
    thumbnailUrl: string | null;
  }>;
  _count: {
    attachments: number;
  };
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
      <div className="flex h-full w-full items-center justify-center bg-muted">
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
  // Filter posts with attachments for grid view
  const postsWithAttachments = posts.filter(
    (post) => post.attachments.length > 0
  );

  if (postsWithAttachments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No visual posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Posts with images and attachments will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {postsWithAttachments.map((post) => {
        const firstAttachment = post.attachments[0];
        if (!firstAttachment) return null;

        return (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
          >
            {/* Image/media container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              {firstAttachment.type === "IMAGE" ? (
                <SignedImage
                  url={firstAttachment.thumbnailUrl || firstAttachment.url}
                  alt={post.title || firstAttachment.filename}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : firstAttachment.type === "VIDEO" ? (
                <>
                  {firstAttachment.thumbnailUrl ? (
                    <SignedImage
                      url={firstAttachment.thumbnailUrl}
                      alt={post.title || firstAttachment.filename}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <Play className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                </>
              ) : firstAttachment.type === "FIGMA" ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#1e1e1e]">
                  <svg viewBox="0 0 38 57" className="h-12 w-12" fill="none">
                    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
                    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
                    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <FileIcon className="h-12 w-12 text-muted-foreground" />
                  <span className="max-w-[80%] truncate text-xs text-muted-foreground">
                    {firstAttachment.filename}
                  </span>
                </div>
              )}

              {/* Attachment count badge */}
              {post._count.attachments > 1 && (
                <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                  {post._count.attachments}
                </div>
              )}
            </div>

            {/* Card footer with author info and title */}
            <div className="p-3">
              {post.title && (
                <p className="mb-2 truncate text-sm font-medium">
                  {post.title}
                </p>
              )}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatarUrl ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {getInitials(post.author.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-muted-foreground">
                    {post.author.displayName} · {formatRelativeTime(new Date(post.createdAt))}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
