import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createCommentSchema, updateCommentSchema } from "~/lib/validators";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
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
          content: input.content,
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

      return comments;
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

  update: protectedProcedure
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
        data: { content: input.content },
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

  delete: protectedProcedure
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
