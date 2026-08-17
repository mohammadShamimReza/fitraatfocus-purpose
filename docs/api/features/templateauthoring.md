# Feature — TemplateAuthoring

## APIs

- `API-TEMPLATE-002` `GET /v1/templates/me`
- `API-TEMPLATE-003` `POST /v1/templates`
- `API-TEMPLATE-006` `PATCH /v1/templates/:templateId`
- `API-TEMPLATE-007` `DELETE /v1/templates/:templateId`
- `API-TEMPLATE-008` `POST /v1/templates/:templateId/publish`
- `API-TEMPLATE-010` `POST /v1/templates/:templateId/sections`
- `API-TEMPLATE-011` `PATCH /v1/templates/:templateId/sections/:sectionId`
- `API-TEMPLATE-012` `DELETE /v1/templates/:templateId/sections/:sectionId`
- `API-TEMPLATE-013` `POST /v1/templates/:templateId/sections/reorder`
- `API-TEMPLATE-014` `POST /v1/templates/:templateId/tasks`
- `API-TEMPLATE-015` `PATCH /v1/templates/:templateId/tasks/:taskId`
- `API-TEMPLATE-016` `DELETE /v1/templates/:templateId/tasks/:taskId`
- `API-TEMPLATE-017` `POST /v1/templates/:templateId/tasks/reorder`

## Schemas
- See `../schemas/schema-map.md`.

## Models
- See `../models/model-map.md`.

## Frontend consumers
- API clients: `src/lib/api/templates.ts`, `src/lib/api/profiles.ts`
- Query hooks under `src/query/`
- Route pages under `src/routes/` consume these hooks.
