import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  cn,
  formatRelativeTime,
  getInitials,
  truncateText,
  isValidUrl,
  extractDomain,
  isFigmaUrl,
  isLoomUrl,
  generateId,
} from "./utils";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should handle tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-23T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'just now' for recent times", () => {
    const date = new Date("2026-01-23T11:59:30Z");
    expect(formatRelativeTime(date)).toBe("just now");
  });

  it("should return minutes ago", () => {
    const date = new Date("2026-01-23T11:30:00Z");
    expect(formatRelativeTime(date)).toBe("30m ago");
  });

  it("should return hours ago", () => {
    const date = new Date("2026-01-23T07:00:00Z");
    expect(formatRelativeTime(date)).toBe("5h ago");
  });

  it("should return days ago", () => {
    const date = new Date("2026-01-20T12:00:00Z");
    expect(formatRelativeTime(date)).toBe("3d ago");
  });

  it("should return weeks ago", () => {
    const date = new Date("2026-01-09T12:00:00Z");
    expect(formatRelativeTime(date)).toBe("2w ago");
  });
});

describe("getInitials", () => {
  it("should return initials for full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should return single initial for single name", () => {
    expect(getInitials("John")).toBe("J");
  });

  it("should handle multiple names", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
  });

  it("should uppercase initials", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});

describe("truncateText", () => {
  it("should not truncate short text", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("should truncate long text", () => {
    expect(truncateText("Hello World", 5)).toBe("Hello...");
  });

  it("should handle exact length", () => {
    expect(truncateText("Hello", 5)).toBe("Hello");
  });
});

describe("isValidUrl", () => {
  it("should return true for valid URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://localhost:3000")).toBe(true);
  });

  it("should return false for invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });
});

describe("extractDomain", () => {
  it("should extract domain from URL", () => {
    expect(extractDomain("https://www.example.com/path")).toBe("example.com");
  });

  it("should remove www prefix", () => {
    expect(extractDomain("https://www.google.com")).toBe("google.com");
  });

  it("should handle URLs without www", () => {
    expect(extractDomain("https://github.com")).toBe("github.com");
  });

  it("should return input for invalid URLs", () => {
    expect(extractDomain("not-a-url")).toBe("not-a-url");
  });
});

describe("isFigmaUrl", () => {
  it("should return true for Figma URLs", () => {
    expect(isFigmaUrl("https://www.figma.com/file/abc123")).toBe(true);
    expect(isFigmaUrl("https://figma.com/design/xyz")).toBe(true);
  });

  it("should return false for non-Figma URLs", () => {
    expect(isFigmaUrl("https://google.com")).toBe(false);
  });
});

describe("isLoomUrl", () => {
  it("should return true for Loom URLs", () => {
    expect(isLoomUrl("https://www.loom.com/share/abc123")).toBe(true);
    expect(isLoomUrl("https://loom.com/share/xyz")).toBe(true);
  });

  it("should return false for non-Loom URLs", () => {
    expect(isLoomUrl("https://youtube.com")).toBe(false);
  });
});

describe("generateId", () => {
  it("should generate unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("should generate alphanumeric IDs", () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});
