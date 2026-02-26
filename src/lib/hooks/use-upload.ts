"use client";

import { useCallback } from "react";
import { upload } from "@vercel/blob/client";
import { api } from "~/lib/trpc/client";

interface UploadResult {
  url: string;
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
        const blob = await upload(file.name, file, {
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
    [storageInfo?.provider, getUploadUrl]
  );

  return {
    uploadFile,
    isConfigured: storageInfo?.configured ?? false,
    isLoading: !storageInfo,
    provider: storageInfo?.provider ?? null,
  };
}
