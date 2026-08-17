# API-TEMPLATE-003 — Create template

## Endpoint

`POST /v1/templates`

## Description

Create template.

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

Schema: `CreateTemplateInput (zod)`

## Response

Schema: `PurposeTemplate`

## HTTP Status Codes

201, 400, 401, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`create`

## Service

`createTemplate`

## Database Models

Template

## API -> Schema -> Model Traceability

`API-TEMPLATE-003 -> CreateTemplateInput (zod) -> create -> createTemplate -> Template -> PurposeTemplate`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
