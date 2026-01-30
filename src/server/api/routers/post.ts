import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createPostSchema, updatePostSchema, paginationSchema } from "~/lib/validators";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          liveUrl: input.liveUrl,
          authorId: ctx.session.user.id,
          attachments: {
            create: input.attachments.map((att) => ({
              type: att.type,
              url: att.url,
              filename: att.filename,
              mimeType: att.mimeType,
              size: att.size,
              width: att.width,
              height: att.height,
              thumbnailUrl: att.thumbnailUrl,
              metadata: att.metadata,
              order: att.order,
            })),
          },
          projects: {
            create: input.projectIds.map((projectId) => ({
              projectId,
            })),
          },
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
            },
          },
        },
      });

      return post;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          reactions: {
            include: {
              user: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return post;
    }),

  feed: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
            take: 3, // For preview
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
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
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  byUser: protectedProcedure
    .input(
      paginationSchema.extend({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          authorId: input.userId,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
            take: 3,
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
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
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  byProject: protectedProcedure
    .input(
      paginationSchema.extend({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          projects: {
            some: {
              projectId: input.projectId,
            },
          },
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
            take: 3,
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
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
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingPost.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      // Delete existing attachments and project links if updating
      if (input.attachments) {
        await ctx.db.attachment.deleteMany({
          where: { postId: input.id },
        });
      }

      if (input.projectIds) {
        await ctx.db.postProject.deleteMany({
          where: { postId: input.id },
        });
      }

      const post = await ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          liveUrl: input.liveUrl,
          attachments: input.attachments
            ? {
                create: input.attachments.map((att) => ({
                  type: att.type,
                  url: att.url,
                  filename: att.filename,
                  mimeType: att.mimeType,
                  size: att.size,
                  width: att.width,
                  height: att.height,
                  thumbnailUrl: att.thumbnailUrl,
                  metadata: att.metadata,
                  order: att.order,
                })),
              }
            : undefined,
          projects: input.projectIds
            ? {
                create: input.projectIds.map((projectId) => ({
                  projectId,
                })),
              }
            : undefined,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return post;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";

      if (existingPost.authorId !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.post.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
