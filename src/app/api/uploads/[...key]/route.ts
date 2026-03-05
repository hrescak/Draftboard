import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { head as blobHead, list as blobList } from "@vercel/blob";
import { getStorageProvider } from "~/lib/storage";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

function getS3Client(): S3Client | null {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function parseRange(
  rangeHeader: string,
  totalSize: number
): { offset: number; length: number; end: number } | null {
  const match = rangeHeader.match(/bytes=(\d*)-(\d*)/);
  if (!match) return null;

  let offset = match[1] ? parseInt(match[1], 10) : 0;
  let end = match[2] ? parseInt(match[2], 10) : totalSize - 1;

  if (offset >= totalSize) return null;
  if (end >= totalSize) end = totalSize - 1;

  return { offset, length: end - offset + 1, end };
}

async function handleR2(
  key: string,
  rangeHeader: string | null
): Promise<NextResponse> {
  const s3 = getS3Client();
  if (!s3 || !R2_BUCKET_NAME) {
    return NextResponse.json(
      { error: "R2 storage is not configured" },
      { status: 500 }
    );
  }

  // Get object metadata for total size and content type
  const headCmd = new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key });
  let contentLength: number;
  let contentType: string;
  try {
    const headResp = await s3.send(headCmd);
    contentLength = headResp.ContentLength ?? 0;
    contentType = headResp.ContentType ?? "application/octet-stream";
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  if (rangeHeader) {
    const range = parseRange(rangeHeader, contentLength);
    if (!range) {
      return new NextResponse("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${contentLength}` },
      });
    }

    const getCmd = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Range: `bytes=${range.offset}-${range.end}`,
    });
    const getResp = await s3.send(getCmd);
    const body = getResp.Body as ReadableStream | null;

    return new NextResponse(body, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(range.length),
        "Content-Range": `bytes ${range.offset}-${range.end}/${contentLength}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Full file request
  const getCmd = new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key });
  const getResp = await s3.send(getCmd);
  const body = getResp.Body as ReadableStream | null;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(contentLength),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

async function handleVercelBlob(
  key: string,
  rangeHeader: string | null
): Promise<NextResponse> {
  // For Vercel Blob, we need to look up the blob by its pathname
  // The blob URL is stored in the DB, but we can construct it from the store
  // We'll proxy through the public blob URL with range support
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Vercel Blob storage is not configured" },
      { status: 500 }
    );
  }

  // List blobs to find the one matching this key
  // Use the blob store's list API to find the URL for this key
  const prefix = process.env.BLOB_PATH_PREFIX;
  const pathname = prefix ? `${prefix}/${key}` : key;

  // Try to get blob metadata using the list API
  let blobUrl: string;
  let contentLength: number;
  let contentType: string;
  try {
    // Construct the likely blob URL and verify it exists via head
    const listing = await blobList({ prefix: pathname, limit: 1 });
    const blob = listing.blobs.find(
      (b: { pathname: string }) => b.pathname === pathname || b.pathname.endsWith(key)
    );
    if (!blob) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    blobUrl = blob.url;
    const headInfo = await blobHead(blobUrl);
    contentLength = headInfo.size;
    contentType = headInfo.contentType;
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Proxy the request to Vercel Blob with range header forwarded
  const fetchHeaders: HeadersInit = {};
  if (rangeHeader) {
    fetchHeaders["Range"] = rangeHeader;
  }

  const response = await fetch(blobUrl, { headers: fetchHeaders });

  if (rangeHeader && response.status === 206) {
    return new NextResponse(response.body, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": response.headers.get("Content-Length") ?? String(contentLength),
        "Content-Range": response.headers.get("Content-Range") ?? "",
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // If range was requested but blob didn't return 206, handle manually
  if (rangeHeader) {
    const range = parseRange(rangeHeader, contentLength);
    if (!range) {
      return new NextResponse("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${contentLength}` },
      });
    }

    const fullBody = await response.arrayBuffer();
    const sliced = fullBody.slice(range.offset, range.offset + range.length);

    return new NextResponse(sliced, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(range.length),
        "Content-Range": `bytes ${range.offset}-${range.end}/${contentLength}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse(response.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(contentLength),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
): Promise<NextResponse> {
  const { key: keySegments } = await params;
  const key = keySegments.join("/");

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const rangeHeader = request.headers.get("Range");
  const provider = getStorageProvider();

  if (provider === "vercel-blob") {
    return handleVercelBlob(key, rangeHeader);
  }

  return handleR2(key, rangeHeader);
}
