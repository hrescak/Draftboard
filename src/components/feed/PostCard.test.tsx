import { describe, it, expect, vi } from "vitest";

// Mock the api
vi.mock("~/lib/trpc/client", () => ({
  api: {
    useUtils: () => ({
      post: {
        feed: { invalidate: vi.fn() },
        getById: { invalidate: vi.fn() },
      },
    }),
    reaction: {
      toggle: {
        useMutation: () => ({
          mutate: vi.fn(),
          isPending: false,
        }),
      },
    },
  },
}));

// Test the extractPlainText utility function from PostCard
function extractPlainText(content: unknown): string {
  if (!content || typeof content !== "object") return "";

  const root = (content as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return "";

  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return "";

  const texts: string[] = [];

  function extractFromNode(node: unknown): void {
    if (!node || typeof node !== "object") return;

    const nodeObj = node as Record<string, unknown>;

    if (nodeObj.type === "text" && typeof nodeObj.text === "string") {
      texts.push(nodeObj.text);
    }

    if (Array.isArray(nodeObj.children)) {
      nodeObj.children.forEach(extractFromNode);
    }
  }

  children.forEach(extractFromNode);
  return texts.join(" ");
}

describe("extractPlainText", () => {
  it("should extract text from Lexical editor state", () => {
    const content = {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Hello",
              },
              {
                type: "text",
                text: "World",
              },
            ],
          },
        ],
      },
    };

    expect(extractPlainText(content)).toBe("Hello World");
  });

  it("should handle empty content", () => {
    expect(extractPlainText(null)).toBe("");
    expect(extractPlainText(undefined)).toBe("");
    expect(extractPlainText({})).toBe("");
  });

  it("should handle nested paragraphs", () => {
    const content = {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", text: "First paragraph" },
            ],
          },
          {
            type: "paragraph",
            children: [
              { type: "text", text: "Second paragraph" },
            ],
          },
        ],
      },
    };

    expect(extractPlainText(content)).toBe("First paragraph Second paragraph");
  });

  it("should skip non-text nodes", () => {
    const content = {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", text: "Before" },
              { type: "mention", mentionName: "user" },
              { type: "text", text: "after" },
            ],
          },
        ],
      },
    };

    expect(extractPlainText(content)).toBe("Before after");
  });

  it("should handle content with only mentions", () => {
    const content = {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              { type: "mention", mentionName: "user1" },
              { type: "mention", mentionName: "user2" },
            ],
          },
        ],
      },
    };

    expect(extractPlainText(content)).toBe("");
  });

  it("should handle deeply nested content", () => {
    const content = {
      root: {
        children: [
          {
            type: "list",
            children: [
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Item 1" },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Item 2" },
                ],
              },
            ],
          },
        ],
      },
    };

    expect(extractPlainText(content)).toBe("Item 1 Item 2");
  });
});
