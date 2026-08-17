# System authoring

## What it does

Creators create drafts, edit sections/tasks, publish, and delete systems.

## Screens

- STUDIO-06 My Systems
- STUDIO-07 New System
- STUDIO-08 System Editor

## APIs

All owner template endpoints under `/v1/templates` except public list/get/download (see [api/overview.md](../api/overview.md)).

## Backend

- `template.controller.ts` / `template.service.ts`

## Important components

- `systems-list.tsx`, `create-system-form.tsx`, `system-editor.tsx`, editor-* forms
