import { z } from "zod";

// User validators
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

// Post validators
export const createPostSchema = z.object({
  title: z.string().max(200).optional().nullable(),
  content: z.any(), // Lexical editor state JSON
  liveUrl: z.string().url().optional().nullable(),
  hideFromHome: z.boolean().default(false),
  projectIds: z.array(z.string()).default([]),
  attachments: z.array(
    z.object({
      type: z.enum(["IMAGE", "VIDEO", "FILE", "FIGMA", "LOOM"]),
      url: z.string().url(),
      filename: z.string(),
      mimeType: z.string(),
      size: z.number(),
      width: z.number().optional(),
      height: z.number().optional(),
      thumbnailUrl: z.string().url().optional(),
      metadata: z.any().optional(),
      order: z.number(),
    })
  ).default([]),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string(),
});

// Comment validators
export const createCommentSchema = z.object({
  postId: z.string(),
  content: z.any(), // Lexical editor state JSON
  parentId: z.string().optional(),
  attachmentId: z.string().optional(),
  coordinates: z
    .object({
      x: z.number().optional(),
      y: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      timestamp: z.number().optional(),
    })
    .optional(),
});

export const updateCommentSchema = z.object({
  id: z.string(),
  content: z.any(),
});

// Reaction validators
export const toggleReactionSchema = z.object({
  type: z.string().min(1).max(50),
  postId: z.string().optional(),
  commentId: z.string().optional(),
}).refine(
  (data) => data.postId || data.commentId,
  "Either postId or commentId must be provided"
);

// Project validators
export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.any().optional(), // Lexical editor state JSON
  coverUrl: z.string().url().optional().nullable(),
  urls: z.array(
    z.object({
      title: z.string().min(1).max(100),
      url: z.string().url(),
    })
  ).default([]),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string(),
});

// Pagination
export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().min(1).max(50).default(20),
});

// Upload validators
export const presignedUrlSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number().max(100 * 1024 * 1024), // 100MB max
});

// Custom emoji
export const createEmojiSchema = z.object({
  name: z.string().min(2).max(32).regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  imageUrl: z.string().url(),
});

// Draft validators
export const saveDraftSchema = z.object({
  id: z.string().optional(), // If provided, update existing draft; otherwise create new
  title: z.string().max(200).optional().nullable(),
  content: z.any().optional().nullable(), // Lexical editor state JSON
  liveUrl: z.string().url().optional().nullable(),
  projectIds: z.array(z.string()).default([]),
});

export const deleteDraftSchema = z.object({
  id: z.string(),
});

// Password reset validators
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});
