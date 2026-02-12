import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  ListPartsCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Check if R2 is configured
export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET_NAME);
}

// Only create S3 client if configured
const s3Client = isR2Configured()
  ? new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
      },
    })
  : null;

interface UploadUrlOptions {
  filename: string;
  contentType: string;
  userId: string;
}

interface MultipartUploadOptions {
  filename: string;
  contentType: string;
  userId: string;
}

interface MultipartPartOptions {
  key: string;
  uploadId: string;
  partNumber: number;
}

interface MultipartCompletePart {
  partNumber: number;
  etag: string;
}

interface MultipartCompleteOptions {
  key: string;
  uploadId: string;
  parts?: MultipartCompletePart[];
}

interface MultipartAbortOptions {
  key: string;
  uploadId: string;
}

function getR2Context(): { client: S3Client; bucket: string } {
  if (!s3Client || !R2_BUCKET_NAME) {
    throw new Error(
      "R2 storage is not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables."
    );
  }

  return { client: s3Client, bucket: R2_BUCKET_NAME };
}

function makeUploadKey(userId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `uploads/${userId}/${timestamp}-${sanitizedFilename}`;
}

export async function getPresignedUploadUrl({
  filename,
  contentType,
  userId,
}: UploadUrlOptions): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const { client, bucket } = getR2Context();

  const key = makeUploadKey(userId, filename);

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

  // Public URL for accessing the file after upload
  const publicUrl = R2_PUBLIC_URL
    ? `${R2_PUBLIC_URL}/${key}`
    : `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

  return { uploadUrl, key, publicUrl };
}

export async function getPresignedDownloadUrl(key: string): Promise<string> {
  const { client, bucket } = getR2Context();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  return url;
}

// Generate a longer-lived signed URL for external services like Discord/Slack webhooks
// These URLs are valid for 7 days
export async function getWebhookImageUrl(key: string): Promise<string> {
  const { client, bucket } = getR2Context();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  // 7 days expiration for webhook images
  const url = await getSignedUrl(client, command, { expiresIn: 604800 });
  return url;
}

export function getPublicUrl(key: string): string {
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${key}`;
  }
  return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}

export async function startMultipartUpload({
  filename,
  contentType,
  userId,
}: MultipartUploadOptions): Promise<{ uploadId: string; key: string; publicUrl: string }> {
  const { client, bucket } = getR2Context();
  const key = makeUploadKey(userId, filename);

  const command = new CreateMultipartUploadCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const result = await client.send(command);
  if (!result.UploadId) {
    throw new Error("Failed to initialize multipart upload");
  }

  return {
    uploadId: result.UploadId,
    key,
    publicUrl: getPublicUrl(key),
  };
}

export async function getMultipartPartUploadUrl({
  key,
  uploadId,
  partNumber,
}: MultipartPartOptions): Promise<{ uploadUrl: string }> {
  const { client, bucket } = getR2Context();
  const command = new UploadPartCommand({
    Bucket: bucket,
    Key: key,
    UploadId: uploadId,
    PartNumber: partNumber,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  return { uploadUrl };
}

export async function completeMultipartUpload({
  key,
  uploadId,
  parts,
}: MultipartCompleteOptions): Promise<{ publicUrl: string }> {
  const { client, bucket } = getR2Context();

  let completedParts = parts;
  if (!completedParts || completedParts.length === 0) {
    const listedParts: MultipartCompletePart[] = [];
    let partNumberMarker: string | undefined;

    do {
      const listCommand = new ListPartsCommand({
        Bucket: bucket,
        Key: key,
        UploadId: uploadId,
        PartNumberMarker: partNumberMarker,
      });
      const listResult = await client.send(listCommand);

      for (const part of listResult.Parts ?? []) {
        if (part.PartNumber && part.ETag) {
          listedParts.push({
            partNumber: part.PartNumber,
            etag: part.ETag,
          });
        }
      }

      partNumberMarker = listResult.NextPartNumberMarker ?? undefined;
      if (!listResult.IsTruncated) {
        break;
      }
    } while (true);

    completedParts = listedParts;
  }

  if (!completedParts || completedParts.length === 0) {
    throw new Error("No multipart upload parts found to complete upload");
  }

  const command = new CompleteMultipartUploadCommand({
    Bucket: bucket,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: completedParts
        .sort((a, b) => a.partNumber - b.partNumber)
        .map((part) => ({
          ETag: part.etag,
          PartNumber: part.partNumber,
        })),
    },
  });

  await client.send(command);
  return { publicUrl: getPublicUrl(key) };
}

export async function abortMultipartUpload({
  key,
  uploadId,
}: MultipartAbortOptions): Promise<void> {
  const { client, bucket } = getR2Context();
  const command = new AbortMultipartUploadCommand({
    Bucket: bucket,
    Key: key,
    UploadId: uploadId,
  });

  await client.send(command);
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
