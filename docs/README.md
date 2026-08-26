# Purpose System Studio — developer guide

This repository is the **Fitraat Focus Purpose System Studio**: creators author and publish purpose systems. End users run copies in the Fitraat Focus app.

Sibling products: [cross-repo-map.md](./cross-repo-map.md).

Production QA (manual test + code review of all three apps): [../../qa/README.md](../../qa/README.md).

## Product architecture (this repo)

```
Studio web (TanStack Start / Vercel)
        │  Bearer Firebase ID token
        ▼
HTTPS function `studio`  (functions/)
        │
        ▼
Firestore: templates, users, purposeTracks
```

| Layer | Location |
|-------|----------|
| Routes / pages | `src/routes/` |
| API client | `src/lib/api/` |
| React Query | `src/query/` |
| Auth | `src/lib/firebase/`, auth provider in `__root.tsx` |
| Backend | `functions/src/` (Express MVC) |

Stack: TanStack Start, TanStack Router, TanStack Query, Zustand (UI prefs only), Firebase Auth (Google), Vercel + Cloud Functions.

## Where the other codebases are

| Product | Repo | Local path (if siblings) |
|---------|------|--------------------------|
| This studio | `fitraatfocustodotemplate` | `.` |
| App | `fitraatfocusapp` | `../fitraatfocusapp` |
| Marketing | `fitraatfocuswebsite` | `../fitraatfocuswebsite` |

## How Screen IDs work

Studio IDs use the `STUDIO-` prefix. App catalog is **PURPOSE-01**, not STUDIO-02 — they are equivalent concepts, different products. See [cross-repo-map.md](./cross-repo-map.md).

- Registry: [screens/screen-map.md](./screens/screen-map.md)
- Features: [features/](./features/)
- Flows: [flows/](./flows/)
- APIs: [api/overview.md](./api/overview.md)
- Architecture: [architecture/overview.md](./architecture/overview.md)

## How to find a screen

1. [screens/screen-map.md](./screens/screen-map.md)
2. Open the `src/routes/...` file (JSDoc `Screen: STUDIO-0x`)
3. Open `docs/screens/STUDIO-0x-*.md`

Search for `Screen: STUDIO-08` to jump to the editor.

## How to find the same screen on another platform

PURPOSE-01 / PURPOSE-02 in the app consume what STUDIO-02 / STUDIO-03 publish. Download: STUDIO-03 or STUDIO-08 publish path → `purposeTracks` → PURPOSE-03.

## How to find the backend API

[api/overview.md](./api/overview.md). Client paths: `src/lib/api/paths.ts`. Function name is `studio`, not `api`.

## How to add a new screen

1. Feature (public catalog, authoring, profile, …)
2. Next ID (`STUDIO-10`)
3. Row in `screen-map.md`
4. `docs/screens/STUDIO-10-kebab.md`
5. JSDoc on the route module only
6. Update flows/features
7. Document APIs
8. Sync `cross-repo-map.md` in all three repos if the concept is shared

## Discovering routes

```bash
node scripts/list-routes.mjs
```

## How to avoid breaking the mapping

Do not reuse app IDs (`PURPOSE-01`) for studio pages. Do not put Screen IDs on shadcn `src/components/ui/` primitives.
