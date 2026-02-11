# Contributing to Draftboard

Thanks for your interest in contributing! This guide covers everything you need to get a local development environment running and start making changes.

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (local or hosted)
- Cloudflare R2 bucket (for file uploads)

### Getting Started

```bash
# Install dependencies
npm install

# Copy environment file and fill in your values
cp .env.example .env

# Generate the Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start the dev server (with Turbopack)
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run build:prod` | Run migrations + build (for deployment) |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:push` | Push schema changes without migrations |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## Project Architecture

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Public auth pages (sign-in, sign-up, invite, reset-password)
│   ├── (main)/                 # Protected pages (feed, posts, projects, admin, settings)
│   └── api/                    # API routes (tRPC, NextAuth)
├── components/
│   ├── comments/               # Comment section, threads, composer
│   ├── editor/                 # Lexical rich text editor, plugins, and nodes
│   ├── feed/                   # Feed list/grid views, post cards
│   ├── layout/                 # Main navigation
│   ├── post/                   # Post detail and editor
│   ├── projects/               # Project detail, cover upload
│   ├── reactions/              # Reaction button and dialog
│   ├── search/                 # Command palette search
│   ├── settings/               # Avatar and emoji upload
│   ├── ui/                     # Shared UI primitives (shadcn/ui)
│   └── user/                   # User profile
├── server/
│   ├── api/
│   │   ├── routers/            # tRPC routers (post, comment, project, user, etc.)
│   │   ├── root.ts             # Root tRPC router
│   │   └── trpc.ts             # tRPC initialization and context
│   ├── auth.ts                 # NextAuth full configuration (providers, callbacks)
│   ├── auth.config.ts          # Edge-compatible auth config (for middleware)
│   └── db.ts                   # Prisma client singleton
├── lib/
│   ├── auth-provider.ts        # Auth mode detection (credentials / okta / google)
│   ├── hooks/                  # Custom React hooks
│   ├── trpc/                   # tRPC client, provider, and server caller
│   ├── r2.ts                   # Cloudflare R2 upload utilities
│   ├── utils.ts                # Shared utilities (cn, formatRelativeTime, pluralize)
│   ├── validators.ts           # Zod validation schemas
│   └── webhooks.ts             # Discord/Slack webhook helpers
├── middleware.ts               # Auth middleware (Edge runtime)
└── test/
    └── setup.ts                # Vitest test setup
```

## Authentication

Draftboard supports three mutually exclusive authentication providers, selected by environment variables:

| Mode | Trigger | How users join |
|---|---|---|
| **Credentials** (default) | No SSO env vars set | Email/password sign-up via invite links |
| **Okta SSO** | `AUTH_OKTA_*` vars present | Sign in with Okta, auto-provisioned on first login |
| **Google Workspace** | `AUTH_GOOGLE_*` vars present | Sign in with Google, auto-provisioned on first login |

The active mode is detected at startup by `getAuthMode()` in `src/lib/auth-provider.ts`. Only one provider can be active at a time — the app will throw an error if both Okta and Google are configured.

Key files:

| File | Purpose |
|---|---|
| `src/lib/auth-provider.ts` | Detects active auth mode from env vars |
| `src/server/auth.config.ts` | Edge-compatible auth config (middleware) — dynamically selects provider |
| `src/server/auth.ts` | Full auth config — provider logic, SSO auto-provisioning, JWT/session callbacks |
| `src/app/(auth)/sign-in/` | Sign-in page — renders credentials form or SSO button based on mode |

For local development, credentials mode is the default (no extra setup). To test SSO locally, set the appropriate env vars in your `.env` — see `.env.example` for details.

## Code Conventions

### Imports

Use the `~/` path alias which maps to `src/`:

```tsx
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/client";
```

### Components

- Use `"use client"` only for interactive components; keep server components as the default
- Place shared UI primitives in `src/components/ui/` following shadcn/ui patterns
- Feature-specific components go in their own folder (e.g. `src/components/feed/`)
- Prefer named exports over default exports

### Styling

- Use Tailwind CSS classes for all styling
- Use `cn()` from `~/lib/utils` for conditional class merging
- Follow the existing shadcn/ui patterns for new components

### TypeScript

- Always type component props with interfaces
- Use `unknown` for JSON data from the database (e.g. Lexical editor state)
- Prefer explicit types over `any`

### Data Fetching

All API calls go through tRPC:

```tsx
import { api } from "~/lib/trpc/client";

// Basic query
const { data } = api.post.getById.useQuery({ id: postId });

// Infinite scroll
const { data, fetchNextPage, hasNextPage } = api.post.list.useInfiniteQuery(
  { limit: 10 },
  { getNextPageParam: (lastPage) => lastPage.nextCursor }
);
const items = data?.pages.flatMap((page) => page.items) ?? [];
```

### Auth-Aware UI

Some UI features should be hidden or shown based on the active auth mode. Use the `api.user.authMode` query:

```tsx
const { data: authModeData } = api.user.authMode.useQuery();
const isCredentialsAuth = authModeData?.mode === "credentials";

// Hide password reset for SSO deployments
{isCredentialsAuth && <ResetPasswordButton />}
```

Features that differ by auth mode:
- **Invite links** — only shown for credentials auth (SSO users are auto-provisioned)
- **Password reset** — only shown for credentials auth (SSO passwords are managed by the IdP)
- **Sign-up page** — only accessible for credentials auth (SSO redirects to sign-in)

### Utilities

- **Pluralization**: Always use `pluralize()` from `~/lib/utils` — never hardcode plural forms
- **Dates**: Use `formatRelativeTime()` from `~/lib/utils` for relative timestamps
- **R2 URLs**: Private file URLs need signing — use `api.upload.getDownloadUrl.useQuery()`

## Testing

We use [Vitest](https://vitest.dev/) for unit tests and [Storybook](https://storybook.js.org/) for component development and visual testing.

### Unit Tests

Test files live alongside source files with a `.test.ts` or `.test.tsx` extension:

```bash
# Run tests in watch mode
npm test

# Run tests once (CI)
npm run test:run
```

### Storybook

Storybook stories live alongside components with a `.stories.tsx` extension. The Storybook setup includes:

- **Vitest addon** — stories run as browser tests via Playwright
- **a11y addon** — automated accessibility checks
- **Docs addon** — auto-generated documentation from stories

```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Stories use the `~/` path alias and have access to the same theme/providers as the main app. See existing stories in `src/components/ui/` for examples.

## Database

The database schema is managed with [Prisma](https://www.prisma.io/). The schema lives at `prisma/schema.prisma`.

```bash
# After changing the schema, create a migration
npm run db:migrate

# Or push changes directly (useful during prototyping)
npm run db:push

# Browse your data
npm run db:studio
```

## Making Changes

1. Create a branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm test` to verify nothing is broken
4. Open a pull request

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
