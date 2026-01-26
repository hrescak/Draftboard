import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { presignedUrlSchema } from "~/lib/validators";
import { getPresignedUploadUrl, getPresignedDownloadUrl, isR2Configured } from "~/lib/r2";

export const uploadRouter = createTRPCRouter({
  getUploadUrl: protectedProcedure
    .input(presignedUrlSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if R2 is configured
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File uploads are not configured. Please set up R2 storage credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME) in your environment variables.",
        });
      }

      try {
        const result = await getPresignedUploadUrl({
          filename: input.filename,
          contentType: input.contentType,
          userId: ctx.session.user.id,
        });

        return result;
      } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to generate upload URL",
        });
      }
    }),

  getDownloadUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File downloads are not configured. Please set up R2 storage credentials.",
        });
      }

      try {
        const url = await getPresignedDownloadUrl(input.key);
        return { url };
      } catch (error) {
        console.error("Error generating download URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to generate download URL",
        });
      }
    }),
});
