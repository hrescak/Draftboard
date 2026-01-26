"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight, Download, ExternalLink, X, Play, FileIcon } from "lucide-react";

interface Attachment {
  id: string;
  type: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
}

interface AttachmentGalleryProps {
  attachments: Attachment[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentGallery({ attachments }: AttachmentGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? attachments.length - 1 : lightboxIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === attachments.length - 1 ? 0 : lightboxIndex + 1
      );
    }
  };

  const currentAttachment =
    lightboxIndex !== null ? attachments[lightboxIndex] : null;

  return (
    <>
      <div className="space-y-4">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.id}
            id={`attachment-${attachment.id}`}
            className="scroll-mt-20"
          >
            {attachment.type === "IMAGE" ? (
              <button
                onClick={() => openLightbox(index)}
                className="block w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <img
                  src={attachment.url}
                  alt={attachment.filename}
                  className="w-full transition-transform hover:scale-[1.02]"
                />
              </button>
            ) : attachment.type === "VIDEO" ? (
              <div className="overflow-hidden rounded-lg">
                <video
                  src={attachment.url}
                  poster={attachment.thumbnailUrl ?? undefined}
                  controls
                  className="w-full"
                >
                  <track kind="captions" />
                </video>
              </div>
            ) : attachment.type === "FIGMA" ? (
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1e1e1e]">
                  <svg viewBox="0 0 38 57" className="h-7 w-7" fill="none">
                    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
                    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
                    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{attachment.filename}</p>
                  <p className="text-sm text-muted-foreground">Figma Design</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </a>
            ) : attachment.type === "LOOM" ? (
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#625df5]">
                  <Play className="h-6 w-6 fill-white text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{attachment.filename}</p>
                  <p className="text-sm text-muted-foreground">Loom Recording</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </a>
            ) : (
              <a
                href={attachment.url}
                download={attachment.filename}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{attachment.filename}</p>
                  <p className="text-sm text-muted-foreground">
                    {attachment.mimeType} · {formatFileSize(attachment.size)}
                  </p>
                </div>
                <Download className="h-5 w-5 text-muted-foreground" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] border-none bg-black/95 p-0 sm:max-w-[95vw]">
          <div className="relative flex h-[90vh] items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            {attachments.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 h-12 w-12 text-white hover:bg-white/10"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-10 h-12 w-12 text-white hover:bg-white/10"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image */}
            {currentAttachment && (
              <img
                src={currentAttachment.url}
                alt={currentAttachment.filename}
                className="max-h-full max-w-full object-contain"
              />
            )}

            {/* Counter */}
            {attachments.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {(lightboxIndex ?? 0) + 1} / {attachments.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
