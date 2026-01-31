import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { signUpSchema, updateProfileSchema } from "~/lib/validators";

// Extended signup schema that accepts optional invite token
const registerSchema = signUpSchema.extend({
  inviteToken: z.string().optional(),
});

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if this is the first user (no invite needed)
      const userCount = await ctx.db.user.count();
      const isFirstUser = userCount === 0;

      // If not first user, require valid invite token
      if (!isFirstUser) {
        if (!input.inviteToken) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Registration requires an invite link",
          });
        }

        // Validate invite token
        const settings = await ctx.db.siteSettings.findFirst({
          where: { inviteToken: input.inviteToken },
        });

        if (!settings) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Invalid or expired invite link",
          });
        }
      }

      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      const passwordHash = await hash(input.password, 12);

      // First user becomes OWNER, others are MEMBER
      const role = isFirstUser ? "OWNER" : "MEMBER";

      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          passwordHash,
          displayName: input.displayName,
          role,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          role: true,
        },
      });

      return { ...user, isFirstUser };
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return user;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return user;
    }),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
        },
      });

      return user;
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          OR: [
            { displayName: { contains: input.query, mode: "insensitive" } },
            { email: { contains: input.query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
        take: 10,
      });

      return users;
    }),

  // Admin endpoints
  list: adminProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          role: true,
          createdAt: true,
        },
      });

      let nextCursor: string | undefined;
      if (users.length > input.limit) {
        const nextItem = users.pop();
        nextCursor = nextItem?.id;
      }

      return { users, nextCursor };
    }),

  updateRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["MEMBER", "ADMIN"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Can't change owner's role or their own role
      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!targetUser) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (targetUser.role === "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot change owner's role",
        });
      }

      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot change your own role",
        });
      }

      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
        select: {
          id: true,
          role: true,
        },
      });

      return user;
    }),
});
