# API-TEMPLATE-010 — Create section

## Endpoint

`POST /v1/templates/:templateId/sections`

## Description

Create section.

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

Schema: `CreateSectionInput (zod)`

## Response

Schema: `TemplateSection`

## HTTP Status Codes

201, 400, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`createSection`

## Service

`createSection`

## Database Models

Template

## API -> Schema -> Model Traceability

`API-TEMPLATE-010 -> CreateSectionInput (zod) -> createSection -> createSection -> Template -> TemplateSection`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
