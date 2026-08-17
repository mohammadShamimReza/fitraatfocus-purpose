# API-TEMPLATE-002 — List my templates

## Endpoint

`GET /v1/templates/me`

## Description

List my templates.

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

Schema: `PurposeTemplate[]`

## HTTP Status Codes

200, 401, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`listMine`

## Service

`listMyTemplates`

## Database Models

Template

## API -> Schema -> Model Traceability

`API-TEMPLATE-002 -> None -> listMine -> listMyTemplates -> Template -> PurposeTemplate[]`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
