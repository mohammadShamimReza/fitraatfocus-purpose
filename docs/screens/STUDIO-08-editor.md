# STUDIO-08 — System Editor

## Purpose

Edit metadata, sections, and tasks; publish or delete. Owner insights.

## Feature

System authoring

## Platforms

### Web

Route:
`/dashboard/systems/$templateId`

Main implementation:
`src/routes/(main)/dashboard/systems/$templateId.tsx`

Component: `SystemEditorPage`

### Mobile

Not in this repository. End users run copies in the Fitraat Focus app (`fitraatfocusapp`).

### Backend

Relevant APIs:

- `GET/PATCH/DELETE /v1/templates/:id`
- `POST /v1/templates/:id/publish`
- `sections and tasks CRUD/reorder endpoints`

Relevant services:

- `template.service`

## Components

- `src/routes/(main)/dashboard/systems/-components/system-editor.tsx`
- `editor-overview.tsx`
- `editor-metadata-form.tsx`
- `editor-sections.tsx`
- `editor-tasks.tsx`
- `owner-insights.tsx`
- `delete-system-button.tsx`

## Data

Publish requires at least one task (enforced in service/validator). After publish, the system appears on STUDIO-02 / PURPOSE-01.

## Navigation

Previous screens:

- STUDIO-06
- STUDIO-07

Next screens:

- STUDIO-02 after publish

## Related Screens

- STUDIO-03

## Notes

None.
