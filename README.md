<img width="1280" height="640" alt="Draftboard logo" src="https://github.com/user-attachments/assets/b68e931a-915b-4fe3-8894-bed44a6668cb" />


# Draftboard

**Draftboard** is a shared space for teams to post designs, ideas, and work in progress. In distributed teams, meaningful work too often disappears into Slack threads or gets buried inside Figma, making it harder to learn from each other and keep ideas flowing. Draftboard brings that work back into the open with a lightweight, social feed that’s easy to deploy, pleasant to use, and flexible enough to fit into existing workflows.

## Features

- **Feed** — Reverse chronological feed of posts with list and grid views
- **Rich Editor** — Lexical-based editor with markdown shortcuts, @mentions, slash commands, drag-and-drop, pasting and automatic draft saving.
- **Attachments** — Images, videos, files, Figma links, and Loom recordings with a carousel viewer
- **Projects** — Organize posts into projects with cover images, descriptions, and team members
- **Comments** — Threaded comments with 2 levels of depth and attachment-specific comments
- **Reactions** — Like, wow, cool reactions plus custom emoji support
- **Notifications** — Notifications for comments, replies, mentions, and reactions
- **Search** — Full-text search across posts, projects, and people
- **Webhooks** — Optional Discord and Slack webhook integrations for new posts
- **Admin** — User management, invite links, and site settings
- **Static Publishing** — Host versioned static sites (e.g. Next.js export output) on `/u/<profile>/<slug>`
- **Dark Mode** — Full light/dark theme support
- **Mobile PWA** — Fully mobile-optimized as a Progressive Web App, feels at home on iOS and Android home screens

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **API**: tRPC v11 + React Query
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js v5 (Credentials provider, JWT sessions)
- **Storage**: Cloudflare R2 (S3-compatible)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Editor**: Lexical
- **Testing**: Vitest + Storybook

## Deploying to Vercel

Click the button below to kickstart your deployment — it will clone the repo and prompt you for the required environment variables:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhrescak%2FDraftboard.git&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,R2_ACCOUNT_ID,R2_ACCESS_KEY_ID,R2_SECRET_ACCESS_KEY,R2_BUCKET_NAME,R2_PUBLIC_URL&envDefaults=%7B%22NEXTAUTH_SECRET%22%3A%22generate-new-secret-locally%22%2C%22NEXTAUTH_URL%22%3A%22https%3A%2F%2F%24VERCEL_PROJECT_PRODUCTION_URL%22%2C%22R2_ACCOUNT_ID%22%3A%22your_cloudflare_account_id%22%2C%22R2_ACCESS_KEY_ID%22%3A%22your_r2_access_key_id%22%2C%22R2_BUCKET_NAME%22%3A%22your_bucket_name%22%2C%22R2_PUBLIC_URL%22%3A%22https%3A%2F%2Fyour_account_id.r2.cloudflarestorage.com%22%7D&envDescription=Deployment%20guide%20for%20Draftboard&envLink=https%3A%2F%2Fgithub.com%2Fhrescak%2FDraftboard%2Fblob%2Fmain%2Fdocs%2FDeployment-vercel.md&project-name=draftboard&repository-name=draftboard)

For the full walkthrough (database setup, R2 configuration, CORS, build settings), see the [Vercel deployment guide](docs/Deployment-vercel.md).

## Publishing Static Websites

Draftboard can also host static sites using the same R2 infrastructure. This is useful for publishing static Next.js exports (`output: "export"`) from design or marketing repos.

See the full guide: [Static site publishing](docs/Static-site-publishing.md).

## Self-Hosting

### Prerequisites

- A service that runs Node.js 18+ (e.g. [Vercel](https://vercel.com))
- A PostgreSQL database ([Prisma Postgres](https://www.prisma.io/postgres), [Supabase](https://supabase.com), or [Neon](https://neon.tech))
- S3-compatible storage ([Cloudflare R2](https://developers.cloudflare.com/r2/) or [AWS S3](https://aws.amazon.com/s3/))

### 1. Clone and install

```bash
git clone https://github.com/your-org/draftboard.git
cd draftboard
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in your `.env` with the following:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for signing sessions (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your deployment URL (e.g. `https://draftboard.yourcompany.com`) |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API key ID |
| `R2_SECRET_ACCESS_KEY` | R2 API secret |
| `R2_BUCKET_NAME` | R2 bucket name |
| `R2_PUBLIC_URL` | Public URL for the R2 bucket |
| `STATIC_PUBLISH_TOKEN` | Optional service bearer token for static site deployment API (user-scoped publish tokens can be created in Settings) |

### 3. Set up the database

```bash
npm run db:generate
npm run db:migrate
```

### 4. Start the app

```bash
# Development
npm run dev

# Production
npm run build:prod
npm run start
```



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, architecture details, and contribution guidelines.

## License

MIT

## Ackgnowledgements

This tool stands on the shoulders of earlier tools like [Pixelcloud](https://engineering.fb.com/2011/02/15/web/hackathon-22-redesigning-pixelcloud/) and [Campsite](https://www.campsite.com/), which helped shape many of the ideas explored here. I’ve been fortunate to work closely with both—contributing to Pixelcloud during my time at Facebook and supporting Campsite as an investor—and this project carries forward lessons learned from each.
