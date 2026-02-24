# Deploying Draftboard with Docker

This guide walks you through deploying Draftboard using [Docker](https://www.docker.com/).

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Docker](https://docs.docker.com/get-docker/)**
- **[Docker Compose](https://docs.docker.com/compose/install/)** (included with Docker Desktop)

### Authentication Provider

Draftboard supports exactly **one** authentication provider per deployment. See the [Vercel deployment guide](./Deployment-vercel.md#3-authentication-provider) for detailed setup instructions for each provider (Credentials, Okta SSO, or Google Workspace).

> **Note:** The Docker Compose file includes a bundled PostgreSQL database and MinIO (S3-compatible storage), so you do **not** need to provision external services for local or self-hosted deployments.

---

## Quick Start (Local Development)

The included `docker-compose.yml` bundles the app with PostgreSQL and [MinIO](https://min.io/) (S3-compatible object storage). Migrations run automatically on container start, and the `draftboard` bucket is created for you.

From the project root:

```bash
docker compose -f dist/docker-compose.yml up --build
```

Open [http://localhost:3000](http://localhost:3000). File uploads work out of the box.

To browse uploaded files, open the MinIO console at [http://localhost:9001](http://localhost:9001) (username: `minioadmin`, password: `minioadmin`).

To stop:

```bash
docker compose -f dist/docker-compose.yml down
```

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

#### Storage (S3-compatible)

Set **one** of `S3_ENDPOINT` or `R2_ACCOUNT_ID` to choose your storage backend:

| Variable | Description |
|---|---|
| `S3_ENDPOINT` | Endpoint URL for MinIO, AWS S3, or any S3-compatible provider |
| `R2_ACCOUNT_ID` | Your Cloudflare account ID (used instead of `S3_ENDPOINT` for R2) |
| `R2_ACCESS_KEY_ID` | S3 access key ID |
| `R2_SECRET_ACCESS_KEY` | S3 secret access key |
| `R2_BUCKET_NAME` | Name of the storage bucket |
| `R2_PUBLIC_URL` | *(optional)* Public/CDN URL for serving files |

> **MinIO (bundled):** The default Compose file sets `S3_ENDPOINT=http://localhost:9000` with MinIO's default credentials. For production, change `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD` and update the matching `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY`.

> **Important:** `S3_ENDPOINT` must be reachable from the **browser**, since presigned upload/download URLs contain this hostname. For local Docker, `http://localhost:9000` works because the port is mapped to the host. For production, put MinIO behind a reverse proxy with a public URL (e.g. `https://s3.yourcompany.com`) and set `S3_ENDPOINT` to that URL.

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

**With Docker directly (bring your own database and S3):**

```bash
docker run -d \
  --name draftboard \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/dbname" \
  -e AUTH_SECRET="your-secret-here" \
  -e AUTH_URL="https://draftboard.yourcompany.com" \
  -e AUTH_TRUST_HOST="true" \
  -e S3_ENDPOINT="https://s3.yourcompany.com" \
  -e R2_ACCESS_KEY_ID="your-access-key" \
  -e R2_SECRET_ACCESS_KEY="your-secret-key" \
  -e R2_BUCKET_NAME="draftboard" \
  draftboard
```

The container's entrypoint automatically runs `prisma migrate deploy` before starting the app, so database migrations are applied on every restart.

### 4. Reverse Proxy (Optional)

For production, you'll typically run Draftboard behind a reverse proxy like [Nginx](https://nginx.org/), [Caddy](https://caddyserver.com/), or [Traefik](https://traefik.io/) to handle TLS termination and custom domains.

Make sure to:

- Set `AUTH_TRUST_HOST=true` so the app trusts the `X-Forwarded-*` headers from your proxy
- Set `AUTH_URL` to your public-facing URL (e.g. `https://draftboard.yourcompany.com`)
- Proxy traffic to the container on port `3000`
- If using the bundled MinIO, also proxy MinIO's API port (9000) so browsers can reach presigned URLs

---

## Using Cloudflare R2 Instead of MinIO

If you prefer Cloudflare R2 (or another hosted S3 provider), remove the MinIO services from `docker-compose.yml` and set the R2 variables instead:

```yaml
environment:
  R2_ACCOUNT_ID: "your-cloudflare-account-id"
  R2_ACCESS_KEY_ID: "your-r2-access-key"
  R2_SECRET_ACCESS_KEY: "your-r2-secret-key"
  R2_BUCKET_NAME: "your-bucket"
  R2_PUBLIC_URL: "https://your-public-url"
```

Remove `S3_ENDPOINT` (do not set both). Remove the `minio`, `minio-init` services and the `draftboard_minio` volume. Remove the `minio-init` dependency from the `app` service.

---

## File Structure

All Docker-related files live in the `dist/` directory:

```
dist/
├── Dockerfile             # Multi-stage build for the production image
├── docker-compose.yml     # Orchestration with bundled PostgreSQL and MinIO
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
- [ ] If using MinIO: change the default `minioadmin` credentials
- [ ] If using R2: update the `AllowedOrigins` in your R2 CORS policy to include your production domain
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
- [ ] If using MinIO: change the default `minioadmin` credentials
- [ ] If using R2: update the `AllowedOrigins` in your R2 CORS policy to include your production domain
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
- [ ] If using MinIO: change the default `minioadmin` credentials
- [ ] If using R2: update the `AllowedOrigins` in your R2 CORS policy to include your production domain
- [ ] Update the **Authorized redirect URIs** in Google Cloud Console to use your production domain

</details>
