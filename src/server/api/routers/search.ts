import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  global: protectedProcedure
    .input(z.object({ query: z.string().min(1).max(100) }))
    .query(async ({ ctx, input }) => {
      const query = input.query.trim();
      
      // Search users by display name or email
      const usersPromise = ctx.db.user.findMany({
        where: {
          OR: [
            { displayName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
          email: true,
        },
        take: 5,
      });

      // Search posts by title or content (text extraction from JSON)
      const postsPromise = ctx.db.post.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            where: { type: "IMAGE" },
            take: 1,
            orderBy: { order: "asc" },
            select: {
              thumbnailUrl: true,
              url: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      // Search projects by name
      const projectsPromise = ctx.db.project.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          coverUrl: true,
          _count: {
            select: {
              posts: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      const [users, posts, projects] = await Promise.all([
        usersPromise,
        postsPromise,
        projectsPromise,
      ]);

      return {
        users,
        posts,
        projects,
      };
    }),
});
