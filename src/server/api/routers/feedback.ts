import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  activeUserProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  appendFeedbackAnnotationsSchema,
  createFeedbackCommentSchema,
  createFeedbackSessionSchema,
  DEFAULT_FEEDBACK_MAX_AUDIO_DURATION_SEC,
  DEFAULT_FEEDBACK_MAX_VIDEO_DURATION_SEC,
  DEFAULT_FEEDBACK_MAX_VIDEO_SIZE,
  deleteFeedbackCommentSchema,
  deleteFeedbackSessionSchema,
  feedbackByPostSchema,
  feedbackRecordViewSchema,
  feedbackRecordWatchTimeSchema,
  feedbackSessionByIdSchema,
  setFeedbackCommentStatusSchema,
} from "~/lib/validators";

interface ImageFrameSnapshot {
  attachmentId: string;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  order: number;
}

function extractImageFrames(
  attachments: Array<{
    id: string;
    type: string;
    url: string;
    thumbnailUrl: string | null;
    width: number | null;
    height: number | null;
    order: number;
  }>
): ImageFrameSnapshot[] {
  return attachments
    .filter((attachment) => attachment.type === "IMAGE")
    .sort((a, b) => a.order - b.order)
    .map((attachment) => ({
      attachmentId: attachment.id,
      url: attachment.url,
      thumbnailUrl: attachment.thumbnailUrl ?? undefined,
      width: attachment.width ?? undefined,
      height: attachment.height ?? undefined,
      order: attachment.order,
    }));
}

function getFrameSignature(frames: ImageFrameSnapshot[]): string {
  return JSON.stringify(
    frames.map((frame) => ({
      url: frame.url,
      width: frame.width ?? null,
      height: frame.height ?? null,
      order: frame.order,
    }))
  );
}

function isLexicalEditorState(value: unknown): value is Prisma.InputJsonValue {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return !!record.root && typeof record.root === "object";
}

function buildLexicalTextState(text: string): Prisma.InputJsonValue {
  return {
    root: {
      type: "root",
      version: 1,
      format: "",
      indent: 0,
      direction: null,
      children: [
        {
          type: "paragraph",
          version: 1,
          format: "",
          indent: 0,
          direction: null,
          children: [
            {
              type: "text",
              version: 1,
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text,
            },
          ],
        },
      ],
    },
  } as Prisma.InputJsonValue;
}

function buildVisualFeedbackCoordinates(input: {
  entryType: "SESSION" | "COMMENT";
  feedbackSessionId?: string | null;
  feedbackCommentId?: string | null;
  frameId?: string | null;
  hasAudio?: boolean;
}) {
  return {
    source: "VISUAL_FEEDBACK",
    entryType: input.entryType,
    feedbackSessionId: input.feedbackSessionId ?? null,
    feedbackCommentId: input.feedbackCommentId ?? null,
    frameId: input.frameId ?? null,
    hasAudio: input.hasAudio ?? false,
  } as Prisma.InputJsonValue;
}

function getDiscussionMirrorContent(input: {
  body?: unknown;
  fallbackText: string;
}) {
  if (input.body && isLexicalEditorState(input.body)) {
    return input.body;
  }

  return buildLexicalTextState(input.fallbackText);
}

async function ensureFeedbackArtifactForPost(ctx: {
  db: typeof import("~/server/db").db;
}, postId: string) {
  const settings = await ctx.db.siteSettings.findUnique({
    where: { id: "default" },
    select: { visualFeedbackEnabled: true },
  });
  if (!settings?.visualFeedbackEnabled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Visual feedback is disabled by your workspace admin",
    });
  }

  const post = await ctx.db.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      authorId: true,
      visualFeedbackEnabled: true,
      attachments: {
        select: {
          id: true,
          type: true,
          url: true,
          thumbnailUrl: true,
          width: true,
          height: true,
          order: true,
        },
        orderBy: { order: "asc" },
      },
      feedbackArtifact: {
        select: {
          id: true,
          postId: true,
        },
      },
    },
  });

  if (!post) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
  }

  if (!post.visualFeedbackEnabled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Visual feedback is disabled for this post",
    });
  }

  if (post.feedbackArtifact) {
    return post.feedbackArtifact;
  }

  const frames = extractImageFrames(post.attachments);
  if (frames.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Visual feedback requires at least one image frame",
    });
  }

  const artifact = await ctx.db.feedbackArtifact.create({
    data: {
      postId: post.id,
      createdById: post.authorId,
      frameSignature: getFrameSignature(frames),
      frames: {
        create: frames,
      },
    },
    select: {
      id: true,
      postId: true,
    },
  });

  return artifact;
}

