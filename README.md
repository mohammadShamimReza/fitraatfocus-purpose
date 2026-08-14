# Fitraat Focus — Purpose System Studio

Creator studio for **Fitraat Focus**. Authors write purpose-driven todo systems (libraries of sections and tasks). People in the Fitraat Focus app take a copy and run the work.

The UI is built on [TanStack Start](https://tanstack.com/start) (shadcn/ui, Tailwind CSS v4). Production hosting is **Vercel**. The API is the Firebase HTTPS function `studio`.

## What you can do

- Sign in with **Google** (same Firebase project as the Fitraat Focus app)
- Create a system with a title, purpose, story, description, and category
- Organize the library into **sections** and **tasks**
- Set task priority, tags, notes, and estimated minutes
- Mark a system **draft** or **published** (publish requires at least one task)
- Public catalog and creator pages for published systems

Systems and creator profiles are stored in Firestore through `functions/`. Local `npm run dev` talks to the Functions emulator; Vercel production talks to the deployed `studio` function.

## Screens

| Path | Purpose |
| --- | --- |
| `/` | Public landing |
| `/systems` | Public catalog |
| `/systems/$templateId` | Public system |
| `/creators/$creatorId` | Public creator |
| `/auth/v1/login` | Google sign-in |
| `/dashboard/systems` | Your systems |
| `/dashboard/systems/new` | Create a system |
| `/dashboard/systems/$templateId` | Edit metadata, sections, and tasks |
| `/dashboard/profile` | Creator profile |

Dashboard routes require a signed-in session. Unauthenticated visits are sent to login.

## Tech stack

- **App**: TanStack Start, TanStack Router, React 19, TypeScript
- **Data**: TanStack Query and Firebase Functions HTTP API (`/v1`)
- **Auth**: Firebase Authentication (Google)
- **Backend**: Firebase Cloud Functions (Express, MVC) and Firestore
- **UI**: Tailwind CSS v4, shadcn/ui, React Hook Form, Zod
- **Tooling**: Vite, Nitro, Biome, Husky, Firebase emulators
- **Hosting**: Vercel (web) and Firebase Functions (API)

## Getting started

### Prerequisites

- Node.js 20+ (Cloud Functions use Node 24)
- npm
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm i -g firebase-tools`) for emulators and function deploy
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
npm run emulators
```

In another terminal:

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
| `npm run functions:deploy` | Lint, build, and deploy the `studio` function |
| `npm run emulators` | Run Firestore and Functions emulators (Auth stays production) |

## Deploy

### Web (Vercel)

1. Import this GitHub repo in Vercel. Framework preset should be **TanStack Start**.
2. Set the `VITE_FIREBASE_*` and `VITE_FUNCTIONS_REGION` values from `.env.example` in **Project Settings → Environment Variables** (Production). Leave `VITE_FUNCTIONS_URL` unset so the site calls the deployed `studio` function.
3. Add the production domain (for example `studio.fitraatfocus.fitraat.com`) to **Firebase Authentication → Settings → Authorized domains**.
4. Point the custom domain at Vercel.

Do not start the Auth emulator. Google sign-in uses production Auth.

### Functions (Firebase)

Studio and the Fitraat Focus app share the **same Firebase project** (`fitraat-focus`). They are two HTTPS functions in two codebases, so one deploy does not replace the other:

| Repo | Codebase | Function | URL |
| --- | --- | --- | --- |
| `fitraatfocusapp` | `default` | `api` | `https://us-central1-fitraat-focus.cloudfunctions.net/api` |
| `fitraatfocustodotemplate` | `studio` | `studio` | `https://us-central1-fitraat-focus.cloudfunctions.net/studio` |

From this repo:

```bash
npm run functions:install
npm run functions:deploy
```

That runs `firebase deploy --only functions:studio`. It updates `studio` only. It does not delete or overwrite `api`. Deploy `api` from the app repo with `npm --prefix functions run deploy` (`--only functions:default`).

Predeploy runs `lint` then `build`, same as the Fitraat Focus app. Do not add Firestore rules here — production rules, Auth, and Storage live in the Fitraat Focus app and are shared. After deploy, `GET https://us-central1-fitraat-focus.cloudfunctions.net/studio/v1/health` should return `{ "ok": true, "service": "fitraat-studio", "version": "v1" }`.

## Cloud Functions

The API lives in `functions/` as a single HTTPS function named `studio` (not `api`, which the Fitraat Focus app already deploys). Layout is MVC:

```text
functions/src
├── index.ts              # export const studio = onRequest(...)
├── app.ts                # Express app
├── config/               # Admin SDK and collection names
├── routes/               # URL wiring (/v1)
├── controllers/          # HTTP handlers
├── services/             # Firestore + business rules
├── models/               # Types and mapping helpers
├── validators/           # Zod request bodies
├── middleware/           # Auth and errors
└── lib/                  # Shared HTTP helpers
```

Client Firestore access is denied. The Admin SDK in Functions is the only writer.

Firebase targeting:

- `npm run dev` → `http://127.0.0.1:5001/fitraat-focus/us-central1/studio`
- production → `https://us-central1-fitraat-focus.cloudfunctions.net/studio`
- Google sign-in always uses **production** Auth (do not start the Auth emulator, or production ID tokens return 401)

Set `VITE_FUNCTIONS_URL` only if you need to override the auto target.

## Environment

Copy `.env.example` to `.env`. Values are read on the client (`VITE_` prefix).

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FUNCTIONS_REGION=us-central1
```

If Firebase is missing, login shows a configuration alert. Leave `VITE_FUNCTIONS_URL` unset unless you need a manual override.

## Project layout

Feature code stays next to the route that owns it. Folders prefixed with `-` (for example `-components`) are excluded from route generation.

```text
functions                       # Cloud Functions MVC API
src
├── config                      # App name and meta
├── lib
│   ├── auth                    # Firebase session, guards, display name
│   ├── firebase                # Client SDK and env config
│   ├── functions               # HTTP client for Cloud Functions
│   └── templates               # Category labels and formatting
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

Systems live in Firestore `templates`. Creator extras live on `users/{uid}.creator`. The browser does not keep a product data copy.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for layout conventions and the contribution flow. Follow [AGENTS.md](AGENTS.md) when working in this repo with coding agents.
