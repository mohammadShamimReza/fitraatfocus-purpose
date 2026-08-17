# Studio authentication

## What it does

Google sign-in for creators. Protects `/dashboard/*`.

## Screens

- STUDIO-05 Login

## APIs

Firebase Auth client SDK only. API calls attach the ID token.

## Backend

- `functions/src/middleware/auth.middleware.ts`

## Important components

- `google-sign-in-button.tsx`, `redirect-if-signed-in.tsx`, `RequireAuth` on dashboard layout
