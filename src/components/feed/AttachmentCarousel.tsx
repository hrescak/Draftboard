"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, FileIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "~/lib/trpc/client";
import { Lightbox } from "~/components/ui/lightbox";

interface Attachment {
  id: string;
  type: string;
  url: string;
  filename: string;
  thumbnailUrl: string | null;
}

interface AttachmentCarouselProps {
  attachments: Attachment[];
  postId: string;
  totalCount: number;
}

// Extract R2 key from URL
function extractR2Key(url: string): string | null {
  const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

function getAttachmentIcon(type: string) {
  switch (type) {
    case "IMAGE":
      return <ImageIcon className="h-8 w-8" />;
    case "VIDEO":
    case "LOOM":
      return <Play className="h-8 w-8" />;
    case "FIGMA":
      return (
        <svg viewBox="0 0 38 57" className="h-8 w-8" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );
    default:
      return <FileIcon className="h-8 w-8" />;
  }
}

function SignedImage({ url, filename, className }: { url: string; filename: string; className?: string }) {
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
      alt={filename}
      className={className}
    />
  );
}

export function AttachmentCarousel({
  attachments,
  postId,
  totalCount,
}: AttachmentCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const visibleAttachments = attachments.slice(0, 2);
  const remaining = totalCount - 2;

  // Get all image attachments for the lightbox
  const imageAttachments = attachments.filter((a) => a.type === "IMAGE");

  const handleImageClick = (attachmentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const imageIndex = imageAttachments.findIndex((a) => a.id === attachmentId);
    if (imageIndex >= 0) {
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {visibleAttachments.map((attachment, index) => {
          if (attachment.type === "IMAGE") {
            return (
              <button
                key={attachment.id}
                onClick={(e) => handleImageClick(attachment.id, e)}
                className="group relative flex-1 cursor-pointer overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <SignedImage
                    url={attachment.thumbnailUrl || attachment.url}
                    filename={attachment.filename}
                    className="h-full w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-[1.02]"
                  />
                  {index === 1 && remaining > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                      <span className="text-2xl font-semibold">+{remaining}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          }

          return (
            <Link
              key={attachment.id}
              href={`/post/${postId}#attachment-${attachment.id}`}
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-lg"
            >
              {attachment.type === "VIDEO" ? (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {attachment.thumbnailUrl ? (
                    <SignedImage
                      url={attachment.thumbnailUrl}
                      filename={attachment.filename}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <Play className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                  {index === 1 && remaining > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                      <span className="text-2xl font-semibold">+{remaining}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative flex aspect-video w-full items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    {getAttachmentIcon(attachment.type)}
                    <span className="max-w-[80%] truncate text-sm">
                      {attachment.filename}
                    </span>
                  </div>
                  {index === 1 && remaining > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                      <span className="text-2xl font-semibold">+{remaining}</span>
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <Lightbox
        images={imageAttachments}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
