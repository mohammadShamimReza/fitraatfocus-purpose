# API-TEMPLATE-012 — Delete section

## Endpoint

`DELETE /v1/templates/:templateId/sections/:sectionId`

## Description

Delete section.

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

Schema: `SectionPath`

## Response

Schema: `NoContent`

## HTTP Status Codes

204, 400, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`deleteSection`

## Service

`deleteSection`

## Database Models

Template

## API -> Schema -> Model Traceability

`API-TEMPLATE-012 -> SectionPath -> deleteSection -> deleteSection -> Template -> NoContent`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
