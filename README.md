# Draftboard

A modern internal social network for sharing UI designs within organizations.

## Features

- **Feed**: Reverse chronological feed of posts with list and grid views
- **Rich Editor**: Lexical-based editor with markdown shortcuts, @mentions, slash commands
- **Attachments**: Support for images, videos, files, Figma links, and Loom recordings
- **Projects**: Organize posts into projects with many-to-many relationships
- **Comments**: Threaded comments with 2 levels of depth, attachment-specific comments
- **Reactions**: Like, wow, cool reactions plus custom emoji support
- **Notifications**: Real-time notifications for comments, replies, and reactions

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **API**: tRPC
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (Credentials provider)
- **Storage**: Cloudflare R2
- **UI**: shadcn/ui + Tailwind CSS v4
- **Editor**: Lexical
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudflare R2 bucket (for file uploads)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - R2 credentials

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudflare R2
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME="draftboard"
R2_PUBLIC_URL=""
```

## Development

```bash
# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Open Prisma Studio
npm run db:studio
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── (main)/            # Protected pages
│   └── api/               # API routes
├── components/
│   ├── editor/            # Lexical editor
│   ├── feed/              # Feed components
│   ├── post/              # Post components
│   ├── comments/          # Comment components
│   ├── reactions/         # Reaction components
│   ├── projects/          # Project components
│   └── ui/                # shadcn components
├── server/
│   ├── api/               # tRPC routers
│   ├── auth.ts            # NextAuth config
│   └── db.ts              # Prisma client
├── lib/
│   ├── r2.ts              # Cloudflare R2 utilities
│   ├── utils.ts           # Utility functions
│   └── validators.ts      # Zod schemas
└── prisma/
    └── schema.prisma      # Database schema
```

## Deployment

This project is designed to be deployed on Vercel:

1. Connect your repository to Vercel
2. Add environment variables
3. Deploy

## License

MIT
