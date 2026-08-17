# API-PROFILE-002 — Update my creator profile

## Endpoint

`PATCH /v1/profiles/me`

## Description

Update my creator profile.

## Authentication

Required

## Authorization

- Owner checks and visibility checks are enforced in service layer (`requireOwned`, `canViewTemplate`, etc.) where applicable.

## Path Parameters

- See path placeholders in endpoint.

## Query Parameters

- `creatorId` only for `GET /v1/templates`.

## Request Headers

- `Authorization: Bearer <Firebase ID token>` for required/optional auth routes.

## Request Body

Schema: `UpdateProfileInput (zod)`

## Response

Schema: `CreatorProfile`

## HTTP Status Codes

200, 400, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`updateMine`

## Service

`updateMyProfile`

## Database Models

User profile + Template creatorName fanout

## API -> Schema -> Model Traceability

`API-PROFILE-002 -> UpdateProfileInput (zod) -> updateMine -> updateMyProfile -> User profile + Template creatorName fanout -> CreatorProfile`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