export const feedbackRouter = createTRPCRouter({
  getByPost: protectedProcedure
    .input(feedbackByPostSchema)
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: {
          id: true,
          visualFeedbackEnabled: true,
          feedbackArtifact: {
            include: {
              frames: {
                orderBy: { order: "asc" },
              },
              sessions: {
                orderBy: { createdAt: "desc" },
                include: {
                  author: {
                    select: {
                      id: true,
                      displayName: true,
                      avatarUrl: true,
                    },
                  },
                  _count: {
                    select: {
                      annotations: true,
                      comments: true,
                    },
                  },
                },
              },
              comments: {
                where: { parentId: null },
                orderBy: { createdAt: "asc" },
                include: {
                  author: {
                    select: {
                      id: true,
                      displayName: true,
                      avatarUrl: true,
                    },
                  },
                  frame: {
                    select: {
                      id: true,
                      order: true,
                    },
                  },
                  replies: {
                    orderBy: { createdAt: "asc" },
                    include: {
                      author: {
                        select: {
                          id: true,
                          displayName: true,
                          avatarUrl: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      return {
        postId: post.id,
        visualFeedbackEnabled: post.visualFeedbackEnabled,
        artifact: post.feedbackArtifact,
      };
    }),

  getSession: protectedProcedure
    .input(feedbackSessionByIdSchema)
    .query(async ({ ctx, input }) => {
      const session = await ctx.db.feedbackSession.findUnique({
        where: { id: input.sessionId },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          artifact: {
            select: {
              id: true,
              postId: true,
              post: {
                select: {
                  id: true,
                  visualFeedbackEnabled: true,
                },
              },
            },
          },
          annotations: {
            orderBy: { order: "asc" },
          },
          comments: {
            where: { parentId: null },
            orderBy: { createdAt: "asc" },
            include: {
              author: {
                select: {
                  id: true,
                  displayName: true,
                  avatarUrl: true,
                },
              },
              replies: {
                orderBy: { createdAt: "asc" },
                include: {
                  author: {
                    select: {
                      id: true,
                      displayName: true,
                      avatarUrl: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!session) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback session not found" });
      }

      return session;
    }),

  createSession: activeUserProcedure
    .input(createFeedbackSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const artifact = await ensureFeedbackArtifactForPost(ctx, input.postId);
      const settings = await ctx.db.siteSettings.findUnique({
        where: { id: "default" },
        select: {
          feedbackMaxVideoDurationSec: true,
          feedbackMaxVideoSizeBytes: true,
        },
      });

      const maxVideoDurationSec = Math.max(
        30,
        settings?.feedbackMaxVideoDurationSec ??
          DEFAULT_FEEDBACK_MAX_VIDEO_DURATION_SEC
      );
      const maxVideoDurationMs =
        maxVideoDurationSec * 1000;
      const maxVideoSizeBytes = Math.max(
        10 * 1024 * 1024,
        settings?.feedbackMaxVideoSizeBytes ?? DEFAULT_FEEDBACK_MAX_VIDEO_SIZE
      );

      if (input.type === "VIDEO" && !input.recording) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Video session recording metadata is required",
        });
      }

      if (input.type === "VIDEO" && input.recording) {
        if (input.recording.durationMs > maxVideoDurationMs) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Video duration exceeds maximum (${Math.floor(maxVideoDurationMs / 1000)} seconds).`,
          });
        }

        if (input.recording.videoSize > maxVideoSizeBytes) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Video size exceeds maximum (${maxVideoSizeBytes} bytes).`,
          });
        }
      }

      const session = await ctx.db.feedbackSession.create({
        data: {
          artifactId: artifact.id,
          authorId: ctx.session.user.id,
          type: input.type,
          videoUrl: input.recording?.videoUrl,
          videoMimeType: input.recording?.videoMimeType,
          videoSize: input.recording?.videoSize,
          durationMs: input.recording?.durationMs,
          hasCamera: input.recording?.hasCamera ?? false,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          artifact: {
            select: {
              postId: true,
              post: {
                select: {
                  authorId: true,
                },
              },
            },
          },
        },
      });

      const postAuthorId = session.artifact.post.authorId;
      if (postAuthorId !== ctx.session.user.id) {
        await ctx.db.notification.create({
          data: {
            type: "FEEDBACK_SESSION",
            userId: postAuthorId,
            actorId: ctx.session.user.id,
            postId: session.artifact.postId,
            feedbackSessionId: session.id,
          },
        });
      }

      const firstFrame = await ctx.db.feedbackFrame.findFirst({
        where: {
          artifactId: artifact.id,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          attachmentId: true,
        },
      });

      const durationSec =
        typeof input.recording?.durationMs === "number"
          ? Math.max(1, Math.round(input.recording.durationMs / 1000))
          : null;
      const summaryText =
        input.type === "VIDEO"
          ? durationSec
            ? `Added visual feedback video (${durationSec}s). Open visual feedback to watch.`
            : "Added visual feedback video. Open visual feedback to watch."
          : "Added visual feedback session.";

      await ctx.db.comment.create({
        data: {
          postId: session.artifact.postId,
          authorId: ctx.session.user.id,
          attachmentId: firstFrame?.attachmentId ?? null,
          content: buildLexicalTextState(summaryText),
          coordinates: buildVisualFeedbackCoordinates({
            entryType: "SESSION",
            feedbackSessionId: session.id,
            frameId: firstFrame?.id ?? null,
          }),
        },
      });

      return session;
    }),

  appendAnnotations: activeUserProcedure
    .input(appendFeedbackAnnotationsSchema)
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.feedbackSession.findUnique({
        where: { id: input.sessionId },
        select: {
          id: true,
          authorId: true,
          artifactId: true,
          artifact: {
            select: {
              frames: {
                select: { id: true },
              },
            },
          },
        },
      });

      if (!session) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback session not found" });
      }

      if (session.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only the session author can append annotations" });
      }

      const frameIds = new Set(session.artifact.frames.map((frame) => frame.id));
      for (const event of input.events) {
        if (event.frameId && !frameIds.has(event.frameId)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "One or more annotations reference a frame outside this artifact",
          });
        }
      }

      await ctx.db.feedbackAnnotation.createMany({
        data: input.events.map((event) => ({
          sessionId: session.id,
          frameId: event.frameId,
          tool: event.tool,
          tStartMs: event.tStartMs,
          tEndMs: event.tEndMs,
          order: event.order,
          payload: event.payload as Prisma.InputJsonValue,
        })),
      });

      return { success: true, count: input.events.length };
    }),

  createComment: activeUserProcedure
    .input(createFeedbackCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const artifact = await ensureFeedbackArtifactForPost(ctx, input.postId);
      const settings = await ctx.db.siteSettings.findUnique({
        where: { id: "default" },
        select: {
          feedbackMaxAudioDurationSec: true,
        },
      });
      const maxAudioDurationSec = Math.max(
        5,
        settings?.feedbackMaxAudioDurationSec ??
          DEFAULT_FEEDBACK_MAX_AUDIO_DURATION_SEC
      );

      if (!input.body && !input.audio) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A feedback comment requires text, audio, or both",
        });
      }

      if (input.audio && input.audio.durationSec > maxAudioDurationSec) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Audio duration exceeds maximum (${maxAudioDurationSec} seconds).`,
        });
      }

      const frame = await ctx.db.feedbackFrame.findFirst({
        where: {
          id: input.frameId,
          artifactId: artifact.id,
        },
        select: { id: true, attachmentId: true },
      });

      if (!frame) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Frame not found for this post artifact" });
      }

      if (input.sessionId) {
        const session = await ctx.db.feedbackSession.findFirst({
          where: {
            id: input.sessionId,
            artifactId: artifact.id,
          },
          select: { id: true },
        });
        if (!session) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Session not found for this post artifact",
          });
        }
      }

      if (input.parentId) {
        const parent = await ctx.db.feedbackComment.findUnique({
          where: { id: input.parentId },
          select: { id: true, parentId: true, artifactId: true },
        });

        if (!parent || parent.artifactId !== artifact.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Parent feedback comment not found" });
        }

        if (parent.parentId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot reply to a feedback reply",
          });
        }
      }

      const comment = await ctx.db.feedbackComment.create({
        data: {
          artifactId: artifact.id,
          frameId: input.frameId,
          sessionId: input.sessionId,
          parentId: input.parentId,
          authorId: ctx.session.user.id,
          body:
            input.body as
              | Prisma.InputJsonValue
              | Prisma.NullableJsonNullValueInput
              | undefined,
          audioUrl: input.audio?.url,
          audioMimeType: input.audio?.mimeType,
          audioDurationSec: input.audio?.durationSec,
          region: input.region as Prisma.InputJsonValue,
          timestampMs: input.timestampMs,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          artifact: {
            select: {
              postId: true,
              post: {
                select: {
                  authorId: true,
                },
              },
            },
          },
        },
      });

      const postAuthorId = comment.artifact.post.authorId;
      if (postAuthorId !== ctx.session.user.id) {
        await ctx.db.notification.create({
          data: {
            type: input.parentId ? "FEEDBACK_REPLY" : "FEEDBACK_COMMENT",
            userId: postAuthorId,
            actorId: ctx.session.user.id,
            postId: comment.artifact.postId,
            feedbackCommentId: comment.id,
            feedbackSessionId: input.sessionId,
          },
        });
      }

      if (input.parentId) {
        const parent = await ctx.db.feedbackComment.findUnique({
          where: { id: input.parentId },
          select: {
            authorId: true,
          },
        });

        if (
          parent &&
          parent.authorId !== ctx.session.user.id &&
          parent.authorId !== postAuthorId
        ) {
          await ctx.db.notification.create({
            data: {
              type: "FEEDBACK_REPLY",
              userId: parent.authorId,
              actorId: ctx.session.user.id,
              postId: comment.artifact.postId,
              feedbackCommentId: comment.id,
              feedbackSessionId: input.sessionId,
            },
          });
        }
      }

      if (!input.parentId) {
        await ctx.db.comment.create({
          data: {
            postId: comment.artifact.postId,
            authorId: ctx.session.user.id,
            attachmentId: frame.attachmentId ?? null,
            content: getDiscussionMirrorContent({
              body: input.body,
              fallbackText: input.audio
                ? "Added visual feedback comment (audio note). Open visual feedback to listen."
                : "Added visual feedback comment.",
            }),
            coordinates: buildVisualFeedbackCoordinates({
              entryType: "COMMENT",
              feedbackSessionId: input.sessionId ?? null,
              feedbackCommentId: comment.id,
              frameId: input.frameId,
              hasAudio: !!input.audio,
            }),
          },
        });
      }

      return comment;
    }),

  setCommentStatus: activeUserProcedure
    .input(setFeedbackCommentStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.feedbackComment.findUnique({
        where: { id: input.commentId },
        select: {
          id: true,
          authorId: true,
          artifactId: true,
          artifact: {
            select: {
              postId: true,
              post: {
                select: {
                  authorId: true,
                },
              },
            },
          },
        },
      });

      if (!comment) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback comment not found" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";
      const isPostAuthor = comment.artifact.post.authorId === ctx.session.user.id;

      if (!isAdmin && !isPostAuthor) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the post author or admins can resolve feedback comments",
        });
      }

      const nextResolvedAt = input.status === "RESOLVED" ? new Date() : null;
      const nextResolvedById = input.status === "RESOLVED" ? ctx.session.user.id : null;

      const updatedComment = await ctx.db.feedbackComment.update({
        where: { id: input.commentId },
        data: {
          status: input.status,
          resolvedAt: nextResolvedAt,
          resolvedById: nextResolvedById,
        },
      });

      if (input.status === "RESOLVED" && comment.authorId !== ctx.session.user.id) {
        await ctx.db.notification.create({
          data: {
            type: "FEEDBACK_RESOLVED",
            userId: comment.authorId,
            actorId: ctx.session.user.id,
            postId: comment.artifact.postId,
            feedbackCommentId: comment.id,
          },
        });
      }

      return updatedComment;
    }),

  deleteComment: activeUserProcedure
    .input(deleteFeedbackCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.feedbackComment.findUnique({
        where: { id: input.commentId },
        select: {
          id: true,
          authorId: true,
          artifact: {
            select: {
              post: {
                select: {
                  authorId: true,
                },
              },
            },
          },
        },
      });

      if (!comment) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback comment not found" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";
      const isPostAuthor = comment.artifact.post.authorId === ctx.session.user.id;
      const isCommentAuthor = comment.authorId === ctx.session.user.id;

      if (!isAdmin && !isPostAuthor && !isCommentAuthor) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.feedbackComment.delete({
        where: { id: input.commentId },
      });

      return { success: true };
    }),

  deleteSession: activeUserProcedure
    .input(deleteFeedbackSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.feedbackSession.findUnique({
        where: { id: input.sessionId },
        select: {
          id: true,
          authorId: true,
          artifact: {
            select: {
              post: {
                select: {
                  authorId: true,
                },
              },
            },
          },
        },
      });

      if (!session) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback session not found" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";
      const isPostAuthor = session.artifact.post.authorId === ctx.session.user.id;
      const isSessionAuthor = session.authorId === ctx.session.user.id;

      if (!isAdmin && !isPostAuthor && !isSessionAuthor) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.feedbackSession.delete({
        where: { id: input.sessionId },
      });

      return { success: true };
    }),

  recordView: protectedProcedure
    .input(feedbackRecordViewSchema)
    .mutation(async ({ ctx, input }) => {
      const artifact = await ctx.db.feedbackArtifact.findUnique({
        where: { postId: input.postId },
        select: { id: true },
      });

      if (!artifact) {
        return { success: false };
      }

      const now = new Date();

      await ctx.db.feedbackArtifact.update({
        where: { id: artifact.id },
        data: {
          viewCount: { increment: 1 },
          lastViewedAt: now,
        },
      });

      if (input.sessionId) {
        await ctx.db.feedbackSession.updateMany({
          where: {
            id: input.sessionId,
            artifactId: artifact.id,
          },
          data: {
            viewCount: { increment: 1 },
            lastViewedAt: now,
          },
        });
      }

      return { success: true };
    }),

  recordWatchTime: protectedProcedure
    .input(feedbackRecordWatchTimeSchema)
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.feedbackSession.findUnique({
        where: { id: input.sessionId },
        select: {
          id: true,
          artifactId: true,
        },
      });

      if (!session) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feedback session not found" });
      }

      const now = new Date();

      await ctx.db.$transaction([
        ctx.db.feedbackSession.update({
          where: { id: session.id },
          data: {
            totalWatchMs: { increment: input.deltaMs },
            lastViewedAt: now,
          },
        }),
        ctx.db.feedbackArtifact.update({
          where: { id: session.artifactId },
          data: {
            totalWatchMs: { increment: input.deltaMs },
            lastViewedAt: now,
          },
        }),
      ]);

      return { success: true };
    }),
});
