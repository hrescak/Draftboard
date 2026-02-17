import { randomBytes } from "crypto";
import { z } from "zod";

const STATIC_SITE_SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

const NO_CACHE_EXTENSIONS = new Set([
  "html",
  "json",
  "txt",
  "xml",
  "webmanifest",
  "map",
]);

const HASHED_FILE_PATTERN = /(?:^|[.-])[a-f0-9]{8,}(?:[.-]|$)/i;

export function getPublishTokenFromRequest(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const headerToken = request.headers.get("x-static-publish-token");
  return headerToken?.trim() || null;
}

export function normalizeStaticSiteSlug(input: string): string {
  const slug = input.trim().toLowerCase();

  if (!STATIC_SITE_SLUG_REGEX.test(slug)) {
    throw new Error(
      "Invalid site slug. Use lowercase letters, numbers, and hyphens (max 63 chars).",
    );
  }

  return slug;
}

export function normalizeStaticObjectPath(input: string): string {
  const sanitized = input.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!sanitized) {
    throw new Error("File path cannot be empty.");
  }

  const segments = sanitized.split("/").filter((segment) => segment.length > 0);
  if (segments.length === 0) {
    throw new Error("File path cannot be empty.");
  }

  for (const segment of segments) {
    if (segment === "." || segment === "..") {
      throw new Error("File path cannot contain relative segments.");
    }
    if (segment.includes("\0")) {
      throw new Error("File path cannot contain null bytes.");
    }
  }

  return segments.join("/");
}

export function normalizeStaticRequestPath(path: string[] | undefined): string {
  if (!path || path.length === 0) {
    return "";
  }

  return normalizeStaticObjectPath(path.join("/"));
}

function fileExtension(path: string): string {
  const fileName = path.split("/").pop() ?? "";
  const index = fileName.lastIndexOf(".");
  if (index === -1 || index === fileName.length - 1) {
    return "";
  }
  return fileName.slice(index + 1).toLowerCase();
}

function hasExtension(path: string): boolean {
  return fileExtension(path).length > 0;
}

export function inferStaticAssetCacheControl(path: string): string {
  const extension = fileExtension(path);

  if (NO_CACHE_EXTENSIONS.has(extension)) {
    return "public, max-age=0, must-revalidate";
  }

  const fileName = path.split("/").pop() ?? "";
  if (HASHED_FILE_PATTERN.test(fileName)) {
    return "public, max-age=31536000, immutable";
  }

  return "public, max-age=3600";
}

export function buildStaticObjectCandidates(path: string): string[] {
  if (!path) {
    return ["index.html"];
  }

  if (hasExtension(path)) {
    return [path];
  }

  return [path, `${path}.html`, `${path}/index.html`];
}

export function makeStaticDeploymentKey(): string {
  return `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
}

export function staticSiteUrl(
  baseUrl: string,
  profileSlug: string,
  siteSlug: string,
): string {
  return `${baseUrl.replace(/\/+$/, "")}/u/${profileSlug}/${siteSlug}`;
}

export const staticSiteInitSchema = z.object({
  siteSlug: z.string().min(1).max(63),
  ownerProfileSlug: z.string().min(1).max(63).optional(),
  siteName: z.string().trim().min(1).max(120).optional(),
});

export const staticSiteSignSchema = z.object({
  siteSlug: z.string().min(1).max(63),
  ownerProfileSlug: z.string().min(1).max(63).optional(),
  deploymentId: z.string().min(1),
  files: z
    .array(
      z.object({
        path: z.string().min(1),
        contentType: z.string().trim().min(1).max(255),
      }),
    )
    .min(1)
    .max(500),
});

export const staticSiteFinalizeSchema = z.object({
  siteSlug: z.string().min(1).max(63),
  ownerProfileSlug: z.string().min(1).max(63).optional(),
  deploymentId: z.string().min(1),
  fileCount: z.number().int().nonnegative().optional(),
  totalBytes: z.number().int().nonnegative().optional(),
  createPost: z.boolean().optional(),
});

export const createPublishSessionSchema = z.object({
  expiresInMinutes: z.number().int().min(5).max(240).optional(),
});
