# Feature — CreatorProfile

## APIs

- `API-PROFILE-001` `GET /v1/profiles/me`
- `API-PROFILE-002` `PATCH /v1/profiles/me`

## Schemas
- See `../schemas/schema-map.md`.

## Models
- See `../models/model-map.md`.

## Frontend consumers
- API clients: `src/lib/api/templates.ts`, `src/lib/api/profiles.ts`
- Query hooks under `src/query/`
- Route pages under `src/routes/` consume these hooks.
