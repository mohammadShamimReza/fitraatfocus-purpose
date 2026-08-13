# Fitraat Focus — Purpose System Studio

Creator studio for **Fitraat Focus**. Authors write purpose-driven todo systems (libraries of sections and tasks). People in the Fitraat Focus app fork their own copy and use it.

The UI is built on a [TanStack Start](https://tanstack.com/start) admin dashboard (shadcn/ui, Tailwind CSS v4). The product surface today is the studio: sign in, create systems, and edit the library.

## What you can do

- Sign in with **Google** or **email and password** (same Firebase project as the Fitraat Focus app)
- Create a system with a title, purpose, story, description, and category (exam, career, study, craft, health, other)
- Organize the library into **sections** and **tasks**
- Set task priority, tags, notes, and estimated minutes
- Mark a system **draft** or **published**
- Switch theme and layout from the dashboard header

Systems are stored **on this device** in `localStorage`, keyed by signed-in user. Cloud sync is not wired yet; `VITE_FUNCTIONS_URL` is reserved for a later API.

## Screens

| Path | Purpose |
| --- | --- |
| `/` | Redirects to the systems list |
| `/auth/v1/login` | Sign in |
| `/auth/v1/register` | Create an account |
| `/dashboard/systems` | List your systems |
| `/dashboard/systems/new` | Create a system |
| `/dashboard/systems/$templateId` | Edit metadata, sections, and tasks |

Dashboard routes require a signed-in session. Unauthenticated visits are sent to login.

## Tech stack

- **App**: TanStack Start, TanStack Router, React 19, TypeScript
- **Data**: TanStack Query, local template repository
- **Auth**: Firebase Authentication
- **UI**: Tailwind CSS v4, shadcn/ui, React Hook Form, Zod
- **Tooling**: Vite, Nitro, Biome, Husky

## Getting started

### Prerequisites

- Node.js 20+
- npm
- Firebase web credentials for the shared Fitraat Focus project

### Install and run

```bash
git clone https://github.com/mohammadShamimReza/fitraatfocustodotemplate.git
cd fitraatfocustodotemplate
npm install
cp .env.example .env
```

Fill in `.env` (see [Environment](#environment)), then:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with Biome |
| `npm run format` | Format with Biome |
| `npm run check` | Lint, format, and organize imports |
| `npm run check:fix` | Apply Biome fixes |
| `npm run generate-routes` | Regenerate the TanStack Router tree |

## Environment

Copy `.env.example` to `.env`. Values are read on the client (`VITE_` prefix).

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FUNCTIONS_URL=
```

If Firebase is missing, login shows a configuration alert. `VITE_FUNCTIONS_URL` is optional until cloud persistence is enabled.

## Project layout

Feature code stays next to the route that owns it. Folders prefixed with `-` (for example `-components`) are excluded from route generation.

```text
src
├── config                  # App name and meta
├── lib
│   ├── auth                # Firebase session, guards, display name
│   ├── firebase            # Client SDK and env config
│   ├── functions           # HTTP client for a future backend
│   └── templates           # Local store and repository
├── navigation              # Dashboard sidebar
├── query                   # TanStack Query hooks for systems
├── routes
│   ├── (external)          # Public entry (redirects into studio)
│   └── (main)
│       ├── auth            # Login and register
│       └── dashboard
│           └── systems     # List, create, and editor
└── types/template.ts       # System, section, and task types
```

`src/routeTree.gen.ts` is generated. Do not edit it by hand.

## Data model (current)

A **system** (`PurposeTemplate`) has:

- Identity: title, purpose, story, description, category, tags
- Ownership: creator uid and display name
- Status: `draft` or `published`
- Visibility: `public`, `unlisted`, or `private`
- **Sections**: ordered groups with a title and description
- **Tasks**: title, notes, priority (`low` / `medium` / `high`), tags, estimated minutes, assigned section

Local data is stored under `fitraat.studio.templates.<uid>`. Clearing site data or switching browsers removes those systems.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for layout conventions and the contribution flow. Follow [AGENTS.md](AGENTS.md) when working in this repo with coding agents.
