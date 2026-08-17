# STUDIO-05 — Login

## Purpose

Google sign-in for studio. Redirects if already signed in. Dashboard requires this session.

## Feature

Studio auth

## Platforms

### Web

Route:
`/auth/v1/login`

Main implementation:
`src/routes/(main)/auth/v1/login/route.tsx`

Component: `LoginV1`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- None (Firebase Auth client only)

Relevant services:

- —

## Components

- `src/routes/(main)/auth/-components/google-sign-in-button.tsx`
- `redirect-if-signed-in.tsx`
- `firebase-config-alert.tsx`

## Data

Same Firebase project as the app. Safe post-login redirects: /dashboard, /systems, /creators (`post-auth-path.ts`).

## Navigation

Previous screens:

- any protected /dashboard visit

Next screens:

- STUDIO-06

## Related Screens

- AUTH-01

## Notes

Not the app welcome carousel.
