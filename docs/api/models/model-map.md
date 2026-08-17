| Model | Type | APIs Using It | Related Models | Source |
|---|---|---|---|---|
| Template | Firestore document | API-TEMPLATE-001..017 | creatorUid links to User; downloads create PurposeTrack. | `functions/src/models/template.model.ts; functions/src/services/template.service.ts` |
| User profile | Firestore document | API-PROFILE-001..003 | contains app user fields and nested `creator` extras. | `functions/src/models/profile.model.ts; functions/src/services/profile.service.ts` |
| PurposeTrack | Firestore document | API-TEMPLATE-009 | references source template and owner user. | `functions/src/models/purpose-track.model.ts; services/purpose-track.service.ts` |
