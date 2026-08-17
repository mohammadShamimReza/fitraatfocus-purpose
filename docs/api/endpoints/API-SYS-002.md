# API-SYS-002 — Health check

## Endpoint

`GET /v1/health`

## Description

Health check.

## Authentication

Public

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

Schema: `HealthResponse`

## HTTP Status Codes

200, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`functions/src/routes/index.ts :: apiRouter.get("/health")`

## Service

`None`

## Database Models

None

## API -> Schema -> Model Traceability

`API-SYS-002 -> None -> apiRouter.get("/health") -> None -> None -> HealthResponse`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
