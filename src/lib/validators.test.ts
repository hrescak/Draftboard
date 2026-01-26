import { describe, it, expect } from "vitest";
import {
  signUpSchema,
  signInSchema,
  updateProfileSchema,
  createPostSchema,
  createCommentSchema,
  toggleReactionSchema,
  createProjectSchema,
  paginationSchema,
  presignedUrlSchema,
  createEmojiSchema,
} from "./validators";

describe("signUpSchema", () => {
  it("should validate valid sign up data", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "password123",
      displayName: "John Doe",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = signUpSchema.safeParse({
      email: "invalid-email",
      password: "password123",
      displayName: "John Doe",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "short",
      displayName: "John Doe",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short display name", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "password123",
      displayName: "J",
    });
    expect(result.success).toBe(false);
  });
});

describe("signInSchema", () => {
  it("should validate valid sign in data", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "password",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty password", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("should validate partial updates", () => {
    const result = updateProfileSchema.safeParse({
      displayName: "New Name",
    });
    expect(result.success).toBe(true);
  });

  it("should validate avatar URL", () => {
    const result = updateProfileSchema.safeParse({
      avatarUrl: "https://example.com/avatar.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("should allow null avatar URL", () => {
    const result = updateProfileSchema.safeParse({
      avatarUrl: null,
    });
    expect(result.success).toBe(true);
  });
});

describe("createPostSchema", () => {
  it("should validate minimal post", () => {
    const result = createPostSchema.safeParse({
      content: { root: {} },
    });
    expect(result.success).toBe(true);
  });

  it("should validate post with all fields", () => {
    const result = createPostSchema.safeParse({
      title: "My Post",
      content: { root: {} },
      liveUrl: "https://example.com",
      projectIds: ["proj1", "proj2"],
      attachments: [
        {
          type: "IMAGE",
          url: "https://example.com/image.jpg",
          filename: "image.jpg",
          mimeType: "image/jpeg",
          size: 1000,
          order: 0,
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid attachment type", () => {
    const result = createPostSchema.safeParse({
      content: { root: {} },
      attachments: [
        {
          type: "INVALID",
          url: "https://example.com/file",
          filename: "file.txt",
          mimeType: "text/plain",
          size: 100,
          order: 0,
        },
      ],
    });
    expect(result.success).toBe(false);
  });
});

describe("createCommentSchema", () => {
  it("should validate basic comment", () => {
    const result = createCommentSchema.safeParse({
      postId: "post123",
      content: { root: {} },
    });
    expect(result.success).toBe(true);
  });

  it("should validate reply comment", () => {
    const result = createCommentSchema.safeParse({
      postId: "post123",
      content: { root: {} },
      parentId: "comment456",
    });
    expect(result.success).toBe(true);
  });

  it("should validate attachment comment", () => {
    const result = createCommentSchema.safeParse({
      postId: "post123",
      content: { root: {} },
      attachmentId: "att789",
      coordinates: { x: 100, y: 200 },
    });
    expect(result.success).toBe(true);
  });
});

describe("toggleReactionSchema", () => {
  it("should validate reaction on post", () => {
    const result = toggleReactionSchema.safeParse({
      type: "like",
      postId: "post123",
    });
    expect(result.success).toBe(true);
  });

  it("should validate reaction on comment", () => {
    const result = toggleReactionSchema.safeParse({
      type: "wow",
      commentId: "comment456",
    });
    expect(result.success).toBe(true);
  });

  it("should reject reaction without target", () => {
    const result = toggleReactionSchema.safeParse({
      type: "like",
    });
    expect(result.success).toBe(false);
  });
});

describe("createProjectSchema", () => {
  it("should validate minimal project", () => {
    const result = createProjectSchema.safeParse({
      name: "My Project",
    });
    expect(result.success).toBe(true);
  });

  it("should validate project with URLs", () => {
    const result = createProjectSchema.safeParse({
      name: "My Project",
      urls: [
        { title: "Brief", url: "https://docs.google.com/brief" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const result = createProjectSchema.safeParse({
      name: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("paginationSchema", () => {
  it("should use default values", () => {
    const result = paginationSchema.parse({});
    expect(result.limit).toBe(20);
    expect(result.cursor).toBeUndefined();
  });

  it("should validate cursor", () => {
    const result = paginationSchema.safeParse({
      cursor: "cursor123",
      limit: 10,
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid limit", () => {
    const result = paginationSchema.safeParse({
      limit: 100,
    });
    expect(result.success).toBe(false);
  });
});

describe("presignedUrlSchema", () => {
  it("should validate upload request", () => {
    const result = presignedUrlSchema.safeParse({
      filename: "image.jpg",
      contentType: "image/jpeg",
      size: 1024 * 1024, // 1MB
    });
    expect(result.success).toBe(true);
  });

  it("should reject files over 100MB", () => {
    const result = presignedUrlSchema.safeParse({
      filename: "large-file.zip",
      contentType: "application/zip",
      size: 150 * 1024 * 1024, // 150MB
    });
    expect(result.success).toBe(false);
  });
});

describe("createEmojiSchema", () => {
  it("should validate valid emoji", () => {
    const result = createEmojiSchema.safeParse({
      name: "party_parrot",
      imageUrl: "https://example.com/emoji.png",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid characters in name", () => {
    const result = createEmojiSchema.safeParse({
      name: "Party-Parrot",
      imageUrl: "https://example.com/emoji.png",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short name", () => {
    const result = createEmojiSchema.safeParse({
      name: "x",
      imageUrl: "https://example.com/emoji.png",
    });
    expect(result.success).toBe(false);
  });
});
