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

Systems are stored in `localStorage` until `VITE_FUNCTIONS_URL` is set. With that URL, the studio talks to the Firebase HTTP function in `functions/` (Firestore via the Admin SDK).

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
- **Data**: TanStack Query; local repository or Firebase Functions HTTP API
- **Auth**: Firebase Authentication (Google)
- **Backend**: Firebase Cloud Functions (Express, MVC) and Firestore
- **UI**: Tailwind CSS v4, shadcn/ui, React Hook Form, Zod
- **Tooling**: Vite, Nitro, Biome, Husky, Firebase emulators

## Getting started

### Prerequisites

- Node.js 20+
- npm
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm i -g firebase-tools`) for emulators and deploy
- Firebase web credentials for the shared Fitraat Focus project

### Install and run

```bash
git clone https://github.com/mohammadShamimReza/fitraatfocustodotemplate.git
cd fitraatfocustodotemplate
npm install
npm run functions:install
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
| `npm run functions:install` | Install Cloud Functions dependencies |
| `npm run functions:build` | Compile `functions/src` to `functions/lib` |
| `npm run emulators` | Run Auth, Firestore, and Functions emulators |

## Cloud Functions

The API lives in `functions/` as a single HTTPS function named `api`. Layout is MVC:

```text
functions/src
├── index.ts              # export const api = onRequest(...)
├── app.ts                # Express app
├── config/               # Admin SDK and collection names
├── routes/               # URL wiring
├── controllers/          # HTTP handlers
├── services/             # Firestore + business rules
├── models/               # Types and mapping helpers
├── validators/           # Zod request bodies
├── middleware/           # Auth and errors
└── lib/                  # Shared HTTP helpers
```

Client Firestore access is denied in `firestore.rules`. The Admin SDK in Functions is the only writer.

Local emulator URL (match `.firebaserc` project id):

```bash
VITE_FUNCTIONS_URL=http://127.0.0.1:5001/fitraat-focus/us-central1/api
```

Then `GET /health` should return `{ "data": { "ok": true } }`. Leave `VITE_FUNCTIONS_URL` empty to keep using `localStorage`.

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
VITE_FUNCTIONS_REGION=us-central1
```

If Firebase is missing, login shows a configuration alert. Leave `VITE_FUNCTIONS_URL` empty for `localStorage`; set it to the emulator or deployed function URL to persist in Firestore.

## Project layout

Feature code stays next to the route that owns it. Folders prefixed with `-` (for example `-components`) are excluded from route generation.

```text
functions                       # Cloud Functions MVC API
src
├── config                      # App name and meta
├── lib
│   ├── auth                    # Firebase session, guards, display name
│   ├── firebase                # Client SDK and env config
│   ├── functions               # HTTP client (remote when VITE_FUNCTIONS_URL is set)
│   └── templates               # Local store fallback
├── navigation                  # Dashboard sidebar
├── query                       # TanStack Query hooks for systems
├── routes
│   ├── (external)              # Public catalog and landing
│   └── (main)
│       ├── auth                # Google sign-in
│       └── dashboard
│           └── systems         # List, create, and editor
└── types                       # System, section, task, and profile types
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

Published systems are stored in Firestore (`templates`, `profiles`) when Functions are enabled. Otherwise local data is stored under `fitraat.studio.templates.<uid>`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for layout conventions and the contribution flow. Follow [AGENTS.md](AGENTS.md) when working in this repo with coding agents.
