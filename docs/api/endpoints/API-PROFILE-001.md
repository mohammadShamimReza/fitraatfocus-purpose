# API-PROFILE-001 — Get or create my creator profile

## Endpoint

`GET /v1/profiles/me`

## Description

Get or create my creator profile.

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

Schema: `None`

## Response

Schema: `CreatorProfile`

## HTTP Status Codes

200, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`profile.controller.ts :: getMine`

## Service

`profile.service.ts :: getOrCreateMyProfile`

## Database Models

User profile

## API -> Schema -> Model Traceability

`API-PROFILE-001 -> None -> getMine -> getOrCreateMyProfile -> User profile -> CreatorProfile`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
