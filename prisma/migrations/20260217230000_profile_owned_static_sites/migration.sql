-- Add profile slug to users
ALTER TABLE "User" ADD COLUMN "profileSlug" TEXT;

-- Derive profile slugs from display name
UPDATE "User"
SET "profileSlug" = lower(
  regexp_replace(
    regexp_replace("displayName", '[^a-zA-Z0-9]+', '-', 'g'),
    '(^-+|-+$)',
    '',
    'g'
  )
);

-- Fallback for empty slugs
UPDATE "User"
SET "profileSlug" = 'user-' || substring("id", 1, 6)
WHERE "profileSlug" IS NULL OR "profileSlug" = '';

-- Ensure uniqueness by suffixing duplicates with user id prefix
WITH ranked AS (
  SELECT
    "id",
    "profileSlug",
    ROW_NUMBER() OVER (PARTITION BY "profileSlug" ORDER BY "createdAt", "id") AS rn
  FROM "User"
)
UPDATE "User" u
SET "profileSlug" = CASE
  WHEN r.rn = 1 THEN r."profileSlug"
  ELSE r."profileSlug" || '-' || substring(u."id", 1, 6)
END
FROM ranked r
WHERE u."id" = r."id";

ALTER TABLE "User" ALTER COLUMN "profileSlug" SET NOT NULL;
CREATE UNIQUE INDEX "User_profileSlug_key" ON "User"("profileSlug");

-- Add owner to static sites
ALTER TABLE "StaticSite" ADD COLUMN "ownerId" TEXT;

-- Backfill owner from existing createdById when possible
UPDATE "StaticSite" s
SET "ownerId" = s."createdById"
WHERE s."createdById" IS NOT NULL
  AND EXISTS (SELECT 1 FROM "User" u WHERE u."id" = s."createdById");

-- Fallback owner for any remaining rows
UPDATE "StaticSite" s
SET "ownerId" = fallback."id"
FROM (
  SELECT u."id"
  FROM "User" u
  ORDER BY
    CASE
      WHEN u."role" = 'OWNER' THEN 0
      WHEN u."role" = 'ADMIN' THEN 1
      ELSE 2
    END,
    u."createdAt" ASC
  LIMIT 1
) AS fallback
WHERE s."ownerId" IS NULL;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "StaticSite" WHERE "ownerId" IS NULL) THEN
    RAISE EXCEPTION 'Cannot backfill StaticSite.ownerId because no fallback user exists';
  END IF;
END $$;

ALTER TABLE "StaticSite" ALTER COLUMN "ownerId" SET NOT NULL;

DROP INDEX IF EXISTS "StaticSite_slug_key";
CREATE UNIQUE INDEX "StaticSite_ownerId_slug_key" ON "StaticSite"("ownerId", "slug");
CREATE INDEX "StaticSite_ownerId_createdAt_idx" ON "StaticSite"("ownerId", "createdAt");

ALTER TABLE "StaticSite"
ADD CONSTRAINT "StaticSite_ownerId_fkey"
FOREIGN KEY ("ownerId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Link deployments to created posts
ALTER TABLE "StaticDeployment" ADD COLUMN "publishedPostId" TEXT;
CREATE UNIQUE INDEX "StaticDeployment_publishedPostId_key" ON "StaticDeployment"("publishedPostId");

ALTER TABLE "StaticDeployment"
ADD CONSTRAINT "StaticDeployment_publishedPostId_fkey"
FOREIGN KEY ("publishedPostId") REFERENCES "Post"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- Browser-issued publish sessions for authenticated users
CREATE TABLE "StaticPublishSession" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "lastUsedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "StaticPublishSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StaticPublishSession_tokenHash_key" ON "StaticPublishSession"("tokenHash");
CREATE INDEX "StaticPublishSession_userId_createdAt_idx" ON "StaticPublishSession"("userId", "createdAt");
CREATE INDEX "StaticPublishSession_expiresAt_idx" ON "StaticPublishSession"("expiresAt");

ALTER TABLE "StaticPublishSession"
ADD CONSTRAINT "StaticPublishSession_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
