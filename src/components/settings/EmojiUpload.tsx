"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/client";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

interface EmojiUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

// Extract R2 key from URL
function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

// Check if URL is already a signed URL
function isSignedUrl(url: string): boolean {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

function SignedEmojiImage({ url, alt }: { url: string; alt: string }) {
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

  const displayUrl = alreadySigned ? url : signedUrlData?.url || url;

  if (!alreadySigned && isLoading && r2Key) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={displayUrl}
      alt={alt}
      className="h-12 w-12 rounded-md object-contain"
    />
  );
}

export function EmojiUpload({ value, onChange }: EmojiUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUploadUrl = api.upload.getUploadUrl.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/png", "image/gif", "image/webp", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PNG, GIF, WebP, or JPEG file");
      return;
    }

    // Validate file size (1MB max for emoji)
    if (file.size > 1 * 1024 * 1024) {
      setError("Emoji image must be less than 1MB");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Get upload URL
      const { uploadUrl, publicUrl } = await getUploadUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      // Upload to R2
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      // Use the public URL for storage
      onChange(publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/gif,image/webp,image/jpeg"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className="flex items-center gap-2">
          <SignedEmojiImage url={value} alt="Emoji preview" />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex h-12 w-12 flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// Emoji display component for the list (to handle signed URLs)
export function EmojiImage({
  url,
  alt,
  className = "h-8 w-8",
}: {
  url: string;
  alt: string;
  className?: string;
}) {
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

  const displayUrl = alreadySigned ? url : signedUrlData?.url || url;

  if (!alreadySigned && isLoading && r2Key) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded bg-muted`}
      >
        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <img src={displayUrl} alt={alt} className={`${className} object-contain`} />;
}
