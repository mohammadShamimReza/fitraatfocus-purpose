# STUDIO-02 — Public Catalog

## Purpose

Filterable catalog of published purpose systems.

## Feature

Public catalog

## Platforms

### Web

Route:
`/systems`

Main implementation:
`src/routes/(external)/systems/index.tsx`

Component: `PublicSystemsPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/templates`

Relevant services:

- `template.service listPublic`

## Components

- `src/routes/(external)/systems/-components/public-catalog.tsx`
- `src/routes/(external)/-components/template-card.tsx`
- `src/components/template-filters.tsx`
- `use-in-app-note.tsx`

## Data

Published templates only. App equivalent: PURPOSE-01.

## Navigation

Previous screens:

- STUDIO-01

Next screens:

- STUDIO-03

## Related Screens

- PURPOSE-01
- STUDIO-03
- STUDIO-04

## Notes

None.
