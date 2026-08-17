# STUDIO-01 — Landing

## Purpose

Public marketing landing for the studio: problem, loop, catalog preview, get-the-app, FAQ.

## Feature

Public catalog

## Platforms

### Web

Route:
`/`

Main implementation:
`src/routes/(external)/index.tsx`

Component: `LandingPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET /v1/templates (catalog preview; Needs verification if landing fetches or uses static sample)`

Relevant services:

- `template.service listPublic`

## Components

- `src/routes/(external)/-components/landing-hero.tsx`
- `landing-problem.tsx`
- `landing-loop.tsx`
- `landing-catalog.tsx`
- `landing-app.tsx`
- `landing-faq.tsx`
- `landing-get-app.tsx`

## Data

Public templates from Firestore via function `studio`. Get-app links go to the Fitraat Focus app / Play Store (see landing-get-app).

## Navigation

Previous screens:

- —

Next screens:

- STUDIO-02
- STUDIO-05

## Related Screens

- MKT-01 (marketing site landing — different repo)
- STUDIO-02

## Notes

Exact production host: purpose.fitraatfocus.com in marketing code; README also cites studio.fitraatfocus.fitraat.com. Needs verification.
