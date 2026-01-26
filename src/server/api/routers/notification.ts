import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { paginationSchema } from "~/lib/validators";

export const notificationRouter = createTRPCRouter({
  list: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.db.notification.findMany({
        where: { userId: ctx.session.user.id },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          actor: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
          comment: {
            select: {
              id: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (notifications.length > input.limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return { notifications, nextCursor };
    }),

  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.notification.count({
      where: {
        userId: ctx.session.user.id,
        read: false,
      },
    });

    return count;
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.notification.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: { read: true },
      });

      return { success: true };
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.notification.updateMany({
      where: {
        userId: ctx.session.user.id,
        read: false,
      },
      data: { read: true },
    });

    return { success: true };
  }),
});
