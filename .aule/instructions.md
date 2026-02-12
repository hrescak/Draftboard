# Aule Runtime Instructions

Generated: 2026-02-09T22:19:36Z
Source: Codex CLI

## Project signals
- stack: Next.js
- detected lockfiles:
- package-lock.json
- package managers found in PATH: npm

## Commands to run
- install: `npm install`
- dev server: `npm run dev`

## Why
The project has a package-lock.json and npm is the available package manager, so npm is the correct and safest choice. npm install will install dependencies and run postinstall (Prisma generate), and npm run dev maps directly to the configured Next.js dev script.

## Alternatives
- npm ci
- npx next dev --turbopack
- npx next dev