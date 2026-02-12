import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import { saveDraftSchema, deleteDraftSchema } from "~/lib/validators";
import { getPresignedDownloadUrl, isR2Configured } from "~/lib/r2";

// Extract R2 key from URL if it's an R2 URL
function extractR2Key(url: string): string | null {
  const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
  if (match) {
    return match[0];
  }
  return null;
}

export const draftRouter = createTRPCRouter({
  // Upsert draft - creates new if no id, updates if id exists
  save: activeUserProcedure
    .input(saveDraftSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        // Update existing draft
        const draft = await ctx.db.draft.update({
          where: {
            id: input.id,
            authorId: ctx.session.user.id, // Ensure user owns the draft
          },
          data: {
            title: input.title,
            content: input.content ?? undefined,
            liveUrl: input.liveUrl,
            hideFromHome: input.hideFromHome,
            visualFeedbackEnabled: input.visualFeedbackEnabled,
            projectIds: input.projectIds,
          },
        });
        return draft;
      } else {
        // Create new draft
        const draft = await ctx.db.draft.create({
          data: {
            title: input.title,
            content: input.content ?? undefined,
            liveUrl: input.liveUrl,
            hideFromHome: input.hideFromHome,
            visualFeedbackEnabled: input.visualFeedbackEnabled,
            projectIds: input.projectIds,
            authorId: ctx.session.user.id,
          },
        });
        return draft;
      }
    }),

  // Get all drafts for the current user
  list: protectedProcedure.query(async ({ ctx }) => {
    const drafts = await ctx.db.draft.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
      },
    });

    // Process drafts to extract preview info
    const results = await Promise.all(
      drafts.map(async (draft) => {
        let preview = "";
        let firstImageUrl: string | null = null;

        // Extract text preview and first image from content
        if (draft.content && typeof draft.content === "object") {
          const content = draft.content as { root?: { children?: unknown[] } };
          if (content.root?.children) {
            const extractInfo = (nodes: unknown[]): void => {
              for (const node of nodes) {
                if (!node || typeof node !== "object") continue;
                const nodeObj = node as Record<string, unknown>;

                // Get first image
                if (!firstImageUrl && nodeObj.type === "attachment") {
                  const attachmentType = nodeObj.attachmentType as string;
                  if (attachmentType === "IMAGE") {
                    firstImageUrl = (nodeObj.thumbnailUrl || nodeObj.url) as string;
                  }
                }

                // Get text preview
                if (preview.length < 100 && nodeObj.type === "text") {
                  preview += (nodeObj.text as string) + " ";
                }

                // Recurse into children
                if (Array.isArray(nodeObj.children)) {
                  extractInfo(nodeObj.children);
                }
              }
            };
            extractInfo(content.root.children);
          }
        }

        // Sign the image URL if R2 is configured
        let signedImageUrl: string | null = null;
        if (firstImageUrl && isR2Configured()) {
          const r2Key = extractR2Key(firstImageUrl);
          if (r2Key) {
            try {
              signedImageUrl = await getPresignedDownloadUrl(r2Key);
            } catch {
              // If signing fails, fall back to null
              signedImageUrl = null;
            }
          }
        }

        return {
          id: draft.id,
          title: draft.title,
          preview: preview.trim().slice(0, 100) || null,
          firstImageUrl: signedImageUrl,
          updatedAt: draft.updatedAt,
        };
      })
    );

    return results;
  }),

  // Get a specific draft by id
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const draft = await ctx.db.draft.findFirst({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
        },
      });

      return draft;
    }),

  // Delete a draft
  delete: activeUserProcedure
    .input(deleteDraftSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.draft.delete({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
        },
      });

      return { success: true };
    }),
});
