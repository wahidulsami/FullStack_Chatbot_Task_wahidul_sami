# AGENTS.md

Guidance for AI agents (and humans) working on this repository.

## Project layout

- `client/` — React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (base style, vega)
- `server/` — Express + Mongoose + Zod + JWT auth + bcrypt admin seed
- Path alias: `@/*` → `client/src/*` (configured in `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`)

## Commands

| Where   | Command | Purpose |
| ------- | ------- | ------- |
| client  | `npm run dev` | Vite dev server (proxies `/api` → `http://localhost:5000`) |
| client  | `npm run build` | `tsc -b && vite build` |
| client  | `npm run lint` | oxlint |
| server  | `npm run dev` | API on port 5000 |
| server  | `npm run seed:admin` | One-time admin creation (bcrypt, reads `ADMIN_*` from `.env`) |
| server  | `npx tsc --noEmit` | Typecheck |

## UI theme (shadcn preset `bQEKnj7Tv`)

Source of truth: `client/src/index.css` (CSS variables) — never hardcode hex/rgb colors in
components, always use these tokens (`bg-primary`, `text-muted-foreground`, `border-border`, ...).

Light mode:

| Token | oklch | hex |
| ----- | ----- | --- |
| `--primary` | `oklch(0.852 0.199 91.936)` | `#fdc700` (yellow) |
| `--primary-foreground` | `oklch(0.25 0.05 80)` | `#2e1e01` (near-black brown) |
| `--background` | `oklch(1 0 0)` | `#ffffff` |
| `--foreground` | `oklch(0.145 0 0)` | `#0a0a0a` |
| `--card` | `oklch(1 0 0)` | `#ffffff` |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `#f4f4f5` |
| `--muted` / `--accent` | `oklch(0.97 0 0)` | `#f5f5f5` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `#737373` |
| `--border` / `--input` | `oklch(0.922 0 0)` | `#e5e5e5` |
| `--ring` | `oklch(0.708 0 0)` | `#999999` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `#e7000b` |

Dark mode (`.dark`): `--primary: oklch(0.795 0.184 86.047)` (`#f0b100`) with the same
`--primary-foreground` as light mode,
`--background: oklch(0.145 0 0)`, `--card: oklch(0.205 0 0)`, borders `oklch(1 0 0 / 10%)`.

Charts: `--chart-1..5` (yellow → orange ramp). Sidebar tokens `--sidebar*` mirror card/accent.

Typography & shape:

- Body font: **IBM Plex Sans Variable** (`font-sans`), headings: **Inter Variable** (`font-heading`)
- Base radius: `--radius: 0.875rem` (14px) → `rounded-lg/xl` scale derived from it
- Status accents used in admin: `primary/10` (New), amber-500/10 (Contacted),
  violet-500/10 (In Progress), `muted` (Closed)

## Frontend conventions

- **UI components**: always from `@/components/ui/*` (shadcn). Do not hand-roll inputs, buttons,
  dialogs, tables, toasts. Add missing ones with `npx shadcn@latest add <name> -y`.
- **State**: Redux Toolkit only — no React Context for state. Store in `src/store/`
  (`authSlice`, `enquiriesSlice`), typed hooks in `src/store/hooks.ts`
  (`useAppDispatch`, `useAppSelector`, `selectSelectedEnquiry`).
- **Notifications**: `toast.add({ type, title, description })` from `@/components/ui/toast`
  (`type`: `success` | `error` | `warning` | `info` | `loading`). `<Toaster />` is mounted in `main.tsx`.
- **Forms**: react-hook-form + zod resolver; schemas live in `src/validation/schemas.ts`
  and must mirror the server Zod schemas in `server/src/lib/validation.ts`.
- **API**: single axios instance in `src/services/api.ts` (adds Bearer token, refreshes session
  on 401, `withCredentials: true`). Feature calls live in `src/services/*Service.ts`.
- Route guards: `RequireAuth` (`src/components/RequireAuth.tsx`).

## Backend notes

- Admin seed: `server/src/scripts/seedAdmin.ts` (reads `ADMIN_NAME`, `ADMIN_EMAIL`,
  `ADMIN_PASSWORD` from `server/.env` — never commit `.env`, never send these to the client).
- Admin enquiry routes (`GET /`, `GET /:id`, `PATCH /:id/status`, `DELETE /:id`) are protected by
  `protect` + `adminOnly`. `POST /api/enquiries` is public.
- Passwords: bcrypt via the `User` model pre-save hook (`select: false`, stripped in `toJSON`).
