# STUDIO-09 — Creator Profile

## Purpose

Edit the creator profile shown on the public catalog.

## Feature

Creator profile

## Platforms

### Web

Route:
`/dashboard/profile`

Main implementation:
`src/routes/(main)/dashboard/profile/route.tsx`

Component: `CreatorProfilePage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/profiles/me`
- `PATCH /v1/profiles/me`

Relevant services:

- `profile.service`

## Components

- `src/routes/(main)/dashboard/profile/-components/creator-profile-form.tsx`

## Data

Stored as creator fields on `users/{uid}`.

## Navigation

Previous screens:

- STUDIO-06

Next screens:

- STUDIO-04 (public view)

## Related Screens

- STUDIO-04

## Notes

None.
