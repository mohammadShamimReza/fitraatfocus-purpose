# Architecture — Purpose System Studio

## Web

| | |
|--|--|
| Framework | TanStack Start + Vite 8, React 19 |
| Routing | TanStack Router file routes in `src/routes/` (`routeTree.gen.ts`) |
| Components | Route `-components/` plus `src/components/` (brand, shadcn/ui) |
| State | TanStack Query for templates/profiles; Zustand for theme/sidebar prefs; Auth React context |
| API | `src/lib/api/http.ts` → HTTPS function `studio` |
| Authentication | Firebase Auth Google popup; `RequireAuth` on `/dashboard/*` |

Public layout: `src/routes/(external)/route.tsx` (header/footer).  
Dashboard layout: `src/routes/(main)/dashboard/route.tsx`.

There is **no mobile app** in this repo.

```
Browser
   │
   ▼
TanStack Start (Vercel)
   │
   ▼
Cloud Function `studio`  /v1/templates, /v1/profiles
   │
   ▼
Firestore templates / users / purposeTracks
```

## Backend

| | |
|--|--|
| Framework | Firebase Cloud Functions v2 + Express |
| Entry | `functions/src/index.ts` exports `studio` |
| Routing | `functions/src/routes/` |
| Controllers | `functions/src/controllers/template.controller.ts`, `profile.controller.ts` |
| Services | `template.service.ts`, `profile.service.ts`, `purpose-track.service.ts` |
| Models | `template.model.ts`, `profile.model.ts`, `purpose-track.model.ts` |
| Database | Firestore `templates`, `users`, `purposeTracks` |
| Authentication | `functions/src/middleware/auth.middleware.ts` (`requireAuth` / `optionalAuth`) |

Download copies a published template into `purposeTracks` for the signed-in user. The Fitraat Focus **app** then uses function `api` to read those tracks.

Production web host in marketing CTAs: `https://purpose.fitraatfocus.com`. README also mentions `studio.fitraatfocus.fitraat.com` — **Needs verification**.
