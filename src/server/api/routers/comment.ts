import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import { createCommentSchema, updateCommentSchema } from "~/lib/validators";
import { extractUserMentions } from "~/lib/utils";

function extractFeedbackCommentIdFromCoordinates(coordinates: unknown): string | null {
  if (!coordinates || typeof coordinates !== "object") {
    return null;
  }

  const value = coordinates as Record<string, unknown>;
  if (value.source !== "VISUAL_FEEDBACK") {
    return null;
  }

  return typeof value.feedbackCommentId === "string"
    ? value.feedbackCommentId
    : null;
}

export const commentRouter = createTRPCRouter({
  create: activeUserProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify post exists
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true, authorId: true },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      // If replying, verify parent exists and is not already a reply
      if (input.parentId) {
        const parent = await ctx.db.comment.findUnique({
          where: { id: input.parentId },
          select: { parentId: true, authorId: true },
        });

        if (!parent) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Parent comment not found" });
        }

        // Enforce max 2 levels of nesting
        if (parent.parentId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot reply to a reply",
          });
        }
      }

      const comment = await ctx.db.comment.create({
        data: {
          content: input.content as Prisma.InputJsonValue,
          postId: input.postId,
          authorId: ctx.session.user.id,
          parentId: input.parentId,
          attachmentId: input.attachmentId,
          coordinates: input.coordinates,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          replies: {
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
      });

      // Create notification for post author (if not self)
      if (post.authorId !== ctx.session.user.id) {
        await ctx.db.notification.create({
          data: {
            type: input.parentId ? "COMMENT_REPLY" : "COMMENT",
            userId: post.authorId,
            actorId: ctx.session.user.id,
            postId: input.postId,
            commentId: comment.id,
          },
        });
      }

      // If replying, also notify the parent comment author
      if (input.parentId) {
        const parent = await ctx.db.comment.findUnique({
          where: { id: input.parentId },
          select: { authorId: true },
        });

        if (parent && parent.authorId !== ctx.session.user.id && parent.authorId !== post.authorId) {
          await ctx.db.notification.create({
            data: {
              type: "COMMENT_REPLY",
              userId: parent.authorId,
              actorId: ctx.session.user.id,
              postId: input.postId,
              commentId: comment.id,
            },
          });
        }
      }

      // Create mention notifications
      const mentions = extractUserMentions(input.content);
      if (mentions.length > 0) {
        // Collect user IDs that should NOT receive mention notifications
        // (already notified via COMMENT or COMMENT_REPLY)
        const excludedUserIds = new Set<string>([ctx.session.user.id]);
        
        // Don't send mention notification if they're already getting a comment notification
        if (post.authorId !== ctx.session.user.id) {
          excludedUserIds.add(post.authorId);
        }

        // Don't send mention notification to parent comment author (already notified)
        if (input.parentId) {
          const parent = await ctx.db.comment.findUnique({
            where: { id: input.parentId },
            select: { authorId: true },
          });
          if (parent && parent.authorId !== ctx.session.user.id) {
            excludedUserIds.add(parent.authorId);
          }
        }

        const mentionNotifications = mentions
          .filter((mention) => !excludedUserIds.has(mention.userId))
          .map((mention) => ({
            type: "MENTION" as const,
            userId: mention.userId,
            actorId: ctx.session.user.id,
            postId: input.postId,
            commentId: comment.id,
          }));

        if (mentionNotifications.length > 0) {
          await ctx.db.notification.createMany({
            data: mentionNotifications,
          });
        }
      }

      return comment;
    }),

  byPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: {
          postId: input.postId,
          parentId: null, // Only top-level comments
        },
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
              reactions: {
                select: {
                  type: true,
                  userId: true,
                },
              },
            },
          },
          reactions: {
            select: {
              type: true,
              userId: true,
            },
          },
        },
      });

      const feedbackCommentIds = new Set<string>();
      for (const comment of comments) {
        const topLevelFeedbackCommentId = extractFeedbackCommentIdFromCoordinates(
          comment.coordinates
        );
        if (topLevelFeedbackCommentId) {
          feedbackCommentIds.add(topLevelFeedbackCommentId);
        }

        for (const reply of comment.replies) {
          const replyFeedbackCommentId = extractFeedbackCommentIdFromCoordinates(
            reply.coordinates
          );
          if (replyFeedbackCommentId) {
            feedbackCommentIds.add(replyFeedbackCommentId);
          }
        }
      }

      const feedbackAudioByCommentId = new Map<
        string,
        {
          url: string;
          mimeType: string | null;
          durationSec: number | null;
        }
      >();

      if (feedbackCommentIds.size > 0) {
        const feedbackComments = await ctx.db.feedbackComment.findMany({
          where: {
            id: {
              in: Array.from(feedbackCommentIds),
            },
          },
          select: {
            id: true,
            audioUrl: true,
            audioMimeType: true,
            audioDurationSec: true,
          },
        });

        for (const feedbackComment of feedbackComments) {
          if (!feedbackComment.audioUrl) {
            continue;
          }

          feedbackAudioByCommentId.set(feedbackComment.id, {
            url: feedbackComment.audioUrl,
            mimeType: feedbackComment.audioMimeType,
            durationSec: feedbackComment.audioDurationSec,
          });
        }
      }

      return comments.map((comment) => {
        const topLevelFeedbackCommentId = extractFeedbackCommentIdFromCoordinates(
          comment.coordinates
        );

        return {
          ...comment,
          feedbackAudio: topLevelFeedbackCommentId
            ? feedbackAudioByCommentId.get(topLevelFeedbackCommentId) ?? null
            : null,
          replies: comment.replies.map((reply) => {
            const replyFeedbackCommentId = extractFeedbackCommentIdFromCoordinates(
              reply.coordinates
            );

            return {
              ...reply,
              feedbackAudio: replyFeedbackCommentId
                ? feedbackAudioByCommentId.get(replyFeedbackCommentId) ?? null
                : null,
            };
          }),
        };
      });
    }),

  byAttachment: protectedProcedure
    .input(z.object({ attachmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: {
          attachmentId: input.attachmentId,
        },
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          reactions: {
            select: {
              type: true,
              userId: true,
            },
          },
        },
      });

      return comments;
    }),

  update: activeUserProcedure
    .input(updateCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const existingComment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingComment) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingComment.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const comment = await ctx.db.comment.update({
        where: { id: input.id },
        data: { content: input.content as Prisma.InputJsonValue },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      });

      return comment;
    }),

  delete: activeUserProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingComment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingComment) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";

      if (existingComment.authorId !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.comment.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
