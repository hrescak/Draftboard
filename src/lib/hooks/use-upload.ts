"use client";

import { useCallback } from "react";
import { upload } from "@vercel/blob/client";
import { api } from "~/lib/trpc/client";

interface UploadResult {
  url: string;
}

interface UploadOptions {
  onProgress?: (progress: number) => void; // 0-100
  signal?: AbortSignal;
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
 *
 * Supports progress tracking via onProgress callback and cancellation via AbortSignal.
 */
export function useUpload() {
  const { data: storageInfo } = api.upload.storageInfo.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const getUploadUrl = api.upload.getUploadUrl.useMutation();

  const uploadFile = useCallback(
    async (file: File, options?: UploadOptions): Promise<UploadResult> => {
      const { onProgress, signal } = options ?? {};
      const provider = storageInfo?.provider ?? "r2";

      // Check if already cancelled
      if (signal?.aborted) {
        throw new DOMException("Upload cancelled", "AbortError");
      }

      onProgress?.(0);

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
        onProgress?.(100);
        return { url: blob.url };
      }

      // R2 upload with progress tracking
      onProgress?.(2);

      const { uploadUrl, publicUrl } = await getUploadUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      if (signal?.aborted) {
        throw new DOMException("Upload cancelled", "AbortError");
      }

      onProgress?.(5);

      // Use XMLHttpRequest for upload progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);

        // Handle cancellation
        if (signal) {
          signal.addEventListener("abort", () => xhr.abort(), { once: true });
        }

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            // Map upload progress to 5-98% range (5% for presigned URL, 98-100% for finalization)
            const uploadPercent = 5 + (e.loaded / e.total) * 93;
            onProgress?.(Math.round(uploadPercent));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.onabort = () =>
          reject(new DOMException("Upload cancelled", "AbortError"));

        xhr.send(file);
      });

      onProgress?.(100);
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
