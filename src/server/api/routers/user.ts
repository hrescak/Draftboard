import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { signUpSchema, updateProfileSchema, resetPasswordSchema } from "~/lib/validators";
import { getAuthMode, isSSO } from "~/lib/auth-provider";

// Token expiration time: 24 hours
const PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 24;

// Extended signup schema that accepts optional invite token
const registerSchema = signUpSchema.extend({
  inviteToken: z.string().optional(),
});

export const userRouter = createTRPCRouter({
  /**
   * Returns the current auth mode so client components can adapt their UI.
   * For example, SSO deployments hide password reset and invite links.
   */
  authMode: publicProcedure.query(() => {
    return { mode: getAuthMode() };
  }),

  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      // Registration is only available for credentials auth
      if (isSSO()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Registration is not available when using SSO authentication",
        });
      }

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
          deactivated: true,
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
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: input.query
          ? {
              deactivated: false,
              OR: [
                { displayName: { contains: input.query, mode: "insensitive" } },
                { email: { contains: input.query, mode: "insensitive" } },
              ],
            }
          : {
              deactivated: false,
            },
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
        orderBy: { displayName: "asc" },
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
          deactivated: true,
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

  setDeactivated: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        deactivated: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Can't deactivate owner or self
      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!targetUser) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (targetUser.role === "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot deactivate the owner account",
        });
      }

      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot deactivate your own account",
        });
      }

      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: { deactivated: input.deactivated },
        select: {
          id: true,
          deactivated: true,
        },
      });

      return user;
    }),

  // Password reset endpoints (credentials auth only)
  generatePasswordResetToken: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (isSSO()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password reset is not available when using SSO authentication",
        });
      }

      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { id: true, displayName: true, email: true },
      });

      if (!targetUser) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Invalidate any existing unused tokens for this user
      await ctx.db.passwordResetToken.updateMany({
        where: {
          userId: input.userId,
          usedAt: null,
        },
        data: {
          usedAt: new Date(), // Mark as used/expired
        },
      });

      // Create new token
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + PASSWORD_RESET_TOKEN_EXPIRY_HOURS);

      const token = await ctx.db.passwordResetToken.create({
        data: {
          userId: input.userId,
          expiresAt,
        },
      });

      return {
        token: token.id,
        expiresAt: token.expiresAt,
        user: targetUser,
      };
    }),

  validatePasswordResetToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      if (isSSO()) {
        return { valid: false, reason: "Password reset is not available with SSO" };
      }

      const resetToken = await ctx.db.passwordResetToken.findUnique({
        where: { id: input.token },
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              email: true,
            },
          },
        },
      });

      if (!resetToken) {
        return { valid: false, reason: "Token not found" };
      }

      if (resetToken.usedAt) {
        return { valid: false, reason: "Token has already been used" };
      }

      if (resetToken.expiresAt < new Date()) {
        return { valid: false, reason: "Token has expired" };
      }

      return {
        valid: true,
        user: resetToken.user,
      };
    }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      if (isSSO()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password reset is not available when using SSO authentication",
        });
      }

      const resetToken = await ctx.db.passwordResetToken.findUnique({
        where: { id: input.token },
        include: { user: true },
      });

      if (!resetToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid reset token",
        });
      }

      if (resetToken.usedAt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This reset link has already been used",
        });
      }

      if (resetToken.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This reset link has expired",
        });
      }

      // Hash new password
      const passwordHash = await hash(input.password, 12);

      // Update user's password and mark token as used
      await ctx.db.$transaction([
        ctx.db.user.update({
          where: { id: resetToken.userId },
          data: { passwordHash },
        }),
        ctx.db.passwordResetToken.update({
          where: { id: input.token },
          data: { usedAt: new Date() },
        }),
      ]);

      return { success: true };
    }),
});
