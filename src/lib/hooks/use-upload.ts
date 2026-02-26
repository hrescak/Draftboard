"use client";

import { useCallback } from "react";
import { upload } from "@vercel/blob/client";
import { api } from "~/lib/trpc/client";

interface UploadResult {
  url: string;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
}

function buildBlobPathname(
  filename: string,
  userId: string,
  pathPrefix: string
): string {
  const timestamp = Date.now();
  const sanitized = sanitizeFilename(filename);
  const segments = [pathPrefix, "uploads", userId, `${timestamp}-${sanitized}`]
    .filter(Boolean);
  return segments.join("/");
}

/**
 * Hook that provides a unified file upload function.
 * Automatically uses the correct storage provider (R2 or Vercel Blob)
 * based on server configuration.
 */
export function useUpload() {
  const { data: storageInfo } = api.upload.storageInfo.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const getUploadUrl = api.upload.getUploadUrl.useMutation();

  const uploadFile = useCallback(
    async (file: File): Promise<UploadResult> => {
      const provider = storageInfo?.provider ?? "r2";

      if (provider === "vercel-blob") {
        const pathname = buildBlobPathname(
          file.name,
          storageInfo?.userId ?? "anonymous",
          storageInfo?.blobPathPrefix ?? ""
        );
        const blob = await upload(pathname, file, {
          access: "public",
          handleUploadUrl: "/api/upload/blob",
        });
        return { url: blob.url };
      }

      const { uploadUrl, publicUrl } = await getUploadUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }

      return { url: publicUrl };
    },
    [storageInfo?.provider, storageInfo?.userId, storageInfo?.blobPathPrefix, getUploadUrl]
  );

  return {
    uploadFile,
    isConfigured: storageInfo?.configured ?? false,
    isLoading: !storageInfo,
    provider: storageInfo?.provider ?? null,
  };
}
