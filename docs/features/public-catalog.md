# Public catalog

## What it does

Lets anyone browse published purpose systems and creator pages. Signed-in users can download a copy into the Fitraat Focus app.

## Screens

- STUDIO-01 Landing
- STUDIO-02 Public Catalog
- STUDIO-03 Public System
- STUDIO-04 Public Creator

## APIs

- `GET /v1/templates`
- `GET /v1/templates/:id` and `/:id/public`
- `POST /v1/templates/:id/download`
- `GET /v1/profiles/:uid`

## Backend

- `template.service.ts`, `purpose-track.service.ts`, `profile.service.ts`

## Important components

- `public-catalog.tsx`, `public-template-view.tsx`, `public-creator-view.tsx`, `template-card.tsx`
