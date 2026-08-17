# API-PROFILE-003 — Get public creator profile

## Endpoint

`GET /v1/profiles/:uid`

## Description

Get public creator profile.

## Authentication

Optional auth

## Authorization

- Owner checks and visibility checks are enforced in service layer (`requireOwned`, `canViewTemplate`, etc.) where applicable.

## Path Parameters

- See path placeholders in endpoint.

## Query Parameters

- `creatorId` only for `GET /v1/templates`.

## Request Headers

- `Authorization: Bearer <Firebase ID token>` for required/optional auth routes.

## Request Body

Schema: `ProfileUidPath`

## Response

Schema: `CreatorProfile`

## HTTP Status Codes

200, 400, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`getById`

## Service

`getPublicProfile`

## Database Models

User profile

## API -> Schema -> Model Traceability

`API-PROFILE-003 -> ProfileUidPath -> getById -> getPublicProfile -> User profile -> CreatorProfile`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
