import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "~/server/db";
import { authConfig } from "./auth.config";
import { getAuthMode } from "~/lib/auth-provider";

const authMode = getAuthMode();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * Build the full provider list with actual authorization logic.
 *
 * OAuth providers (Okta, Google) are edge-compatible and fully configured
 * in auth.config.ts — we reuse them directly to avoid duplication.
 * Only the credentials provider needs overriding here because its
 * authorize() function requires Node.js-only dependencies (bcryptjs, Prisma).
 */
function getProviders() {
  if (authMode !== "credentials") {
    return authConfig.providers;
  }

  return [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        // Block sign-in for deactivated users
        if (user.deactivated) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
          image: user.avatarUrl,
          role: user.role,
        };
      },
    }),
  ];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,

    /**
     * signIn callback — handles SSO user provisioning.
     * For OAuth providers, this:
     * 1. Enforces Google Workspace domain restriction (server-side)
     * 2. Auto-provisions new users (first user becomes OWNER)
     * 3. Blocks deactivated users
     */
    async signIn({ user, account }) {
      if (account?.provider === "okta" || account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        // Server-side domain restriction for Google Workspace
        if (
          account.provider === "google" &&
          process.env.AUTH_GOOGLE_ALLOWED_DOMAIN
        ) {
          const domain = email.split("@")[1]?.toLowerCase();
          if (domain !== process.env.AUTH_GOOGLE_ALLOWED_DOMAIN.toLowerCase()) {
            return "/sign-in?error=domain_not_allowed";
          }
        }

        // Find or create the user in our database
        let dbUser = await db.user.findUnique({ where: { email } });

        if (!dbUser) {
          // Auto-provision: first user becomes OWNER, others become MEMBER
          const userCount = await db.user.count();
          const isFirstUser = userCount === 0;

          dbUser = await db.user.create({
            data: {
              email,
              displayName: user.name || email.split("@")[0],
              avatarUrl: user.image || null,
              role: isFirstUser ? "OWNER" : "MEMBER",
            },
          });
        }

        // Block deactivated users
        if (dbUser.deactivated) {
          return "/sign-in?error=deactivated";
        }

        return true;
      }

      // Credentials provider handles its own checks in authorize()
      return true;
    },

    async jwt({ token, user, account, trigger }) {
      if (user) {
        if (account?.provider === "okta" || account?.provider === "google") {
          // OAuth sign-in: look up our DB user by email to get the internal ID
          const dbUser = await db.user.findUnique({
            where: { email: user.email! },
            select: {
              id: true,
              role: true,
              displayName: true,
              avatarUrl: true,
              deactivated: true,
            },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.name = dbUser.displayName;
            token.image = dbUser.avatarUrl;
            token.deactivated = dbUser.deactivated;
          }
        } else {
          // Credentials sign-in: user object already has our DB data
          token.id = user.id;
          token.role = user.role;
          token.name = user.name;
          token.image = user.image;
        }
      }

      // Refresh user data from DB on every request (deactivation, avatar, role)
      if (token.id) {
        const freshUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            displayName: true,
            avatarUrl: true,
            role: true,
            deactivated: true,
          },
        });
        if (freshUser) {
          token.deactivated = freshUser.deactivated;
          token.image = freshUser.avatarUrl;
          if (trigger === "update") {
            token.name = freshUser.displayName;
            token.role = freshUser.role;
          }
        }
      }
      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "MEMBER" | "ADMIN" | "OWNER";
        session.user.name = token.name as string;
        session.user.image = token.image as string | null | undefined;
        session.user.deactivated = (token.deactivated as boolean) ?? false;
      }
      return session;
    },
  },
  providers: getProviders(),
});

declare module "next-auth" {
  interface User {
    role: "MEMBER" | "ADMIN" | "OWNER";
    deactivated?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      role: "MEMBER" | "ADMIN" | "OWNER";
      deactivated: boolean;
    };
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    role: "MEMBER" | "ADMIN" | "OWNER";
    name: string;
    image?: string | null;
    deactivated?: boolean;
  }
}
