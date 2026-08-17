# API-SYS-001 — API root docs

## Endpoint

`GET /`

## Description

API root docs.

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

Schema: `ApiRootResponse`

## HTTP Status Codes

200, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`functions/src/app.ts :: app.get("/")`

## Service

`None`

## Database Models

None

## API -> Schema -> Model Traceability

`API-SYS-001 -> None -> app.get("/") -> None -> None -> ApiRootResponse`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
