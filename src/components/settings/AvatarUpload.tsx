"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/lib/trpc/client";
import { Loader2, Upload, X, Camera } from "lucide-react";
import { getInitials } from "~/lib/utils";

interface AvatarUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  fallbackName?: string;
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

function SignedAvatarImage({ url, fallbackName }: { url: string; fallbackName: string }) {
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
      <Avatar className="h-20 w-20">
        <AvatarFallback className="text-xl">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="h-20 w-20">
      <AvatarImage src={displayUrl} />
      <AvatarFallback className="text-xl">
        {getInitials(fallbackName)}
      </AvatarFallback>
    </Avatar>
  );
}

export function AvatarUpload({ value, onChange, fallbackName = "" }: AvatarUploadProps) {
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

    // Validate file size (2MB max for avatar)
    if (file.size > 2 * 1024 * 1024) {
      setError("Avatar image must be less than 2MB");
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

      <div className="flex items-center gap-4">
        {value ? (
          <SignedAvatarImage url={value} fallbackName={fallbackName} />
        ) : (
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">
              {getInitials(fallbackName)}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                {value ? "Change photo" : "Upload photo"}
              </>
            )}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
              className="gap-2 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        PNG, GIF, WebP, or JPEG. Max 2MB.
      </p>
    </div>
  );
}
