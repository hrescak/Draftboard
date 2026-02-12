import { z } from "zod";

export const MAX_STANDARD_UPLOAD_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_FEEDBACK_VIDEO_DURATION_SEC = 3600; // 1 hour
export const MAX_FEEDBACK_AUDIO_DURATION_SEC = 300; // 5 minutes
export const MAX_FEEDBACK_VIDEO_SIZE_BYTES = 2_147_483_647; // PostgreSQL Int max
export const DEFAULT_FEEDBACK_MAX_VIDEO_DURATION_SEC = 300; // 5 minutes
export const DEFAULT_FEEDBACK_MAX_AUDIO_DURATION_SEC = 30; // 30 seconds
export const DEFAULT_FEEDBACK_MAX_VIDEO_SIZE = 1024 * 1024 * 1024; // 1GB
export const MULTIPART_UPLOAD_PART_SIZE = 8_388_608; // 8MB
export const MULTIPART_UPLOAD_PARALLEL_PARTS = 4;
export const MULTIPART_UPLOAD_MAX_RETRIES_PER_PART = 3;

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
  title: z.string().max(200).optional(),
  content: z.unknown(), // Lexical editor state JSON
  liveUrl: z.string().url().optional().nullable(),
  hideFromHome: z.boolean().default(false),
  visualFeedbackEnabled: z.boolean().default(false),
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
      metadata: z.unknown().optional(),
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
  content: z.unknown(), // Lexical editor state JSON
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
  content: z.unknown(),
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
  description: z.unknown().optional(), // Lexical editor state JSON
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
  size: z.number().max(MAX_STANDARD_UPLOAD_SIZE), // 100MB max
});

export const startMultipartUploadSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().positive().max(MAX_FEEDBACK_VIDEO_SIZE_BYTES),
});

export const multipartPartUrlSchema = z.object({
  key: z.string().min(1),
  uploadId: z.string().min(1),
  partNumber: z.number().int().min(1).max(10_000),
});

export const multipartCompleteSchema = z.object({
  key: z.string().min(1),
  uploadId: z.string().min(1),
  parts: z
    .array(
      z.object({
        partNumber: z.number().int().min(1).max(10_000),
        etag: z.string().min(1),
      })
    )
    .min(1)
    .optional(),
});

export const multipartAbortSchema = z.object({
  key: z.string().min(1),
  uploadId: z.string().min(1),
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
  content: z.unknown().optional().nullable(), // Lexical editor state JSON
  liveUrl: z.string().url().optional().nullable(),
  hideFromHome: z.boolean().default(false),
  visualFeedbackEnabled: z.boolean().default(false),
  projectIds: z.array(z.string()).default([]),
});

export const feedbackRegionSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  width: z.number().min(0).max(1),
  height: z.number().min(0).max(1),
});

export const feedbackRecordingSchema = z.object({
  videoUrl: z.string().url(),
  videoMimeType: z.string().min(1),
  videoSize: z.number().int().positive().max(MAX_FEEDBACK_VIDEO_SIZE_BYTES),
  durationMs: z
    .number()
    .int()
    .positive()
    .max(MAX_FEEDBACK_VIDEO_DURATION_SEC * 1000),
  hasCamera: z.boolean().default(false),
});

export const createFeedbackSessionSchema = z.object({
  postId: z.string(),
  type: z.enum(["VIDEO", "TEXT_ONLY"]),
  recording: feedbackRecordingSchema.optional(),
});

export const feedbackAnnotationEventSchema = z.object({
  frameId: z.string().optional(),
  tool: z.enum(["PEN", "ARROW", "HIGHLIGHT", "FRAME_CHANGE"]),
  tStartMs: z.number().int().min(0),
  tEndMs: z.number().int().min(0).optional(),
  order: z.number().int().min(0),
  payload: z.unknown(),
});

export const appendFeedbackAnnotationsSchema = z.object({
  sessionId: z.string(),
  events: z.array(feedbackAnnotationEventSchema).min(1).max(500),
});

export const createFeedbackCommentSchema = z.object({
  postId: z.string(),
  frameId: z.string(),
  sessionId: z.string().optional(),
  parentId: z.string().optional(),
  body: z.unknown().optional(),
  audio: z
    .object({
      url: z.string().url(),
      mimeType: z.string().min(1),
      durationSec: z.number().int().min(1).max(MAX_FEEDBACK_AUDIO_DURATION_SEC),
    })
    .optional(),
  region: feedbackRegionSchema,
  timestampMs: z.number().int().min(0).optional(),
});

export const setFeedbackCommentStatusSchema = z.object({
  commentId: z.string(),
  status: z.enum(["OPEN", "RESOLVED"]),
});

export const deleteFeedbackCommentSchema = z.object({
  commentId: z.string(),
});

export const deleteFeedbackSessionSchema = z.object({
  sessionId: z.string(),
});

export const feedbackByPostSchema = z.object({
  postId: z.string(),
});

export const feedbackSessionByIdSchema = z.object({
  sessionId: z.string(),
});

export const feedbackRecordViewSchema = z.object({
  postId: z.string(),
  sessionId: z.string().optional(),
});

export const feedbackRecordWatchTimeSchema = z.object({
  sessionId: z.string(),
  deltaMs: z.number().int().positive().max(120_000),
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
