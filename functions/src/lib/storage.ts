import { adminStorage } from "../config/admin";

export function templateCoverPrefix(uid: string, templateId: string): string {
  return `users/${uid}/templates/${templateId}/`;
}

/**
 * Remove cover files for a system. Failures are ignored so Firestore delete
 * can still succeed if Storage is unavailable.
 */
export async function deleteTemplateCoverFiles(
  uid: string,
  templateId: string,
  storagePath?: string,
): Promise<void> {
  const bucket = adminStorage.bucket();
  const prefix = templateCoverPrefix(uid, templateId);

  try {
    await bucket.deleteFiles({ prefix });
    return;
  } catch {
    // Fall through to the known path when prefix deletes are unavailable.
  }

  if (!storagePath) {
    return;
  }

  try {
    await bucket.file(storagePath).delete({ ignoreNotFound: true });
  } catch {
    // Cover cleanup is best-effort.
  }
}
