# API-TEMPLATE-001 — List public templates

## Endpoint

`GET /v1/templates`

## Description

List public templates.

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

Schema: `TemplateListQuery`

## Response

Schema: `CatalogTemplate[]`

## HTTP Status Codes

200, 401, 500

## Errors

- Validation errors (Zod) return `400` with first issue message.
- `HttpError` from service layer maps to status in middleware.
- Unhandled errors return `500`.

## Controller / Handler

`template.controller.ts :: listPublic`

## Service

`template.service.ts :: listPublicTemplates / listTemplatesByCreator`

## Database Models

Template, User profile summary

## API -> Schema -> Model Traceability

`API-TEMPLATE-001 -> TemplateListQuery -> listPublic -> listPublicTemplates / listTemplatesByCreator -> Template, User profile summary -> CatalogTemplate[]`

## Source

- `functions/src/routes/`
- `functions/src/controllers/`
- `functions/src/services/`
