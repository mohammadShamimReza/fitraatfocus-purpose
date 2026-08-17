# API-TEMPLATE-004 — Get public template detail

## Endpoint

`GET /v1/templates/:templateId/public`

## Description

Get public template detail.

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

Schema: `TemplateIdPath`

## Response

Schema: `PublicTemplateDetail`

## HTTP Status Codes

200, 400, 404, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`getPublic`

## Service

`getPublicTemplate`

## Database Models

Template, CreatorProfile

## API -> Schema -> Model Traceability

`API-TEMPLATE-004 -> TemplateIdPath -> getPublic -> getPublicTemplate -> Template, CreatorProfile -> PublicTemplateDetail`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
