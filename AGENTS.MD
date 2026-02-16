# AGENTS.MD

Guidelines for AI coding agents working on this codebase.

## Code Style & Conventions

### Pluralization

Always use the `pluralize()` helper from `~/lib/utils` when displaying counts with text labels. Never hardcode plural forms.

```tsx
// ✅ Correct
import { pluralize } from "~/lib/utils";
<span>{count} {pluralize(count, "post")}</span>
<span>{count} {pluralize(count, "reply", "replies")}</span>

// ❌ Wrong - hardcoded plural
<span>{count} posts</span>
<span>{count} members</span>
```

The `pluralize(count, singular, plural?)` function:
- Returns singular form when count === 1
- Returns plural form (or singular + "s") otherwise
- Supports irregular plurals via optional third argument

### Component Structure

- Use `"use client"` directive for interactive components
- Keep server components as the default where possible
- Place shared UI components in `src/components/ui/`
- Feature-specific components go in their respective folders (e.g., `src/components/feed/`)

### Imports

- Use path aliases: `~/` maps to `src/`
- Import order: React → Next.js → external libs → internal modules → types
- Prefer named exports over default exports for components

### TypeScript

- Always type component props with interfaces
- Use `unknown` for JSON data from the database (e.g., Lexical editor state)
- Prefer explicit types over `any`

### API & Data Fetching

- Use tRPC for all API calls via `api` from `~/lib/trpc/client`
- Use React Query's infinite queries for paginated data
- Handle loading and error states explicitly

### Styling

- Use Tailwind CSS classes
- Use `cn()` from `~/lib/utils` for conditional class merging
- Follow shadcn/ui patterns for custom components

#### Destructive Action Styling

Destructive/negative actions with red text must have proper hover/focus states to remain readable:

```tsx
// ✅ Correct - red background with white text on hover/focus
<DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
  Delete item
</DropdownMenuItem>

<Button className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
  Sign out
</Button>

// ❌ Wrong - red text stays red on dark hover background, becomes unreadable
<DropdownMenuItem className="text-destructive focus:text-destructive">
  Delete item
</DropdownMenuItem>

<Button className="text-destructive hover:text-destructive">
  Sign out
</Button>
```

Rule: Elements with `text-destructive` in default state should use `focus:bg-destructive focus:text-destructive-foreground` (for menu items) or `hover:bg-destructive hover:text-destructive-foreground` (for buttons) in their interactive states.

## Authentication

Draftboard supports three mutually exclusive auth providers — **credentials** (default), **Okta SSO**, or **Google Workspace** — controlled by environment variables. Only one can be active per deployment.

### Key Files

| File | Purpose |
|---|---|
| `src/lib/auth-provider.ts` | `getAuthMode()` and `isSSO()` — detects active auth mode from env vars |
| `src/server/auth.config.ts` | Edge-compatible provider config (used by middleware) |
| `src/server/auth.ts` | Full provider config, SSO auto-provisioning, JWT/session callbacks |
| `src/app/(auth)/sign-in/` | Renders credentials form or SSO button based on mode |

### Auth-Aware UI Guidelines

When building UI that touches auth features, check the auth mode:

```tsx
// Server components — use directly
import { getAuthMode, isSSO } from "~/lib/auth-provider";
if (isSSO()) { redirect("/sign-in"); }

// Client components — use the tRPC endpoint
const { data: authModeData } = api.user.authMode.useQuery();
const isCredentialsAuth = authModeData?.mode === "credentials";
```

Features that vary by auth mode:
- **Invite links** — credentials only (SSO users are auto-provisioned by their IdP)
- **Password reset** — credentials only (SSO passwords are managed externally)
- **Sign-up page** — credentials only (SSO users sign in directly, auto-provisioned on first login)
- **Role management & deactivation** — available in ALL modes

### Adding New Auth-Gated Features

If you add a feature that should only exist for a specific auth mode:
1. **Server-side**: Guard with `isSSO()` or `getAuthMode()` from `~/lib/auth-provider`
2. **Client-side**: Query `api.user.authMode` and conditionally render
3. **tRPC endpoints**: Check `isSSO()` and throw `TRPCError` with `code: "BAD_REQUEST"` if the feature isn't available

## Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (public)
│   ├── (main)/            # Protected pages
│   └── api/               # API routes (tRPC, NextAuth)
├── components/            # React components
├── server/                # Server-side code
│   └── api/routers/       # tRPC routers
├── lib/                   # Utilities and hooks
│   └── auth-provider.ts   # Auth mode detection
└── middleware.ts          # Auth middleware
```

## Testing

- Use Vitest for unit tests
- Place test files alongside source files with `.test.ts` extension
- Run tests with `npm test`

## Common Patterns

### Infinite Scroll Lists

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = 
  api.post.list.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

const items = data?.pages.flatMap((page) => page.items) ?? [];
```

### Date Formatting

Use `formatRelativeTime()` from `~/lib/utils` for consistent relative dates.

### URL Signing for R2

Private R2 URLs need signing. Use `api.upload.getDownloadUrl.useQuery()` for attachments and cover images.
