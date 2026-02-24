import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3_ENDPOINT = process.env.S3_ENDPOINT;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Check if S3-compatible storage is configured
export function isR2Configured(): boolean {
  return !!(
    (S3_ENDPOINT || R2_ACCOUNT_ID) &&
    R2_ACCESS_KEY_ID &&
    R2_SECRET_ACCESS_KEY &&
    R2_BUCKET_NAME
  );
}

// Build the S3 endpoint URL
function getEndpoint(): string {
  if (S3_ENDPOINT) return S3_ENDPOINT;
  return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

// Build a public URL for an object key
function buildPublicUrl(key: string): string {
  if (R2_PUBLIC_URL) return `${R2_PUBLIC_URL}/${key}`;
  if (S3_ENDPOINT) return `${S3_ENDPOINT}/${R2_BUCKET_NAME}/${key}`;
  return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}

// Only create S3 client if configured
const s3Client = isR2Configured()
  ? new S3Client({
      region: "auto",
      endpoint: getEndpoint(),
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: !!S3_ENDPOINT,
    })
  : null;

interface UploadUrlOptions {
  filename: string;
  contentType: string;
  userId: string;
}

export async function getPresignedUploadUrl({
  filename,
  contentType,
  userId,
}: UploadUrlOptions): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  if (!s3Client || !R2_BUCKET_NAME) {
    throw new Error(
      "S3 storage is not configured. Please set S3_ENDPOINT (or R2_ACCOUNT_ID), R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables."
    );
  }

  // Generate a unique key with user ID and timestamp
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `uploads/${userId}/${timestamp}-${sanitizedFilename}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return { uploadUrl, key, publicUrl: buildPublicUrl(key) };
}

export async function getPresignedDownloadUrl(key: string): Promise<string> {
  if (!s3Client || !R2_BUCKET_NAME) {
    throw new Error(
      "S3 storage is not configured. Please set S3_ENDPOINT (or R2_ACCOUNT_ID), R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables."
    );
  }

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

// Generate a longer-lived signed URL for external services like Discord/Slack webhooks
// These URLs are valid for 7 days
export async function getWebhookImageUrl(key: string): Promise<string> {
  if (!s3Client || !R2_BUCKET_NAME) {
    throw new Error(
      "S3 storage is not configured. Please set S3_ENDPOINT (or R2_ACCOUNT_ID), R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables."
    );
  }

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  // 7 days expiration for webhook images
  const url = await getSignedUrl(s3Client, command, { expiresIn: 604800 });
  return url;
}

export function getPublicUrl(key: string): string {
  return buildPublicUrl(key);
}

// Helper to determine file type
export function getFileType(mimeType: string): "IMAGE" | "VIDEO" | "FILE" {
  if (mimeType.startsWith("image/")) return "IMAGE";
  if (mimeType.startsWith("video/")) return "VIDEO";
  return "FILE";
}

// Helper to check if URL is a Figma URL
export function isFigmaUrl(url: string): boolean {
  return url.includes("figma.com");
}

// Helper to check if URL is a Loom URL
export function isLoomUrl(url: string): boolean {
  return url.includes("loom.com");
}
