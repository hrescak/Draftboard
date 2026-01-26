import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { toggleReactionSchema } from "~/lib/validators";

export const reactionRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(toggleReactionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Check if reaction already exists
      const existingReaction = await ctx.db.reaction.findFirst({
        where: {
          userId,
          type: input.type,
          postId: input.postId ?? undefined,
          commentId: input.commentId ?? undefined,
        },
      });

      if (existingReaction) {
        // Remove the reaction
        await ctx.db.reaction.delete({
          where: { id: existingReaction.id },
        });
        return { added: false, type: input.type };
      }

      // Add the reaction
      const reaction = await ctx.db.reaction.create({
        data: {
          type: input.type,
          userId,
          postId: input.postId,
          commentId: input.commentId,
        },
      });

      // Create notification
      if (input.postId) {
        const post = await ctx.db.post.findUnique({
          where: { id: input.postId },
          select: { authorId: true },
        });

        if (post && post.authorId !== userId) {
          await ctx.db.notification.create({
            data: {
              type: "REACTION_POST",
              userId: post.authorId,
              actorId: userId,
              postId: input.postId,
            },
          });
        }
      }

      if (input.commentId) {
        const comment = await ctx.db.comment.findUnique({
          where: { id: input.commentId },
          select: { authorId: true, postId: true },
        });

        if (comment && comment.authorId !== userId) {
          await ctx.db.notification.create({
            data: {
              type: "REACTION_COMMENT",
              userId: comment.authorId,
              actorId: userId,
              postId: comment.postId,
              commentId: input.commentId,
            },
          });
        }
      }

      return { added: true, type: input.type, id: reaction.id };
    }),

  byPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reactions = await ctx.db.reaction.findMany({
        where: { postId: input.postId },
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
      });

      // Group reactions by type
      const grouped = reactions.reduce(
        (acc, reaction) => {
          if (!acc[reaction.type]) {
            acc[reaction.type] = [];
          }
          acc[reaction.type].push({
            userId: reaction.userId,
            userName: reaction.user.displayName,
          });
          return acc;
        },
        {} as Record<string, { userId: string; userName: string }[]>
      );

      return grouped;
    }),

  // Custom emoji management
  listEmoji: protectedProcedure.query(async ({ ctx }) => {
    const emoji = await ctx.db.customEmoji.findMany({
      orderBy: { name: "asc" },
    });
    return emoji;
  }),

  createEmoji: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(32).regex(/^[a-z0-9_]+$/),
        imageUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const emoji = await ctx.db.customEmoji.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          createdBy: ctx.session.user.id,
        },
      });
      return emoji;
    }),

  deleteEmoji: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.customEmoji.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
