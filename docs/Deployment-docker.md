# Deploying Draftboard with Docker

This guide walks you through deploying Draftboard using [Docker](https://www.docker.com/).

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Docker](https://docs.docker.com/get-docker/)**
- **[Docker Compose](https://docs.docker.com/compose/install/)** (included with Docker Desktop)

You'll also need the same external services as any other deployment method:

### 1. Object Storage (Cloudflare R2 or AWS S3)

File and image uploads require S3-compatible object storage. See the [Vercel deployment guide](./Deployment-vercel.md#2-object-storage-cloudflare-r2-or-aws-s3) for full setup instructions.

You'll need the following credentials from your storage provider:

| Credential | Description |
|---|---|
| Account/Region ID | Your Cloudflare account ID or AWS region |
| Access Key ID | API token with read/write access to your bucket |
| Secret Access Key | The corresponding secret key |
| Bucket Name | The name of your storage bucket |
| Public URL | The public URL for serving uploaded files |

### 2. Authentication Provider

Draftboard supports exactly **one** authentication provider per deployment. See the [Vercel deployment guide](./Deployment-vercel.md#3-authentication-provider) for detailed setup instructions for each provider (Credentials, Okta SSO, or Google Workspace).

> **Note:** The Docker Compose file includes a bundled PostgreSQL database, so you do **not** need to provision an external database for local or self-hosted deployments.

---

## Quick Start (Local Development)

The included `docker-compose.yml` bundles the app with a PostgreSQL database. Migrations run automatically on container start.

From the project root:

```bash
docker compose -f dist/docker-compose.yml up --build
```

Open [http://localhost:3000](http://localhost:3000). To stop:

```bash
docker compose -f dist/docker-compose.yml down
```

> **Note:** The default Compose configuration uses placeholder values for R2 storage. The app will boot, but file uploads will fail until you provide real credentials.

---

## Production Deployment

### 1. Configure Environment Variables

Create a `.env` file in the project root (or pass variables directly to Docker). The following variables are required:

#### Authentication (required)

| Variable | Value |
|---|---|
| `AUTH_SECRET` | A random secret — generate one with `openssl rand -base64 32` |
| `AUTH_URL` | Your production URL, e.g. `https://draftboard.yourcompany.com` |
| `AUTH_TRUST_HOST` | Set to `true` when running behind a reverse proxy |

<details>
<summary><strong>Auth provider variables (expand your chosen provider)</strong></summary>

**Okta SSO:**

| Variable | Value |
|---|---|
| `AUTH_OKTA_CLIENT_ID` | Your Okta OAuth client ID |
| `AUTH_OKTA_CLIENT_SECRET` | Your Okta OAuth client secret |
| `AUTH_OKTA_ISSUER` | Your Okta domain, e.g. `https://your-org.okta.com` |

**Google Workspace:**

| Variable | Value |
|---|---|
| `AUTH_GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `AUTH_GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |
| `AUTH_GOOGLE_ALLOWED_DOMAIN` | *(optional)* e.g. `yourcompany.com` |

**Credentials (default):**

No additional variables needed.

</details>

#### Storage (Cloudflare R2 / AWS S3)

| Variable | Value |
|---|---|
| `R2_ACCOUNT_ID` | Your Cloudflare account ID (or AWS region) |
| `R2_ACCESS_KEY_ID` | Your storage API access key |
| `R2_SECRET_ACCESS_KEY` | Your storage API secret key |
| `R2_BUCKET_NAME` | The name of your bucket |
| `R2_PUBLIC_URL` | Public URL for the bucket, e.g. `https://<id>.r2.cloudflarestorage.com` |

#### Database

| Variable | Value |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://user:pass@host:5432/dbname` |

> If you're using the bundled Compose database, this is pre-configured for you.

### 2. Build the Image

From the project root:

```bash
docker build -f dist/Dockerfile -t draftboard .
```

This runs a multi-stage build that:

1. Installs dependencies and generates the Prisma client
2. Builds the Next.js production bundle
3. Creates a slim production image with only runtime dependencies

### 3. Run the Container

**With Docker Compose (recommended):**

Edit the environment variables in `dist/docker-compose.yml` with your production values, then:

```bash
docker compose -f dist/docker-compose.yml up -d
```

**With Docker directly (bring your own database):**

```bash
docker run -d \
  --name draftboard \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/dbname" \
  -e AUTH_SECRET="your-secret-here" \
  -e AUTH_URL="https://draftboard.yourcompany.com" \
  -e AUTH_TRUST_HOST="true" \
  -e R2_ACCOUNT_ID="your-account-id" \
  -e R2_ACCESS_KEY_ID="your-access-key" \
  -e R2_SECRET_ACCESS_KEY="your-secret-key" \
  -e R2_BUCKET_NAME="your-bucket" \
  -e R2_PUBLIC_URL="https://your-public-url" \
  draftboard
```

The container's entrypoint automatically runs `prisma migrate deploy` before starting the app, so database migrations are applied on every restart.

### 4. Reverse Proxy (Optional)

For production, you'll typically run Draftboard behind a reverse proxy like [Nginx](https://nginx.org/), [Caddy](https://caddyserver.com/), or [Traefik](https://traefik.io/) to handle TLS termination and custom domains.

Make sure to:

- Set `AUTH_TRUST_HOST=true` so the app trusts the `X-Forwarded-*` headers from your proxy
- Set `AUTH_URL` to your public-facing URL (e.g. `https://draftboard.yourcompany.com`)
- Proxy traffic to the container on port `3000`

---

## File Structure

All Docker-related files live in the `dist/` directory:

```
dist/
├── Dockerfile             # Multi-stage build for the production image
├── docker-compose.yml     # Orchestration with bundled PostgreSQL
└── docker-entrypoint.sh   # Runs migrations before starting the app
```

The `.dockerignore` file remains at the project root (Docker reads it relative to the build context).

---

## Post-Deployment Checklist

<details>
<summary><strong>Credentials auth</strong></summary>

- [ ] Verify the app loads at your production URL
- [ ] Sign up and confirm you have the Owner role
- [ ] Test file/image uploads to confirm storage is connected
- [ ] Create a test post to verify the database connection
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include your production domain
- [ ] Generate an invite link from **Admin > Settings** and share it with your team

</details>

<details>
<summary><strong>Okta SSO</strong></summary>

- [ ] Verify the app loads at your production URL
- [ ] Click "Sign in with Okta" and confirm you are redirected to your Okta login
- [ ] Sign in and confirm you have the Owner role (first user)
- [ ] Test file/image uploads to confirm storage is connected
- [ ] Create a test post to verify the database connection
- [ ] Have a second team member sign in — confirm they are auto-provisioned as a Member
- [ ] Verify you can promote them to Admin from **Admin > People**
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include your production domain
- [ ] Update the **Sign-in redirect URI** in your Okta app to use your production domain

</details>

<details>
<summary><strong>Google Workspace</strong></summary>

- [ ] Verify the app loads at your production URL
- [ ] Click "Sign in with Google" and confirm you are redirected to Google's consent screen
- [ ] Sign in and confirm you have the Owner role (first user)
- [ ] If `AUTH_GOOGLE_ALLOWED_DOMAIN` is set, try signing in with a personal Gmail — confirm it is rejected
- [ ] Test file/image uploads to confirm storage is connected
- [ ] Create a test post to verify the database connection
- [ ] Have a second team member sign in — confirm they are auto-provisioned as a Member
- [ ] Verify you can promote them to Admin from **Admin > People**
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include your production domain
- [ ] Update the **Authorized redirect URIs** in Google Cloud Console to use your production domain

</details>
