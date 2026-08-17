# Feature — Catalog

## APIs

- `API-TEMPLATE-001` `GET /v1/templates`
- `API-TEMPLATE-004` `GET /v1/templates/:templateId/public`
- `API-TEMPLATE-005` `GET /v1/templates/:templateId`
- `API-PROFILE-003` `GET /v1/profiles/:uid`

## Schemas
- See `../schemas/schema-map.md`.

## Models
- See `../models/model-map.md`.

## Frontend consumers
- API clients: `src/lib/api/templates.ts`, `src/lib/api/profiles.ts`
- Query hooks under `src/query/`
- Route pages under `src/routes/` consume these hooks.
