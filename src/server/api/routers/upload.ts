import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import { presignedUrlSchema } from "~/lib/validators";
import {
  isStorageConfigured,
  getStorageProvider,
  getBlobPathPrefix,
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
} from "~/lib/storage";

export const uploadRouter = createTRPCRouter({
  storageInfo: protectedProcedure.query(({ ctx }) => {
    return {
      provider: getStorageProvider(),
      configured: isStorageConfigured(),
      blobPathPrefix: getBlobPathPrefix(),
      userId: ctx.session.user.id,
    };
  }),

  getUploadUrl: activeUserProcedure
    .input(presignedUrlSchema)
    .mutation(async ({ ctx, input }) => {
      if (!isStorageConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "File uploads are not configured. Set up either Cloudflare R2 credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME) or Vercel Blob (BLOB_READ_WRITE_TOKEN) in your environment variables.",
        });
      }

      if (getStorageProvider() === "vercel-blob") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Presigned URLs are not used with Vercel Blob storage. Use the /api/upload/blob endpoint instead.",
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
      if (!isStorageConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File storage is not configured. Please set up storage credentials.",
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
