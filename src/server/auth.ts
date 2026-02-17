import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "~/server/db";
import { authConfig } from "./auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;
      }
      // Check deactivation status and refresh user data on every request
      if (token.id) {
        const freshUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            displayName: true,
            avatarUrl: true,
            role: true,
            deactivated: true,
            profileSlug: true,
          },
        });
        if (freshUser) {
          token.deactivated = freshUser.deactivated;
          // Always keep avatar in sync — the DB query already happens
          // on every request, so this has no extra cost
          token.image = freshUser.avatarUrl;
          token.profileSlug = freshUser.profileSlug;
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
        session.user.profileSlug = token.profileSlug as string;
      }
      return session;
    },
  },
  providers: [
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
          profileSlug: user.profileSlug,
        };
      },
    }),
  ],
});

declare module "next-auth" {
  interface User {
    role: "MEMBER" | "ADMIN" | "OWNER";
    deactivated?: boolean;
    profileSlug: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      role: "MEMBER" | "ADMIN" | "OWNER";
      deactivated: boolean;
      profileSlug: string;
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
    profileSlug?: string;
  }
}
