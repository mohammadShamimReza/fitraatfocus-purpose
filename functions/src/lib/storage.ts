import { randomUUID } from "node:crypto";

import { adminStorage } from "../config/admin";

export type CopiedCover = {
  imageUrl: string;
  storagePath: string;
};

export function templateCoverPrefix(uid: string, templateId: string): string {
  return `users/${uid}/templates/${templateId}/`;
}

export function trackCoverPath(
  ownerUid: string,
  trackId: string,
  ext: string,
): string {
  return `users/${ownerUid}/tracks/${trackId}/cover.${ext}`;
}

export function isOwnTrackCover(
  ownerUid: string,
  storagePath?: string,
): boolean {
  return Boolean(
    storagePath?.startsWith(`users/${ownerUid}/tracks/`),
  );
}

export function storagePathFromDownloadUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const marker = "/o/";
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) {
      return undefined;
    }
    const encoded = parsed.pathname.slice(index + marker.length);
    return encoded ? decodeURIComponent(encoded) : undefined;
  } catch {
    return undefined;
  }
}

function extensionFromPath(path: string): string {
  const match = path.match(/\.([a-z0-9]+)$/i);
  const ext = match?.[1]?.toLowerCase();
  if (ext === "png" || ext === "webp" || ext === "jpg" || ext === "jpeg") {
    return ext === "jpeg" ? "jpg" : ext;
  }
  return "jpg";
}

function firebaseDownloadUrl(
  bucketName: string,
  path: string,
  token: string,
): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${
    encodeURIComponent(path)
  }?alt=media&token=${token}`;
}

/**
 * Copy a system cover into a downloader's track folder so the mobile copy
 * keeps its own image after the source system is deleted.
 */
export async function copyCoverForTrack(
  source: { storagePath?: string; imageUrl?: string },
  ownerUid: string,
  trackId: string,
): Promise<CopiedCover | undefined> {
  const sourcePath = source.storagePath ||
    (source.imageUrl ? storagePathFromDownloadUrl(source.imageUrl) : undefined);
  if (!sourcePath) {
    return undefined;
  }

  try {
    const bucket = adminStorage.bucket();
    const from = bucket.file(sourcePath);
    const [exists] = await from.exists();
    if (!exists) {
      return undefined;
    }

    const destPath = trackCoverPath(
      ownerUid,
      trackId,
      extensionFromPath(sourcePath),
    );
    const dest = bucket.file(destPath);
    await from.copy(dest);
    const token = randomUUID();
    await dest.setMetadata({
      metadata: { firebaseStorageDownloadTokens: token },
    });
    return {
      imageUrl: firebaseDownloadUrl(bucket.name, destPath, token),
      storagePath: destPath,
    };
  } catch {
    return undefined;
  }
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
