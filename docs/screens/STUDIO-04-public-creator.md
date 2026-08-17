# STUDIO-04 — Public Creator

## Purpose

Public creator profile and their published systems.

## Feature

Public catalog

## Platforms

### Web

Route:
`/creators/$creatorId`

Main implementation:
`src/routes/(external)/creators/$creatorId.tsx`

Component: `PublicCreatorPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/profiles/:uid`
- `GET /v1/templates (creatorId query)`

Relevant services:

- `profile.service`
- `template.service`

## Components

- `src/routes/(external)/creators/-components/public-creator-view.tsx`
- `template-card.tsx`

## Data

Creator extras live on the `users` document.

## Navigation

Previous screens:

- STUDIO-02
- STUDIO-03

Next screens:

- —

## Related Screens

- STUDIO-09

## Notes

None.
