import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createProjectSchema, updateProjectSchema, paginationSchema } from "~/lib/validators";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
          coverUrl: input.coverUrl,
          createdById: ctx.session.user.id,
          urls: {
            create: input.urls.map((url) => ({
              title: url.title,
              url: url.url,
            })),
          },
          members: {
            create: {
              userId: ctx.session.user.id,
              role: "OWNER",
            },
          },
        },
        include: {
          urls: true,
          _count: {
            select: {
              posts: true,
              members: true,
            },
          },
        },
      });

      return project;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id },
        include: {
          urls: true,
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  displayName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Include createdById for authorization checks
      return {
        ...project,
        createdById: project.createdById,
      };
    }),

  list: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const projects = await ctx.db.project.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          urls: {
            take: 3,
          },
          _count: {
            select: {
              posts: true,
              members: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (projects.length > input.limit) {
        const nextItem = projects.pop();
        nextCursor = nextItem?.id;
      }

      return { projects, nextCursor };
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const projects = await ctx.db.project.findMany({
        where: {
          name: { contains: input.query, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          coverUrl: true,
        },
        take: 10,
      });

      return projects;
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const existingProject = await ctx.db.project.findUnique({
        where: { id: input.id },
        select: { createdById: true },
      });

      if (!existingProject) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";

      if (existingProject.createdById !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      // Delete existing URLs if updating
      if (input.urls) {
        await ctx.db.projectUrl.deleteMany({
          where: { projectId: input.id },
        });
      }

      const project = await ctx.db.project.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          coverUrl: input.coverUrl,
          urls: input.urls
            ? {
                create: input.urls.map((url) => ({
                  title: url.title,
                  url: url.url,
                })),
              }
            : undefined,
        },
        include: {
          urls: true,
          _count: {
            select: {
              posts: true,
              members: true,
            },
          },
        },
      });

      return project;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingProject = await ctx.db.project.findUnique({
        where: { id: input.id },
        select: { createdById: true },
      });

      if (!existingProject) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";

      if (existingProject.createdById !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.project.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  addMember: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { createdById: true },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const member = await ctx.db.projectMember.create({
        data: {
          projectId: input.projectId,
          userId: input.userId,
          role: "MEMBER",
        },
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

      return member;
    }),

  removeMember: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.projectMember.deleteMany({
        where: {
          projectId: input.projectId,
          userId: input.userId,
        },
      });

      return { success: true };
    }),
});
