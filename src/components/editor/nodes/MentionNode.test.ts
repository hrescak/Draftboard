import { describe, it, expect } from "vitest";
import { MentionNode, $isMentionNode } from "./MentionNode";

// Note: Lexical nodes require an active editor context for most operations.
// These tests focus on static methods that don't require editor context.

describe("MentionNode", () => {
  it("should have correct static type", () => {
    expect(MentionNode.getType()).toBe("mention");
  });

  it("should return false for $isMentionNode with null", () => {
    expect($isMentionNode(null)).toBe(false);
  });

  it("should return false for $isMentionNode with undefined", () => {
    expect($isMentionNode(undefined)).toBe(false);
  });

  it("should return false for $isMentionNode with non-MentionNode", () => {
    const fakeNode = { __type: "text" };
    expect($isMentionNode(fakeNode as never)).toBe(false);
  });
});
