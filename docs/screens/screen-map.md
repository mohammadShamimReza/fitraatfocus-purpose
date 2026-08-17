# Studio screen map

Dashboard index redirects to `/dashboard/systems` (not a Screen ID). `/dashboard/$` is an in-dashboard 404 (not a Screen ID).

| ID | Screen | Feature | URL | Main implementation | Backend / API | Documentation |
|----|--------|---------|-----|---------------------|---------------|---------------|
| STUDIO-01 | Landing | Public catalog | `/` | `src/routes/(external)/index.tsx` | `GET /v1/templates` (catalog section) | [STUDIO-01-landing.md](./STUDIO-01-landing.md) |
| STUDIO-02 | Public Catalog | Public catalog | `/systems` | `src/routes/(external)/systems/index.tsx` | `GET /v1/templates` | [STUDIO-02-public-catalog.md](./STUDIO-02-public-catalog.md) |
| STUDIO-03 | Public System | Public catalog | `/systems/$templateId` | `src/routes/(external)/systems/$templateId.tsx` | `GET /v1/templates/:id/public`, `POST /v1/templates/:id/download` | [STUDIO-03-public-system.md](./STUDIO-03-public-system.md) |
| STUDIO-04 | Public Creator | Public catalog | `/creators/$creatorId` | `src/routes/(external)/creators/$creatorId.tsx` | `GET /v1/profiles/:uid`, `GET /v1/templates?creatorId=` | [STUDIO-04-public-creator.md](./STUDIO-04-public-creator.md) |
| STUDIO-05 | Login | Studio auth | `/auth/v1/login` | `src/routes/(main)/auth/v1/login/route.tsx` | Firebase Auth Google (no `/v1/auth/login`) | [STUDIO-05-login.md](./STUDIO-05-login.md) |
| STUDIO-06 | My Systems | System authoring | `/dashboard/systems` | `src/routes/(main)/dashboard/systems/index.tsx` | `GET /v1/templates/me` | [STUDIO-06-my-systems.md](./STUDIO-06-my-systems.md) |
| STUDIO-07 | New System | System authoring | `/dashboard/systems/new` | `src/routes/(main)/dashboard/systems/new/route.tsx` | `POST /v1/templates` | [STUDIO-07-new-system.md](./STUDIO-07-new-system.md) |
| STUDIO-08 | System Editor | System authoring | `/dashboard/systems/$templateId` | `src/routes/(main)/dashboard/systems/$templateId.tsx` | template PATCH/DELETE/publish + sections/tasks | [STUDIO-08-editor.md](./STUDIO-08-editor.md) |
| STUDIO-09 | Creator Profile | Creator profile | `/dashboard/profile` | `src/routes/(main)/dashboard/profile/route.tsx` | `GET/PATCH /v1/profiles/me` | [STUDIO-09-creator-profile.md](./STUDIO-09-creator-profile.md) |

Equivalent app screens: STUDIO-02 ↔ PURPOSE-01, STUDIO-03 ↔ PURPOSE-02, STUDIO-05 ↔ AUTH-01 (same Auth project, different UI).
