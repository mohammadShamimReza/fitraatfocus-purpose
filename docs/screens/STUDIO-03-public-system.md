# STUDIO-03 — Public System

## Purpose

Public system detail. Signed-in non-owners can download (copy) into the Fitraat Focus app.

## Feature

Public catalog

## Platforms

### Web

Route:
`/systems/$templateId`

Main implementation:
`src/routes/(external)/systems/$templateId.tsx`

Component: `PublicTemplatePage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/templates/:templateId/public`
- `GET /v1/templates/:templateId`
- `POST /v1/templates/:templateId/download`

Relevant services:

- `template.service`
- `purpose-track.service (ensurePurposeTrack)`

## Components

- `src/routes/(external)/systems/-components/public-template-view.tsx`
- `dashboard EditorSections/EditorTasks (read-only reuse)`

## Data

Download writes `purposeTracks` for the current user. App then shows PURPOSE-03.

## Navigation

Previous screens:

- STUDIO-02

Next screens:

- STUDIO-05 if unsigned
- PURPOSE-03 in the app

## Related Screens

- PURPOSE-02
- STUDIO-08

## Notes

None.
