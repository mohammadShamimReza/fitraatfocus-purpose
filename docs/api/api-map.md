| API ID | Method | Endpoint | Request Schema | Response Schema | Model | Feature | Source |
|---|---|---|---|---|---|---|---|
| API-SYS-001 | GET | `/` | `None` | `ApiRootResponse` | None | System | `functions/src/app.ts` |
| API-SYS-002 | GET | `/v1/health` | `None` | `HealthResponse` | None | System | `functions/src/routes/index.ts` |
| API-TEMPLATE-001 | GET | `/v1/templates` | `TemplateListQuery` | `CatalogTemplate[]` | Template, User profile summary | Catalog | `template.controller.ts` |
| API-TEMPLATE-002 | GET | `/v1/templates/me` | `None` | `PurposeTemplate[]` | Template | TemplateAuthoring | `listMine` |
| API-TEMPLATE-003 | POST | `/v1/templates` | `CreateTemplateInput (zod)` | `PurposeTemplate` | Template | TemplateAuthoring | `create` |
| API-TEMPLATE-004 | GET | `/v1/templates/:templateId/public` | `TemplateIdPath` | `PublicTemplateDetail` | Template, CreatorProfile | Catalog | `getPublic` |
| API-TEMPLATE-005 | GET | `/v1/templates/:templateId` | `TemplateIdPath` | `PurposeTemplateDetail` | Template | Catalog | `getOne` |
| API-TEMPLATE-006 | PATCH | `/v1/templates/:templateId` | `UpdateTemplateInput (zod)` | `PurposeTemplate` | Template | TemplateAuthoring | `update` |
| API-TEMPLATE-007 | DELETE | `/v1/templates/:templateId` | `TemplateIdPath` | `NoContent` | Template, PurposeTrack | TemplateAuthoring | `remove` |
| API-TEMPLATE-008 | POST | `/v1/templates/:templateId/publish` | `TemplateIdPath` | `PurposeTemplate` | Template | TemplateAuthoring | `publish` |
| API-TEMPLATE-009 | POST | `/v1/templates/:templateId/download` | `TemplateIdPath` | `PurposeTemplate` | Template, PurposeTrack | Download | `download` |
| API-TEMPLATE-010 | POST | `/v1/templates/:templateId/sections` | `CreateSectionInput (zod)` | `TemplateSection` | Template | TemplateAuthoring | `createSection` |
| API-TEMPLATE-011 | PATCH | `/v1/templates/:templateId/sections/:sectionId` | `UpdateSectionInput (zod)` | `TemplateSection` | Template | TemplateAuthoring | `updateSection` |
| API-TEMPLATE-012 | DELETE | `/v1/templates/:templateId/sections/:sectionId` | `SectionPath` | `NoContent` | Template | TemplateAuthoring | `deleteSection` |
| API-TEMPLATE-013 | POST | `/v1/templates/:templateId/sections/reorder` | `ReorderSectionsInput (zod)` | `PurposeTemplateDetail` | Template | TemplateAuthoring | `reorderSections` |
| API-TEMPLATE-014 | POST | `/v1/templates/:templateId/tasks` | `CreateTaskInput (zod)` | `TemplateTask` | Template | TemplateAuthoring | `createTask` |
| API-TEMPLATE-015 | PATCH | `/v1/templates/:templateId/tasks/:taskId` | `UpdateTaskInput (zod)` | `TemplateTask` | Template | TemplateAuthoring | `updateTask` |
| API-TEMPLATE-016 | DELETE | `/v1/templates/:templateId/tasks/:taskId` | `TaskPath` | `NoContent` | Template | TemplateAuthoring | `deleteTask` |
| API-TEMPLATE-017 | POST | `/v1/templates/:templateId/tasks/reorder` | `ReorderTasksInput (zod)` | `PurposeTemplateDetail` | Template | TemplateAuthoring | `reorderTasks` |
| API-PROFILE-001 | GET | `/v1/profiles/me` | `None` | `CreatorProfile` | User profile | CreatorProfile | `profile.controller.ts` |
| API-PROFILE-002 | PATCH | `/v1/profiles/me` | `UpdateProfileInput (zod)` | `CreatorProfile` | User profile + Template creatorName fanout | CreatorProfile | `updateMine` |
| API-PROFILE-003 | GET | `/v1/profiles/:uid` | `ProfileUidPath` | `CreatorProfile` | User profile | Catalog | `getById` |
