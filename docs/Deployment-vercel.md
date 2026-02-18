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

### 3. Authentication Provider

Draftboard supports exactly **one** authentication provider per deployment. Choose the option that fits your organization and follow the setup instructions below.

<details>
<summary><strong>Option A: Credentials (default)</strong></summary>

This is the default — no additional setup is needed. Users will create accounts with email and password, and new users are invited via shareable invite links managed by admins.

No extra environment variables are required beyond `NEXTAUTH_SECRET` and `NEXTAUTH_URL`.

**How it works:**
- The first user to sign up becomes the **Owner**.
- Admins generate invite links from **Admin > Settings** and share them with team members.
- Admins can reset passwords, promote/demote roles, and deactivate users from **Admin > People**.

</details>

<details>
<summary><strong>Option B: Okta SSO</strong></summary>

Use this if your organization uses Okta as its identity provider.

#### Step 1: Create an Okta Application

1. Sign in to your [Okta Admin Console](https://admin.okta.com/).
2. Navigate to **Applications > Applications > Create App Integration**.
3. Select **OIDC - OpenID Connect** as the sign-in method.
4. Select **Web Application** as the application type and click **Next**.

#### Step 2: Configure the Application

| Setting | Value |
|---|---|
| **App integration name** | `Draftboard` (or any name you prefer) |
| **Grant type** | `Authorization Code` (default) |
| **Sign-in redirect URIs** | `https://your-app.vercel.app/api/auth/callback/okta` |
| **Sign-out redirect URIs** | `https://your-app.vercel.app` |

> Replace `your-app.vercel.app` with your actual production URL. If you use a custom domain (e.g. `draftboard.yourcompany.com`), use that instead.

#### Step 3: Assign Users

Under the **Assignments** tab of your new application, assign the users or groups who should have access to Draftboard.

#### Step 4: Collect Your Credentials

From the application's **General** tab, copy the following values:

| Okta value | Environment variable |
|---|---|
| **Client ID** | `AUTH_OKTA_CLIENT_ID` |
| **Client Secret** | `AUTH_OKTA_CLIENT_SECRET` |
| **Okta domain** (e.g. `https://your-org.okta.com`) | `AUTH_OKTA_ISSUER` |

> The issuer URL is your Okta domain with `https://` — for example, `https://dev-12345678.okta.com`. Do **not** include a trailing slash or path.

#### Step 5: Set Environment Variables

Add these to your Vercel project (or `.env` file):

```
AUTH_OKTA_CLIENT_ID=0oa1234567890abcdef
AUTH_OKTA_CLIENT_SECRET=your-okta-client-secret
AUTH_OKTA_ISSUER=https://your-org.okta.com
```

**How it works:**
- The first person to sign in via Okta becomes the **Owner**.
- All subsequent Okta users are auto-provisioned as **Members** on first sign-in.
- No invite links are needed — access is controlled by Okta user/group assignment.
- Admins can still promote/demote roles and deactivate users from **Admin > People**.

</details>

<details>
<summary><strong>Option C: Google Workspace</strong></summary>

Use this if your organization uses Google Workspace (formerly G Suite) and you want team members to sign in with their organizational Google accounts.

#### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Make sure the project is associated with your Google Workspace organization.

#### Step 2: Configure the OAuth Consent Screen

1. Navigate to **APIs & Services > OAuth consent screen**.
2. Select **Internal** as the user type (this restricts access to your Workspace domain).
   - If you select **External**, you'll need to add test users during development and submit for verification before production use.
3. Fill in the required fields:
   - **App name**: `Draftboard`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. On the **Scopes** page, add these scopes:
   - `email`
   - `profile`
   - `openid`
5. Save and continue through the remaining steps.

#### Step 3: Create OAuth Credentials

1. Navigate to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID**.
3. Select **Web application** as the application type.
4. Fill in:

| Setting | Value |
|---|---|
| **Name** | `Draftboard` |
| **Authorized JavaScript origins** | `https://your-app.vercel.app` |
| **Authorized redirect URIs** | `https://your-app.vercel.app/api/auth/callback/google` |

> Replace `your-app.vercel.app` with your actual production URL. Add `http://localhost:3000` origins/redirects for local development.

5. Click **Create** and copy the **Client ID** and **Client Secret**.

#### Step 4: Set Environment Variables

Add these to your Vercel project (or `.env` file):

```
AUTH_GOOGLE_CLIENT_ID=123456789-abcdefgh.apps.googleusercontent.com
AUTH_GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret
AUTH_GOOGLE_ALLOWED_DOMAIN=yourcompany.com
```

The `AUTH_GOOGLE_ALLOWED_DOMAIN` variable is **optional but recommended**. When set, only Google accounts from that domain can sign in. This is enforced both in the Google consent screen (via the `hd` parameter) and server-side in the sign-in callback.

> If you chose **Internal** in the consent screen, the domain is already restricted by Google. The `AUTH_GOOGLE_ALLOWED_DOMAIN` variable provides an additional server-side check.

**How it works:**
- The first person to sign in via Google becomes the **Owner**.
- All subsequent Google users (from the allowed domain) are auto-provisioned as **Members** on first sign-in.
- No invite links are needed — access is controlled by Google Workspace membership.
- Admins can still promote/demote roles and deactivate users from **Admin > People**.

</details>

> **Important:** Do not configure both Okta and Google at the same time. The app will refuse to start if both sets of environment variables are present.

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

#### Authentication (required)

| Variable | Value |
|---|---|
| `NEXTAUTH_SECRET` | A random secret — generate one with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://your-app.vercel.app` |

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

<details>
<summary><strong>Credentials auth</strong></summary>

- [ ] Verify the app loads at your production URL
- [ ] Sign up and confirm you have the Owner role
- [ ] Test file/image uploads to confirm storage is connected
- [ ] Create a test post to verify the database connection
- [ ] Set up a [custom domain](https://vercel.com/docs/projects/domains) in **Vercel > Settings > Domains** (optional but recommended)
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include the custom domain
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
- [ ] Set up a [custom domain](https://vercel.com/docs/projects/domains) in **Vercel > Settings > Domains** (optional but recommended)
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include the custom domain
- [ ] Update the **Sign-in redirect URI** in your Okta app to use the custom domain

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
- [ ] Set up a [custom domain](https://vercel.com/docs/projects/domains) in **Vercel > Settings > Domains** (optional but recommended)
- [ ] Update the `AllowedOrigins` in your R2 CORS policy to include the custom domain
- [ ] Update the **Authorized redirect URIs** in Google Cloud Console to use the custom domain

</details>
