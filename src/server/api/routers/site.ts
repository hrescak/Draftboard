import { z } from "zod";
import { randomBytes } from "crypto";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

// Generate a secure random token
function generateInviteToken(): string {
  return randomBytes(16).toString("hex");
}

// Helper to get or create site settings
async function getOrCreateSettings(db: typeof import("~/server/db").db) {
  let settings = await db.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!settings) {
    settings = await db.siteSettings.create({
      data: { id: "default" },
    });
  }

  return settings;
}

export const siteRouter = createTRPCRouter({
  // Public: Check if any users exist (for first-run setup)
  hasUsers: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.user.count();
    return count > 0;
  }),

  // Public: Validate an invite token
  validateInvite: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const settings = await ctx.db.siteSettings.findFirst({
        where: { inviteToken: input.token },
      });

      return { valid: !!settings };
    }),

  // Admin: Get site settings including invite token
  getSettings: adminProcedure.query(async ({ ctx }) => {
    const settings = await getOrCreateSettings(ctx.db);
    return settings;
  }),

  // Admin: Regenerate the invite token
  regenerateInvite: adminProcedure.mutation(async ({ ctx }) => {
    const newToken = generateInviteToken();

    const settings = await ctx.db.siteSettings.upsert({
      where: { id: "default" },
      update: { inviteToken: newToken },
      create: { id: "default", inviteToken: newToken },
    });

    return settings;
  }),

  // Admin: Update site settings
  updateSettings: adminProcedure
    .input(
      z.object({
        siteName: z.string().min(1).max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.siteSettings.upsert({
        where: { id: "default" },
        update: input,
        create: { id: "default", ...input },
      });

      return settings;
    }),

  // Admin: Update webhook URLs
  updateWebhooks: adminProcedure
    .input(
      z.object({
        discordWebhookUrl: z.string().url().nullable().or(z.literal("")),
        slackWebhookUrl: z.string().url().nullable().or(z.literal("")),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Normalize empty strings to null
      const discordWebhookUrl = input.discordWebhookUrl || null;
      const slackWebhookUrl = input.slackWebhookUrl || null;

      const settings = await ctx.db.siteSettings.upsert({
        where: { id: "default" },
        update: {
          discordWebhookUrl,
          slackWebhookUrl,
        },
        create: {
          id: "default",
          discordWebhookUrl,
          slackWebhookUrl,
        },
      });

      return settings;
    }),

  // Admin: Test webhook - sends a test message
  testWebhook: adminProcedure
    .input(
      z.object({
        type: z.enum(["discord", "slack"]),
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const { type, url } = input;

      try {
        if (type === "discord") {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              embeds: [
                {
                  title: "Test Notification",
                  description: "This is a test message from Draftboard. Your Discord webhook is configured correctly!",
                  color: 0x7c3aed,
                  footer: { text: "Draftboard" },
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error(`Discord returned ${response.status}`);
          }
        } else {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Test Notification*",
                  },
                },
                {
                  type: "section",
                  text: {
                    type: "plain_text",
                    text: "This is a test message from Draftboard. Your Slack webhook is configured correctly!",
                  },
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error(`Slack returned ${response.status}`);
          }
        }

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
