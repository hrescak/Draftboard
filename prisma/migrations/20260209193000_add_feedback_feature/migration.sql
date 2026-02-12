-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE IF NOT EXISTS 'FEEDBACK_SESSION';
ALTER TYPE "NotificationType" ADD VALUE IF NOT EXISTS 'FEEDBACK_COMMENT';
ALTER TYPE "NotificationType" ADD VALUE IF NOT EXISTS 'FEEDBACK_REPLY';
ALTER TYPE "NotificationType" ADD VALUE IF NOT EXISTS 'FEEDBACK_RESOLVED';

-- CreateEnum
CREATE TYPE "FeedbackSessionType" AS ENUM ('VIDEO', 'TEXT_ONLY');

-- CreateEnum
CREATE TYPE "FeedbackAnnotationTool" AS ENUM ('PEN', 'ARROW', 'HIGHLIGHT', 'FRAME_CHANGE');

-- CreateEnum
CREATE TYPE "FeedbackCommentStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN "visualFeedbackEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Draft" ADD COLUMN "hideFromHome" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "visualFeedbackEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SiteSettings"
ADD COLUMN "visualFeedbackEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "feedbackMaxVideoDurationSec" INTEGER NOT NULL DEFAULT 300,
ADD COLUMN "feedbackMaxAudioDurationSec" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN "feedbackMaxVideoSizeBytes" INTEGER NOT NULL DEFAULT 1073741824;

-- AlterTable
ALTER TABLE "Notification"
ADD COLUMN "feedbackSessionId" TEXT,
ADD COLUMN "feedbackCommentId" TEXT;

-- CreateTable
CREATE TABLE "FeedbackArtifact" (
  "id" TEXT NOT NULL,
  "postId" TEXT NOT NULL,
  "createdById" TEXT NOT NULL,
  "frameSignature" TEXT NOT NULL,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "lastViewedAt" TIMESTAMP(3),
  "totalWatchMs" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FeedbackArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackFrame" (
  "id" TEXT NOT NULL,
  "artifactId" TEXT NOT NULL,
  "attachmentId" TEXT,
  "url" TEXT NOT NULL,
  "thumbnailUrl" TEXT,
  "width" INTEGER,
  "height" INTEGER,
  "order" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "FeedbackFrame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackSession" (
  "id" TEXT NOT NULL,
  "artifactId" TEXT NOT NULL,
  "authorId" TEXT NOT NULL,
  "type" "FeedbackSessionType" NOT NULL,
  "videoUrl" TEXT,
  "videoMimeType" TEXT,
  "videoSize" INTEGER,
  "durationMs" INTEGER,
  "hasCamera" BOOLEAN NOT NULL DEFAULT false,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "lastViewedAt" TIMESTAMP(3),
  "totalWatchMs" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FeedbackSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackAnnotation" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "frameId" TEXT,
  "tool" "FeedbackAnnotationTool" NOT NULL,
  "tStartMs" INTEGER NOT NULL,
  "tEndMs" INTEGER,
  "order" INTEGER NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "FeedbackAnnotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackComment" (
  "id" TEXT NOT NULL,
  "artifactId" TEXT NOT NULL,
  "frameId" TEXT NOT NULL,
  "sessionId" TEXT,
  "parentId" TEXT,
  "authorId" TEXT NOT NULL,
  "body" JSONB,
  "audioUrl" TEXT,
  "audioMimeType" TEXT,
  "audioDurationSec" INTEGER,
  "region" JSONB NOT NULL,
  "timestampMs" INTEGER,
  "status" "FeedbackCommentStatus" NOT NULL DEFAULT 'OPEN',
  "resolvedById" TEXT,
  "resolvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FeedbackComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackArtifact_postId_key" ON "FeedbackArtifact"("postId");

-- CreateIndex
CREATE INDEX "FeedbackArtifact_createdById_idx" ON "FeedbackArtifact"("createdById");

-- CreateIndex
CREATE INDEX "FeedbackArtifact_createdAt_idx" ON "FeedbackArtifact"("createdAt");

-- CreateIndex
CREATE INDEX "FeedbackFrame_artifactId_order_idx" ON "FeedbackFrame"("artifactId", "order");

-- CreateIndex
CREATE INDEX "FeedbackFrame_attachmentId_idx" ON "FeedbackFrame"("attachmentId");

-- CreateIndex
CREATE INDEX "FeedbackSession_artifactId_createdAt_idx" ON "FeedbackSession"("artifactId", "createdAt");

-- CreateIndex
CREATE INDEX "FeedbackSession_authorId_createdAt_idx" ON "FeedbackSession"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "FeedbackAnnotation_sessionId_order_idx" ON "FeedbackAnnotation"("sessionId", "order");

-- CreateIndex
CREATE INDEX "FeedbackAnnotation_sessionId_tStartMs_idx" ON "FeedbackAnnotation"("sessionId", "tStartMs");

-- CreateIndex
CREATE INDEX "FeedbackAnnotation_frameId_idx" ON "FeedbackAnnotation"("frameId");

-- CreateIndex
CREATE INDEX "FeedbackComment_artifactId_createdAt_idx" ON "FeedbackComment"("artifactId", "createdAt");

-- CreateIndex
CREATE INDEX "FeedbackComment_frameId_idx" ON "FeedbackComment"("frameId");

-- CreateIndex
CREATE INDEX "FeedbackComment_sessionId_idx" ON "FeedbackComment"("sessionId");

-- CreateIndex
CREATE INDEX "FeedbackComment_authorId_idx" ON "FeedbackComment"("authorId");

-- CreateIndex
CREATE INDEX "FeedbackComment_parentId_idx" ON "FeedbackComment"("parentId");

-- CreateIndex
CREATE INDEX "FeedbackComment_resolvedById_idx" ON "FeedbackComment"("resolvedById");

-- CreateIndex
CREATE INDEX "Notification_feedbackSessionId_idx" ON "Notification"("feedbackSessionId");

-- CreateIndex
CREATE INDEX "Notification_feedbackCommentId_idx" ON "Notification"("feedbackCommentId");

-- AddForeignKey
ALTER TABLE "FeedbackArtifact" ADD CONSTRAINT "FeedbackArtifact_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackArtifact" ADD CONSTRAINT "FeedbackArtifact_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackFrame" ADD CONSTRAINT "FeedbackFrame_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "FeedbackArtifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackFrame" ADD CONSTRAINT "FeedbackFrame_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackSession" ADD CONSTRAINT "FeedbackSession_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "FeedbackArtifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackSession" ADD CONSTRAINT "FeedbackSession_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackAnnotation" ADD CONSTRAINT "FeedbackAnnotation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "FeedbackSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackAnnotation" ADD CONSTRAINT "FeedbackAnnotation_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "FeedbackFrame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "FeedbackArtifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "FeedbackFrame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "FeedbackSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FeedbackComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_feedbackSessionId_fkey" FOREIGN KEY ("feedbackSessionId") REFERENCES "FeedbackSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_feedbackCommentId_fkey" FOREIGN KEY ("feedbackCommentId") REFERENCES "FeedbackComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
