import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import {
  presignedUrlSchema,
  startMultipartUploadSchema,
  multipartPartUrlSchema,
  multipartCompleteSchema,
  multipartAbortSchema,
  DEFAULT_FEEDBACK_MAX_VIDEO_SIZE,
} from "~/lib/validators";
import {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  isR2Configured,
  startMultipartUpload,
  getMultipartPartUploadUrl,
  completeMultipartUpload,
  abortMultipartUpload,
} from "~/lib/r2";

export const uploadRouter = createTRPCRouter({
  getUploadUrl: activeUserProcedure
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

  startMultipartUpload: activeUserProcedure
    .input(startMultipartUploadSchema)
    .mutation(async ({ ctx, input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File uploads are not configured. Please set up R2 storage credentials.",
        });
      }

      const settings = await ctx.db.siteSettings.findUnique({
        where: { id: "default" },
        select: { feedbackMaxVideoSizeBytes: true },
      });
      const maxAllowedSize = settings?.feedbackMaxVideoSizeBytes ?? DEFAULT_FEEDBACK_MAX_VIDEO_SIZE;

      if (input.size > maxAllowedSize) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Video exceeds max upload size (${maxAllowedSize} bytes).`,
        });
      }

      try {
        return await startMultipartUpload({
          filename: input.filename,
          contentType: input.contentType,
          userId: ctx.session.user.id,
        });
      } catch (error) {
        console.error("Error starting multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to start multipart upload",
        });
      }
    }),

  getMultipartPartUrl: activeUserProcedure
    .input(multipartPartUrlSchema)
    .mutation(async ({ input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File uploads are not configured. Please set up R2 storage credentials.",
        });
      }

      try {
        return await getMultipartPartUploadUrl({
          key: input.key,
          uploadId: input.uploadId,
          partNumber: input.partNumber,
        });
      } catch (error) {
        console.error("Error generating multipart part URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to generate multipart part URL",
        });
      }
    }),

  completeMultipartUpload: activeUserProcedure
    .input(multipartCompleteSchema)
    .mutation(async ({ input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File uploads are not configured. Please set up R2 storage credentials.",
        });
      }

      try {
        return await completeMultipartUpload({
          key: input.key,
          uploadId: input.uploadId,
          parts: input.parts ?? undefined,
        });
      } catch (error) {
        console.error("Error completing multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to complete multipart upload",
        });
      }
    }),

  abortMultipartUpload: activeUserProcedure
    .input(multipartAbortSchema)
    .mutation(async ({ input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "File uploads are not configured. Please set up R2 storage credentials.",
        });
      }

      try {
        await abortMultipartUpload({
          key: input.key,
          uploadId: input.uploadId,
        });
        return { success: true };
      } catch (error) {
        console.error("Error aborting multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to abort multipart upload",
        });
      }
    }),
});
