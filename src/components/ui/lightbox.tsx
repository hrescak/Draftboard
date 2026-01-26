"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./button";
import { api } from "~/lib/trpc/client";

interface LightboxImage {
  id: string;
  url: string;
  filename: string;
  thumbnailUrl?: string | null;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

// Extract R2 key from URL - handles both signed and unsigned URLs
function extractR2Key(url: string): string | null {
  // Remove query parameters first (signed URLs have ?X-Amz... parameters)
  const urlWithoutParams = url.split('?')[0];
  // Match the uploads path pattern
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

// Check if URL is already a signed URL (has query parameters typical of signed URLs)
function isSignedUrl(url: string): boolean {
  return url.includes('X-Amz-') || url.includes('x-amz-');
}

function SignedLightboxImage({ url, filename }: { url: string; filename: string }) {
  // If the URL is already signed, use it directly
  const alreadySigned = isSignedUrl(url);
  const r2Key = !alreadySigned ? extractR2Key(url) : null;
  
  const { data: signedUrlData, isLoading } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key && !alreadySigned,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  // Use already signed URL directly, or wait for the signed URL query
  const displayUrl = alreadySigned ? url : (signedUrlData?.url || url);

  if (!alreadySigned && isLoading && r2Key) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <img
      src={displayUrl}
      alt={filename}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />
  );
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!isOpen || !mounted || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next</span>
          </Button>
        </>
      )}

      {/* Image */}
      <div
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <SignedLightboxImage url={currentImage.url} filename={currentImage.filename} />
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Filename */}
      <div className="absolute bottom-4 right-4 max-w-[200px] truncate rounded bg-black/50 px-3 py-1 text-sm text-white">
        {currentImage.filename}
      </div>
    </div>,
    document.body
  );
}

// Hook for managing lightbox state
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const openLightbox = useCallback((imgs: LightboxImage[], index = 0) => {
    setImages(imgs);
    setInitialIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    images,
    initialIndex,
    openLightbox,
    closeLightbox,
  };
}
