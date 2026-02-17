-- CreateEnum
CREATE TYPE "StaticDeploymentStatus" AS ENUM ('UPLOADING', 'ACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "StaticSite" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdById" TEXT,
  "activeDeploymentId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "StaticSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticDeployment" (
  "id" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "deploymentKey" TEXT NOT NULL,
  "prefix" TEXT NOT NULL,
  "status" "StaticDeploymentStatus" NOT NULL DEFAULT 'UPLOADING',
  "fileCount" INTEGER NOT NULL DEFAULT 0,
  "totalBytes" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "activatedAt" TIMESTAMP(3),

  CONSTRAINT "StaticDeployment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaticSite_slug_key" ON "StaticSite"("slug");

-- CreateIndex
CREATE INDEX "StaticSite_createdAt_idx" ON "StaticSite"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "StaticDeployment_siteId_deploymentKey_key" ON "StaticDeployment"("siteId", "deploymentKey");

-- CreateIndex
CREATE INDEX "StaticDeployment_siteId_createdAt_idx" ON "StaticDeployment"("siteId", "createdAt");

-- CreateIndex
CREATE INDEX "StaticDeployment_status_idx" ON "StaticDeployment"("status");

-- AddForeignKey
ALTER TABLE "StaticDeployment" ADD CONSTRAINT "StaticDeployment_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "StaticSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaticSite" ADD CONSTRAINT "StaticSite_activeDeploymentId_fkey" FOREIGN KEY ("activeDeploymentId") REFERENCES "StaticDeployment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
