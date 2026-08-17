# API-TEMPLATE-013 — Reorder sections

## Endpoint

`POST /v1/templates/:templateId/sections/reorder`

## Description

Reorder sections.

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

Schema: `ReorderSectionsInput (zod)`

## Response

Schema: `PurposeTemplateDetail`

## HTTP Status Codes

200, 400, 401, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`reorderSections`

## Service

`reorderSections`

## Database Models

Template

## API -> Schema -> Model Traceability

`API-TEMPLATE-013 -> ReorderSectionsInput (zod) -> reorderSections -> reorderSections -> Template -> PurposeTemplateDetail`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
