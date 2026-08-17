# Download to app

## What it does

Copies a published template into `purposeTracks` for the signed-in Firebase user so the mobile/web app can run it.

## Screens

- STUDIO-03 Public System (download CTA)
- App PURPOSE-03 consumes the copy

## APIs

- Studio: `POST /v1/templates/:templateId/download`
- App: `GET /v1/purpose/mine`, track GET/PATCH (function `api`)

## Backend

- `purpose-track.service.ts` (`ensurePurposeTrack`)
- App `PurposeModel`

## Important components

- `PublicTemplateView` download action
- App `PurposeTrackScreen`
