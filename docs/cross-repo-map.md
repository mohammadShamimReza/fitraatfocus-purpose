# Cross-repo product map

Fitraat Focus is three GitHub repositories that share Firebase project `fitraat-focus`. This file is copied into each repo so a developer opening any one of them can see the full product.

| Product | Repository | Workspace path | Role |
|---------|------------|----------------|------|
| Fitraat Focus app | [fitraatfocusapp](https://github.com/mohammadShamimReza/fitraatfocusapp) | `fitraatfocusapp/` | End-user deep-work app (iOS, Android, and web). Same Expo Router tree on all platforms. Backend: Cloud Function `api`. |
| Purpose System Studio | [fitraatfocustodotemplate](https://github.com/mohammadShamimReza/fitraatfocustodotemplate) | `fitraatfocustodotemplate/` | Creator studio. Authors publish purpose systems. Backend: Cloud Function `studio`. |
| Marketing site | [fitraatfocuswebsite](https://github.com/mohammadShamimReza/fitraatfocuswebsite) | `fitraatfocuswebsite/` | Landing, blog, legal, donate, account lookup. Next.js `POST /api/delete-account` only. |

The workspace folder that contains all three is **not** a git repository.

```
PRODUCT
   │
   ├── FEATURE
   └── USER FLOW
          │
       SCREEN ID  (stable product concept)
          │
   ┌──────┼──────┐
  App   Studio  Marketing
   │      │        │
 Route  URL     Next route
   │      │        │
   └── API / Firebase ──┘
```

## How Screen IDs work

- An ID names a **product screen**, not a file. `FOCUS-01` stays `FOCUS-01` if `home.tsx` is renamed.
- **App mobile and app web share one ID.** They are the same Expo implementation (`src/app`), exported to `app.fitraatfocus.com`.
- Related screens on another product get a **different** ID and are linked below. Do not reuse `PURPOSE-01` for the studio catalog.

Prefixes:

- App: `AUTH`, `ONBOARDING`, `TODO`, `PURPOSE`, `FOCUS`, `SESSION`, `RITUAL`, `STATS`, `SETTINGS`, `SUPPORT`, `CONTENT`
- Studio: `STUDIO`
- Marketing: `MKT`

## Where to look

| Need | Open |
|------|------|
| App screens | `fitraatfocusapp/docs/screens/screen-map.md` |
| Studio screens | `fitraatfocustodotemplate/docs/screens/screen-map.md` |
| Marketing screens | `fitraatfocuswebsite/docs/screens/screen-map.md` |
| App APIs (`api` function) | `fitraatfocusapp/docs/api/overview.md` |
| Studio APIs (`studio` function) | `fitraatfocustodotemplate/docs/api/overview.md` |
| Marketing API | `fitraatfocuswebsite/docs/api/overview.md` |

## Equivalent screens (same concept, different IDs)

| Concept | App | Studio | Marketing |
|---------|-----|--------|-----------|
| Google sign-in | AUTH-01 Welcome | STUDIO-05 Login | — |
| Purpose catalog | PURPOSE-01 Catalog | STUDIO-02 Public Catalog | — (blog guide `how-to-use-purpose-systems` is content, not a screen) |
| System / template detail | PURPOSE-02 Template Detail | STUDIO-03 Public System | — |
| Donate | SETTINGS-08 Donate | — | MKT-07 Donate |
| Account deletion | SUPPORT-04 Data Deletion (in-app ticket) | — | MKT-06 Delete Account (public lookup; does not delete) |
| Focus practice | FOCUS-01 + SESSION-* | — | MKT-01 landing describes it; blog `how-to-use-focus-sessions` is content |
| Focus learn program | FOCUS-07 / FOCUS-08 | — | — |
| Todo planner | TODO-01 | — | blog `how-to-use-todo` is content |
| Todo learn program | TODO-03 / TODO-04 | — | — |

## Data bridge (verified)

Studio `POST /v1/templates/:templateId/download` (function `studio`) copies a published template into Firestore `purposeTracks`. The app then reads/writes that copy through function `api` (`GET /v1/purpose/mine`, `GET/POST /v1/purpose/tracks`, `PATCH /v1/purpose/tracks/:trackId/tasks/:taskId`).

Same Firebase Auth users can sign into the app and the studio. Marketing delete-account lookup checks Auth + Firestore `users.email` and does **not** call `api` or `studio`.

## Hosts (as found in code)

| Surface | URL in code | Notes |
|---------|-------------|-------|
| App web | `https://app.fitraatfocus.com` | Marketing CTAs also use `/welcome` and `/welcome/welcome`. **Needs verification** which path AuthGuard actually serves. |
| Studio | `https://purpose.fitraatfocus.com` | README also mentions `studio.fitraatfocus.fitraat.com`. **Needs verification** of the live production host. |
| Marketing | `https://fitraatfocus.com` | `layout.tsx` / `robots.ts`. Sitemap uses `https://fitraatfocus.fitraat.com`. **Needs verification**. |
| Play Store | `https://play.google.com/store/apps/details?id=com.fitraatfocus` | In marketing landing. |
| App Store | — | No URL in marketing code. Terms mention Apple billing. **Needs verification**. |

## Features that exist on only one product

| Feature | Where |
|---------|-------|
| Focus session, prep pillars, rituals, stats, leaderboard | App only |
| Guest trial (one unsigned Focus session) | App only |
| Onboarding diagnostic | App only |
| Create / edit / publish purpose systems | Studio only |
| Public creator profile pages | Studio only |
| Blog / SEO guides | Marketing only |
| Privacy / terms pages | Marketing only (`/privacy`, `/terms`) |
| In-app support tickets | App only (`POST /v1/support/tickets`) |

## Screens not given IDs

These exist in code but are not product screens in this map:

- App `/` loading spinner, `+html.tsx`
- App redirect stubs: `(focus)/setup/intention`, `(focus)/setup/resources`, `session/celebration`
- App unused hidden tabs: `(app)/stress`, `(app)/motivation` (timer uses the session copies)
- Studio dashboard index redirect and `/dashboard/$` 404
- Individual marketing blog posts (covered by MKT-03)

When you add a screen, assign the next ID in that prefix, add it to that repo’s `screen-map.md`, add a screen markdown file, add a JSDoc on the entry file, update the relevant flow, and copy any cross-product link into **all three** `cross-repo-map.md` files.
