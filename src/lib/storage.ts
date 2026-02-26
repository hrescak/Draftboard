import {
  isR2Configured,
  getPresignedUploadUrl as r2GetPresignedUploadUrl,
  getPresignedDownloadUrl as r2GetPresignedDownloadUrl,
  getWebhookImageUrl as r2GetWebhookImageUrl,
  getPublicUrl as r2GetPublicUrl,
} from "./r2";

export type StorageProvider = "r2" | "vercel-blob";

export function getStorageProvider(): StorageProvider {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "vercel-blob";
  return "r2";
}

export function isStorageConfigured(): boolean {
  const provider = getStorageProvider();
  if (provider === "vercel-blob") return !!process.env.BLOB_READ_WRITE_TOKEN;
  return isR2Configured();
}

/**
 * Returns the configured path prefix for Vercel Blob uploads.
 * Files will be stored under `{prefix}/uploads/{userId}/{timestamp}-{filename}`.
 * If no prefix is set, files go under `uploads/...` directly.
 */
export function getBlobPathPrefix(): string {
  return process.env.BLOB_PATH_PREFIX ?? "";
}

export function isVercelBlobUrl(url: string): boolean {
  return url.includes("blob.vercel-storage.com");
}

/**
 * Extract a storage key from a URL. Returns null for Vercel Blob URLs
 * (they don't need key-based signing) and for unrecognized URL formats.
 */
export function extractStorageKey(url: string): string | null {
  if (isVercelBlobUrl(url)) return null;
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

interface UploadUrlOptions {
  filename: string;
  contentType: string;
  userId: string;
}

/**
 * Get a presigned upload URL (R2 only).
 * For Vercel Blob, uploads go through the /api/upload/blob API route instead.
 */
export async function getPresignedUploadUrl(
  options: UploadUrlOptions
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  return r2GetPresignedUploadUrl(options);
}

/**
 * Get a signed download URL for a storage key.
 * Vercel Blob URLs are already public, so the URL is returned as-is.
 */
export async function getPresignedDownloadUrl(keyOrUrl: string): Promise<string> {
  if (getStorageProvider() === "vercel-blob" || isVercelBlobUrl(keyOrUrl)) {
    return keyOrUrl;
  }
  return r2GetPresignedDownloadUrl(keyOrUrl);
}

/**
 * Get a signed URL suitable for external services (Discord/Slack webhooks).
 * Vercel Blob URLs are permanent and public, so no special handling is needed.
 */
export async function getWebhookImageUrl(keyOrUrl: string): Promise<string> {
  if (getStorageProvider() === "vercel-blob" || isVercelBlobUrl(keyOrUrl)) {
    return keyOrUrl;
  }
  return r2GetWebhookImageUrl(keyOrUrl);
}

/**
 * Get the public URL for a storage key.
 * For Vercel Blob, the URL returned from upload is already the public URL.
 */
export function getPublicUrl(keyOrUrl: string): string {
  if (getStorageProvider() === "vercel-blob" || isVercelBlobUrl(keyOrUrl)) {
    return keyOrUrl;
  }
  return r2GetPublicUrl(keyOrUrl);
}

export { getFileType, isFigmaUrl, isLoomUrl } from "./r2";
