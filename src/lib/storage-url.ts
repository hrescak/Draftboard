/**
 * Client-side utilities for storage URL handling.
 * These work without server-side env vars by inspecting the URL itself.
 */

export function isVercelBlobUrl(url: string): boolean {
  return url.includes("blob.vercel-storage.com");
}

export function isSignedUrl(url: string): boolean {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

/**
 * Extract an R2 storage key from a URL.
 * Returns null for Vercel Blob URLs (already public, no signing needed)
 * and for URLs that don't match the upload path pattern.
 */
export function extractStorageKey(url: string): string | null {
  if (isVercelBlobUrl(url)) return null;
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

/**
 * Whether a URL needs to be signed for display.
 * Vercel Blob URLs and already-signed URLs don't need signing.
 */
export function needsUrlSigning(url: string): boolean {
  if (isVercelBlobUrl(url)) return false;
  if (isSignedUrl(url)) return false;
  return !!extractStorageKey(url);
}
