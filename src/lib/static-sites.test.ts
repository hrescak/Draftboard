import { describe, expect, it } from "vitest";
import {
  buildStaticObjectCandidates,
  inferStaticAssetCacheControl,
  normalizeStaticObjectPath,
  normalizeStaticSiteSlug,
} from "~/lib/static-sites";

describe("normalizeStaticSiteSlug", () => {
  it("normalizes valid slugs", () => {
    expect(normalizeStaticSiteSlug(" My-Site ")).toBe("my-site");
    expect(normalizeStaticSiteSlug("abc123")).toBe("abc123");
  });

  it("rejects invalid slugs", () => {
    expect(() => normalizeStaticSiteSlug("hello_world")).toThrow();
    expect(() => normalizeStaticSiteSlug("-hello")).toThrow();
  });
});

describe("normalizeStaticObjectPath", () => {
  it("normalizes nested paths", () => {
    expect(normalizeStaticObjectPath("/nested/path/index.html")).toBe(
      "nested/path/index.html",
    );
    expect(normalizeStaticObjectPath("nested\\path\\asset.js")).toBe(
      "nested/path/asset.js",
    );
  });

  it("rejects relative segments", () => {
    expect(() => normalizeStaticObjectPath("../secret.txt")).toThrow();
    expect(() => normalizeStaticObjectPath("pages/./index.html")).toThrow();
  });
});

describe("inferStaticAssetCacheControl", () => {
  it("uses no-cache for HTML-like assets", () => {
    expect(inferStaticAssetCacheControl("index.html")).toBe(
      "public, max-age=0, must-revalidate",
    );
    expect(inferStaticAssetCacheControl("data.json")).toBe(
      "public, max-age=0, must-revalidate",
    );
  });

  it("uses immutable cache for hashed assets", () => {
    expect(inferStaticAssetCacheControl("_next/static/chunk-abcdef12.js")).toBe(
      "public, max-age=31536000, immutable",
    );
  });

  it("uses short cache for non-hashed assets", () => {
    expect(inferStaticAssetCacheControl("images/logo.svg")).toBe(
      "public, max-age=3600",
    );
  });
});

describe("buildStaticObjectCandidates", () => {
  it("returns route fallbacks for extensionless paths", () => {
    expect(buildStaticObjectCandidates("about")).toEqual([
      "about",
      "about.html",
      "about/index.html",
    ]);
  });

  it("returns direct lookup for explicit assets", () => {
    expect(buildStaticObjectCandidates("_next/static/chunk.js")).toEqual([
      "_next/static/chunk.js",
    ]);
  });
});
