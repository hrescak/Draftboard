"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/client";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

interface CoverUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

// Extract R2 key from URL
function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split('?')[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

// Check if URL is already a signed URL
function isSignedUrl(url: string): boolean {
  return url.includes('X-Amz-') || url.includes('x-amz-');
}

function SignedCoverImage({ url, alt }: { url: string; alt: string }) {
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

  const displayUrl = alreadySigned ? url : (signedUrlData?.url || url);

  if (!alreadySigned && isLoading && r2Key) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={displayUrl}
      alt={alt}
      className="h-full w-full object-cover"
    />
  );
}

export function CoverUpload({ value, onChange }: CoverUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUploadUrl = api.upload.getUploadUrl.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (10MB max for cover images)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be less than 10MB");
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
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className="relative h-32 overflow-hidden rounded-lg border">
          <SignedCoverImage url={value} alt="Cover preview" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Replace
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Click to upload cover image (PNG, JPG, GIF up to 10MB)
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
