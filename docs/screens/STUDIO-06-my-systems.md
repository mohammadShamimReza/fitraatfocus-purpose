# STUDIO-06 — My Systems

## Purpose

Owner list of draft and published systems plus download totals.

## Feature

System authoring

## Platforms

### Web

Route:
`/dashboard/systems`

Main implementation:
`src/routes/(main)/dashboard/systems/index.tsx`

Component: `SystemsPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/templates/me`

Relevant services:

- `template.service listMine`

## Components

- `src/routes/(main)/dashboard/systems/-components/systems-list.tsx`

## Data

Requires RequireAuth. `/dashboard` index redirects here.

## Navigation

Previous screens:

- STUDIO-05

Next screens:

- STUDIO-07
- STUDIO-08
- STUDIO-09

## Related Screens

- STUDIO-08

## Notes

None.
