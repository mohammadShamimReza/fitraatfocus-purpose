import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { getFirebaseApp } from "./client";

const MAX_COVER_BYTES = 10 * 1024 * 1024;

export function getFirebaseStorage() {
  return getStorage(getFirebaseApp());
}

export function templateCoverPath(uid: string, templateId: string, ext: string): string {
  return `users/${uid}/templates/${templateId}/cover-${Date.now()}.${ext}`;
}

export function coverExtension(file: File): string {
  if (file.type.includes("png")) {
    return "png";
  }
  if (file.type.includes("webp")) {
    return "webp";
  }
  return "jpg";
}

export function assertCoverFile(file: File, messages: { type: string; size: string }): void {
  if (!file.type.startsWith("image/")) {
    throw new Error(messages.type);
  }
  if (file.size >= MAX_COVER_BYTES) {
    throw new Error(messages.size);
  }
}

export async function uploadTemplateCover(path: string, file: File): Promise<string> {
  const storageRef = ref(getFirebaseStorage(), path);
  await uploadBytes(storageRef, file, { contentType: file.type || "image/jpeg" });
  return getDownloadURL(storageRef);
}

export async function deleteStorageFile(path: string): Promise<void> {
  try {
    await deleteObject(ref(getFirebaseStorage(), path));
  } catch {
    // Best-effort cleanup.
  }
}
