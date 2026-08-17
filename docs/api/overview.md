# API overview — Cloud Function `studio`

Base URL (production): `https://us-central1-fitraat-focus.cloudfunctions.net/studio`  
Emulator: `http://127.0.0.1:5001/<project-id>/us-central1/studio`  
Override: `VITE_FUNCTIONS_URL`

Client: `src/lib/api/http.ts`. Path constants: `src/lib/api/paths.ts`.

Auth: optional or required per route (`optionalAuth` / `requireAuth`).

This is **not** the app `api` function.

| Method | Path | Auth | Controller | Service | Screens |
|--------|------|------|------------|---------|---------|
| GET | `/` | public | inline `app.ts` | — | — |
| GET | `/v1/health` | public | inline | — | — |
| GET | `/v1/templates` | optional | `listPublic` | `template.service` | STUDIO-01, STUDIO-02, STUDIO-04 |
| GET | `/v1/templates/me` | require | `listMine` | | STUDIO-06 |
| POST | `/v1/templates` | require | `create` | | STUDIO-07 |
| GET | `/v1/templates/:templateId/public` | optional | `getPublic` | | STUDIO-03 |
| GET | `/v1/templates/:templateId` | optional | `getOne` | | STUDIO-03, STUDIO-08 |
| PATCH | `/v1/templates/:templateId` | require | `update` | | STUDIO-08 |
| DELETE | `/v1/templates/:templateId` | require | `remove` | | STUDIO-08 |
| POST | `/v1/templates/:templateId/publish` | require | `publish` | | STUDIO-08 |
| POST | `/v1/templates/:templateId/download` | require | `download` | `purpose-track.service` | STUDIO-03 |
| POST | `/v1/templates/:templateId/sections` | require | `createSection` | | STUDIO-08 |
| POST | `/v1/templates/:templateId/sections/reorder` | require | `reorderSections` | | STUDIO-08 |
| PATCH/DELETE | `/v1/templates/:templateId/sections/:sectionId` | require | update/delete section | | STUDIO-08 |
| POST | `/v1/templates/:templateId/tasks` | require | `createTask` | | STUDIO-08 |
| POST | `/v1/templates/:templateId/tasks/reorder` | require | `reorderTasks` | | STUDIO-08 |
| PATCH/DELETE | `/v1/templates/:templateId/tasks/:taskId` | require | update/delete task | | STUDIO-08 |
| GET/PATCH | `/v1/profiles/me` | require | `getMine` / `updateMine` | `profile.service` | STUDIO-09 |
| GET | `/v1/profiles/:uid` | optional | `getById` | | STUDIO-04, STUDIO-03 |

Files: `functions/src/routes/template.routes.ts`, `profile.routes.ts`.
