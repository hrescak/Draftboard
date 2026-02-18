# Static Site Publishing (Profile-Owned Next.js Exports)

Draftboard can host static Next.js exports on profile-owned URLs:

- `https://<draftboard-host>/u/<profile-slug>/<site-slug>`

Each publish creates a new deployment, activates it atomically, and creates a new post under that profile.
You can also run in compose mode, which activates the deployment and opens a prefilled `/compose` URL so users can write the post themselves.

## 1. Configure Draftboard

Make sure these are set and deployed:

- R2 env vars (`R2_*`)
- Prisma migrations applied:

```bash
npx prisma migrate deploy
```

`STATIC_PUBLISH_TOKEN` is optional. It is only needed for service-token publishing.

## 2. Prepare the Next.js app you want to publish

Use static export mode:

```ts
// next.config.ts
import type { NextConfig } from "next";

const basePath = process.env.STATIC_BASE_PATH?.trim();

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Build it:

```bash
STATIC_BASE_PATH=/u/james/portfolio npm run build
```

This produces `out/`.

## 3. Generate a publish token (recommended flow)

In Draftboard, while logged in as the publishing user:

1. Open **Settings**
2. Open **Static Publishing**
3. Click **Generate 1-Hour Publish Token**

This creates a short-lived token bound to that user/profile.

## 4. Publish from the Next.js project

From the external Next.js repo:

```bash
curl -fsSL https://draftboard.yourcompany.com/api/static-sites/publisher-script -o ./draftboard-publish.mjs
STATIC_BASE_PATH=/u/james/portfolio npm run build
node ./draftboard-publish.mjs \
  --base-url https://draftboard.yourcompany.com \
  --token "<publish-token>" \
  --profile james \
  --slug portfolio \
  --name "James Portfolio" \
  --out-dir ./out
```

Site URL:

- `https://draftboard.yourcompany.com/u/james/portfolio`

On finalize, Draftboard also creates a post for this deployment under James.

## Compose-First Mode (for Cursor skills)

If your skill should deploy first and then land the user on Draftboard `/compose` with the Live URL prefilled:

```bash
node ./draftboard-publish.mjs \
  --base-url https://draftboard.yourcompany.com \
  --token "<publish-token-or-service-token>" \
  --profile james \
  --slug portfolio \
  --name "James Portfolio" \
  --post-mode compose \
  --open-compose true \
  --out-dir ./out
```

In `compose` mode the script:

- activates the deployment
- does **not** auto-create a post
- prints a prefilled compose URL:
  - `https://draftboard.yourcompany.com/compose?liveUrl=...&title=...`
- optionally opens that URL in the browser when `--open-compose true` is used

## Service Token Mode (optional)

If you want non-user automation, set `STATIC_PUBLISH_TOKEN` on Draftboard and use that token with `--profile <owner-profile-slug>`.

## API Endpoints

Publish flow:

- `POST /api/static-sites/init`
- `POST /api/static-sites/sign`
- `POST /api/static-sites/finalize`

Helper endpoints:

- `POST /api/static-sites/session` (logged-in users mint short-lived publish tokens)
- `GET /api/static-sites/publisher-script` (download publish client script)

## Notes

- Static export only (`output: "export"`). No SSR/API routes/server actions.
- Legacy `/s/<slug>` URLs now redirect only when the slug is unambiguous; canonical URLs are `/u/<profile>/<site>`.
