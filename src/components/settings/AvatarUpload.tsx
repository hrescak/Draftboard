"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { UserAvatar } from "~/components/ui/avatar";
import { api } from "~/lib/trpc/client";
import { Loader2, X, Camera } from "lucide-react";

interface AvatarUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  fallbackName?: string;
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
        <UserAvatar avatarUrl={value} name={fallbackName} className="h-20 w-20" />

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
