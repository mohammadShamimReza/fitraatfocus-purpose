import { randomUUID } from "node:crypto";

export function newId(): string {
  return randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}

/** One track per user + source template. Safe as a Firestore document id. */
export function purposeTrackDocId(ownerUid: string, sourceTemplateId: string): string {
  return `${ownerUid}__${sourceTemplateId}`;
}
