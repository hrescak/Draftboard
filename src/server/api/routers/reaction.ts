import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import { toggleReactionSchema } from "~/lib/validators";
import { getPresignedDownloadUrl, isStorageConfigured, extractStorageKey } from "~/lib/storage";

export const reactionRouter = createTRPCRouter({
  toggle: activeUserProcedure
    .input(toggleReactionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Check if user has any reaction on this post/comment
      const existingReaction = await ctx.db.reaction.findFirst({
        where: {
          userId,
          postId: input.postId ?? undefined,
          commentId: input.commentId ?? undefined,
        },
      });

      if (existingReaction) {
        if (existingReaction.type === input.type) {
          // Same type - remove the reaction (toggle off)
          await ctx.db.reaction.delete({
            where: { id: existingReaction.id },
          });
          return { added: false, type: input.type };
        } else {
          // Different type - update to new reaction type
          const reaction = await ctx.db.reaction.update({
            where: { id: existingReaction.id },
            data: { type: input.type },
          });
          return { added: true, changed: true, type: input.type, id: reaction.id };
        }
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
              avatarUrl: true,
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
            avatarUrl: reaction.user.avatarUrl,
          });
          return acc;
        },
        {} as Record<string, { userId: string; userName: string; avatarUrl: string | null }[]>
      );

      return grouped;
    }),

  byComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reactions = await ctx.db.reaction.findMany({
        where: { commentId: input.commentId },
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
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
            avatarUrl: reaction.user.avatarUrl,
          });
          return acc;
        },
        {} as Record<string, { userId: string; userName: string; avatarUrl: string | null }[]>
      );

      return grouped;
    }),

  // Custom emoji management
  listEmoji: protectedProcedure.query(async ({ ctx }) => {
    const emojis = await ctx.db.customEmoji.findMany({
      orderBy: { name: "asc" },
    });

    // Sign the image URLs if R2 is configured
    if (isStorageConfigured()) {
      const signedEmojis = await Promise.all(
        emojis.map(async (emoji) => {
          const key = extractStorageKey(emoji.imageUrl);
          if (key) {
            try {
              const signedUrl = await getPresignedDownloadUrl(key);
              return { ...emoji, imageUrl: signedUrl };
            } catch {
              // Fall back to original URL if signing fails
              return emoji;
            }
          }
          return emoji;
        })
      );
      return signedEmojis;
    }

    return emojis;
  }),

  createEmoji: activeUserProcedure
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

  deleteEmoji: activeUserProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.customEmoji.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
