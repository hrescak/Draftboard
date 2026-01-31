import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "~/server/db";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;
      }
      // Refetch user data from database when session update is triggered
      if (trigger === "update" && token.id) {
        const freshUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            displayName: true,
            avatarUrl: true,
            role: true,
          },
        });
        if (freshUser) {
          token.name = freshUser.displayName;
          token.image = freshUser.avatarUrl;
          token.role = freshUser.role;
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

        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
          image: user.avatarUrl,
          role: user.role,
        };
      },
    }),
  ],
});

declare module "next-auth" {
  interface User {
    role: "MEMBER" | "ADMIN" | "OWNER";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      role: "MEMBER" | "ADMIN" | "OWNER";
    };
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    role: "MEMBER" | "ADMIN" | "OWNER";
    name: string;
    image?: string | null;
  }
}
