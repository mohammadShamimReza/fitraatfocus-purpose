# STUDIO-07 — New System

## Purpose

Create a system (title, purpose, story, description, category).

## Feature

System authoring

## Platforms

### Web

Route:
`/dashboard/systems/new`

Main implementation:
`src/routes/(main)/dashboard/systems/new/route.tsx`

Component: `NewSystemPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `POST /v1/templates`

Relevant services:

- `template.service create`

## Components

- `src/routes/(main)/dashboard/systems/-components/create-system-form.tsx`

## Data

Creates a draft template owned by the signed-in user.

## Navigation

Previous screens:

- STUDIO-06

Next screens:

- STUDIO-08

## Related Screens

- STUDIO-06

## Notes

None.
