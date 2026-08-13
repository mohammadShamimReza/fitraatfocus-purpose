import { collections, db } from "../config/admin";
import { notFound } from "../lib/http-error";
import { nowIso } from "../lib/ids";
import {
  type CatalogCreator,
  type CreatorProfile,
  type UpdateProfileInput,
  emptyProfile,
  toCatalogCreator,
} from "../models/profile.model";

const profiles = db.collection(collections.profiles);

function asProfile(uid: string, data: Record<string, unknown>): CreatorProfile {
  return {
    uid,
    displayName: String(data.displayName ?? ""),
    headline: String(data.headline ?? ""),
    bio: String(data.bio ?? ""),
    expertise: Array.isArray(data.expertise) ? data.expertise.map(String) : [],
    proof: String(data.proof ?? ""),
    location: String(data.location ?? ""),
    website: String(data.website ?? ""),
    avatarUrl: String(data.avatarUrl ?? ""),
    updatedAt: String(data.updatedAt ?? nowIso()),
  };
}

export async function findProfile(uid: string): Promise<CreatorProfile | undefined> {
  const snapshot = await profiles.doc(uid).get();
  if (!snapshot.exists) {
    return undefined;
  }

  return asProfile(uid, (snapshot.data() ?? {}) as Record<string, unknown>);
}

export async function getPublicProfile(uid: string): Promise<CreatorProfile> {
  const profile = await findProfile(uid);
  if (!profile) {
    throw notFound("Creator not found.");
  }

  return profile;
}

export async function getOrCreateMyProfile(uid: string, displayName: string, avatarUrl = ""): Promise<CreatorProfile> {
  const existing = await findProfile(uid);
  if (existing) {
    return existing;
  }

  const profile = emptyProfile(uid, displayName || "Creator", avatarUrl);
  await profiles.doc(uid).set(profile);
  return profile;
}

export async function updateMyProfile(uid: string, input: UpdateProfileInput): Promise<CreatorProfile> {
  const profile: CreatorProfile = {
    ...input,
    uid,
    updatedAt: nowIso(),
  };
  await profiles.doc(uid).set(profile, { merge: true });

  const owned = await db.collection(collections.templates).where("creatorUid", "==", uid).get();
  const batch = db.batch();
  let writes = 0;
  for (const doc of owned.docs) {
    if (doc.get("creatorName") !== profile.displayName) {
      batch.update(doc.ref, { creatorName: profile.displayName });
      writes += 1;
    }
  }
  if (writes > 0) {
    await batch.commit();
  }

  return profile;
}

export async function getCatalogCreator(uid: string, fallbackName: string): Promise<CatalogCreator> {
  const profile = await findProfile(uid);
  return toCatalogCreator(profile, uid, fallbackName);
}
