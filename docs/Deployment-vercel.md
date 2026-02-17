# Deploying Draftboard on Vercel

This guide walks you through deploying Draftboard to [Vercel](https://vercel.com).

## Prerequisites

Before you begin, you'll need two external services set up:

### 1. PostgreSQL Database

You need a PostgreSQL database connection string. Any of the following providers will work:

- **[Prisma Postgres](https://www.prisma.io/postgres)** (recommended) — managed Postgres with built-in connection pooling via Prisma Accelerate.
- **[Supabase](https://supabase.com)** — free tier available, use the "Transaction" connection string for migrations.
- **[Neon](https://neon.tech)** — serverless Postgres with a generous free tier.

After setting up your database, you should have a connection string that looks something like:

```
# Prisma Postgres
prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY

# Supabase
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

# Neon
postgresql://[USER]:[PASSWORD]@[HOST].neon.tech/[DBNAME]?sslmode=require
```

### 2. Object Storage (Cloudflare R2 or AWS S3)

File and image uploads require S3-compatible object storage. Supported providers:

- **[Cloudflare R2](https://developers.cloudflare.com/r2/)** (recommended) — no egress fees, S3-compatible API.
- **[AWS S3](https://aws.amazon.com/s3/)** — the original, works out of the box.

You'll need the following credentials from your storage provider:

| Credential | Description |
|---|---|
| Account/Region ID | Your Cloudflare account ID or AWS region |
| Access Key ID | API token with read/write access to your bucket |
| Secret Access Key | The corresponding secret key |
| Bucket Name | The name of your storage bucket |
| Public URL | The public URL for serving uploaded files |

#### Cloudflare R2 Setup

1. **Create a bucket** in the Cloudflare dashboard under **R2 > Overview > Create bucket**.

2. **Create an API token** under **R2 > Overview > Manage R2 API Tokens > Create API token**. Give it **Object Read & Write** permissions for your bucket. After creating the token, copy the **Access Key ID** and **Secret Access Key** — these are only shown once.

3. **Get your public bucket URL.** Go to **R2 > your bucket > Settings > Public access**. You can either:
   - Enable the **R2.dev subdomain** for a quick public URL (e.g. `https://pub-abc123.r2.dev`), or
   - Connect a **custom domain** (e.g. `cdn.yourdomain.com`) for a cleaner URL.

   Whichever you choose, use the resulting URL as your `R2_PUBLIC_URL` environment variable.

4. **Configure CORS.** Go to **R2 > your bucket > Settings > CORS policy** and add the following configuration (replace the origin with your production URL):

```json
[
  {
    "AllowedOrigins": [
      "https://draftboard.studio"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "HEAD",
      "DELETE"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

> **Note:** If you're also using a Preview/Development environment, add those URLs to `AllowedOrigins` as well (e.g. `https://your-app-git-*.vercel.app` or `http://localhost:3000`).

---

## Vercel Setup

Use the button below to kickstart your setup — it will clone the repository and pre-fill the required environment variables for you. You'll still need to provide actual values from your database and storage provider (see Prerequisites above).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhrescak%2FDraftboard.git&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,R2_ACCOUNT_ID,R2_ACCESS_KEY_ID,R2_SECRET_ACCESS_KEY,R2_BUCKET_NAME,R2_PUBLIC_URL&envDefaults=%7B%22NEXTAUTH_SECRET%22%3A%22generate-new-secret-locally%22%2C%22NEXTAUTH_URL%22%3A%22https%3A%2F%2F%24VERCEL_PROJECT_PRODUCTION_URL%22%2C%22R2_ACCOUNT_ID%22%3A%22your_cloudflare_account_id%22%2C%22R2_ACCESS_KEY_ID%22%3A%22your_r2_access_key_id%22%2C%22R2_BUCKET_NAME%22%3A%22your_bucket_name%22%2C%22R2_PUBLIC_URL%22%3A%22https%3A%2F%2Fyour_account_id.r2.cloudflarestorage.com%22%7D&envDescription=Deployment%20guide%20for%20Draftboard&envLink=https%3A%2F%2Fgithub.com%2Fhrescak%2FDraftboard%2Fblob%2Fmain%2Fdocs%2FDeployment-vercel.md&project-name=draftboard&repository-name=draftboard)

Alternatively, follow the manual steps below.

### 1. Import your repository

1. Go to [vercel.com/new](https://vercel.com/new) and import your Draftboard repository from GitHub.
2. Select the appropriate team/scope for the project.

### 2. Configure Environment Variables

In your Vercel project, go to **Settings > Environment Variables** and add the following:

#### Database

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your PostgreSQL connection string (see Prerequisites) |

#### Authentication

| Variable | Value |
|---|---|
| `NEXTAUTH_SECRET` | A random secret — generate one with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://your-app.vercel.app` |

#### Storage (Cloudflare R2 / AWS S3)

| Variable | Value |
|---|---|
| `R2_ACCOUNT_ID` | Your Cloudflare account ID (or AWS region) |
| `R2_ACCESS_KEY_ID` | Your storage API access key |
| `R2_SECRET_ACCESS_KEY` | Your storage API secret key |
| `R2_BUCKET_NAME` | The name of your bucket |
| `R2_PUBLIC_URL` | Public URL for the bucket, e.g. `https://<id>.r2.cloudflarestorage.com` |
| `STATIC_PUBLISH_TOKEN` | Optional service bearer token for static site deployment API |

> Make sure all environment variables are set for the **Production** environment (and optionally Preview/Development).

### 3. Configure Build Settings

In your Vercel project, go to **Settings > General > Build & Development Settings** and set:

| Setting | Value |
|---|---|
| **Build Command** | `npm run build:prod` |

This ensures database migrations are applied before the app is built. The `build:prod` script runs:

```bash
prisma migrate deploy && next build
```

Leave the other settings (Output Directory, Install Command, etc.) at their defaults.

### 4. Deploy

Trigger a deployment by pushing to your main branch, or click **Redeploy** in the Vercel dashboard. Vercel will:

1. Install dependencies (and run `postinstall` which generates the Prisma client)
2. Run `npm run build:prod` which applies pending database migrations and builds the Next.js app
3. Deploy the production build to Vercel's edge network

---
## Post-Deployment Checklist

- [ ] Verify the app loads at your production URL
- [ ] Sign up and confirm you have the Owner role
- [ ] Test file/image uploads to confirm storage is connected
- [ ] Create a test post to verify the database connection
- [ ] Set up a [custom domain](https://vercel.com/docs/projects/domains) in **Vercel > Settings > Domains** (optional but recommended)
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include the custom domain
- [ ] Generate an invite link from **Admin > Settings** and share it with your team
