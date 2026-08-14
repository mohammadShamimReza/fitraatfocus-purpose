import type { DocumentSnapshot } from "firebase-admin/firestore";

import { collections, db } from "../config/admin";
import { notFound } from "../lib/http-error";
import { nowIso } from "../lib/ids";
import {
  type CatalogCreator,
  type CreatorExtras,
  type CreatorProfile,
  type UpdateProfileInput,
  extrasAreEmpty,
  extrasFromUnknown,
  toCatalogCreator,
  userDocToCreatorProfile,
} from "../models/profile.model";

const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
const LEGACY_PROFILES = "profiles";

const users = db.collection(collections.users);
const legacyProfiles = db.collection(LEGACY_PROFILES);

function asUserData(snapshot: DocumentSnapshot): Record<string, unknown> {
  return (snapshot.data() ?? {}) as Record<string, unknown>;
}

function withTimestamp(extras: CreatorExtras): CreatorExtras {
  return {
    ...extras,
    updatedAt: extras.updatedAt || nowIso(),
  };
}

async function readLegacyExtras(uid: string): Promise<CreatorExtras | undefined> {
  const snapshot = await legacyProfiles.doc(uid).get();
  if (!snapshot.exists) {
    return undefined;
  }

  const extras = extrasFromUnknown(
    (snapshot.data() ?? {}) as Record<string, unknown>,
  );
  return extrasAreEmpty(extras) ? undefined : extras;
}

async function adoptLegacyExtras(
  uid: string,
  data: Record<string, unknown>,
): Promise<{ data: Record<string, unknown>; extras: CreatorExtras }> {
  let extras = extrasFromUnknown(data.creator);
  if (!extrasAreEmpty(extras)) {
    return { data, extras: withTimestamp(extras) };
  }

  const leftover = await readLegacyExtras(uid);
  if (!leftover) {
    return { data, extras: withTimestamp(extras) };
  }

  extras = withTimestamp(leftover);
  await users.doc(uid).set({ creator: extras }, { merge: true });
  return { data: { ...data, creator: extras }, extras };
}

async function findUserSnapshot(uid: string): Promise<DocumentSnapshot | undefined> {
  const snapshot = await users.doc(uid).get();
  return snapshot.exists ? snapshot : undefined;
}

async function findProfile(uid: string): Promise<CreatorProfile | undefined> {
  const snapshot = await findUserSnapshot(uid);
  if (!snapshot) {
    return undefined;
  }

  const adopted = await adoptLegacyExtras(uid, asUserData(snapshot));
  return userDocToCreatorProfile(uid, adopted.data, adopted.extras);
}

function buildAppUserDoc(
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
): Record<string, unknown> {
  const now = Date.now();
  const name = displayName.trim() || email.split("@")[0] || "User";

  return {
    uid,
    email,
    displayName: name,
    ...(photoURL ? { photoURL } : {}),
    createdAt: now,
    onboardingCompleted: false,
    subscriptionStatus: "free",
    startDate: now,
    subscriptionExpiry: now + TRIAL_MS,
  };
}

export async function getPublicProfile(uid: string): Promise<CreatorProfile> {
  const profile = await findProfile(uid);
  if (!profile) {
    throw notFound("Creator not found.");
  }

  return profile;
}

export async function getOrCreateMyProfile(
  uid: string,
  displayName: string,
  avatarUrl = "",
  email = "",
): Promise<CreatorProfile> {
  const existing = await findProfile(uid);
  if (existing) {
    return existing;
  }

  await users.doc(uid).set(
    buildAppUserDoc(uid, displayName, email, avatarUrl),
    { merge: true },
  );
  const created = await findProfile(uid);
  if (!created) {
    throw notFound("Creator not found.");
  }

  return created;
}

export async function updateMyProfile(
  uid: string,
  input: UpdateProfileInput,
): Promise<CreatorProfile> {
  const current = await users.doc(uid).get();
  if (!current.exists) {
    throw notFound("Creator not found.");
  }
  const extras: CreatorExtras = {
    headline: input.headline,
    bio: input.bio,
    expertise: input.expertise,
    proof: input.proof,
    location: input.location,
    website: input.website,
    updatedAt: nowIso(),
  };

  const patch: Record<string, unknown> = {
    displayName: input.displayName,
    creator: extras,
  };
  if (input.avatarUrl.trim()) {
    patch.photoURL = input.avatarUrl.trim();
  }

  await users.doc(uid).set(patch, { merge: true });

  const owned = await db
    .collection(collections.templates)
    .where("creatorUid", "==", uid)
    .get();
  const batch = db.batch();
  let writes = 0;
  for (const doc of owned.docs) {
    if (doc.get("creatorName") !== input.displayName) {
      batch.update(doc.ref, { creatorName: input.displayName });
      writes += 1;
    }
  }
  if (writes > 0) {
    await batch.commit();
  }

  const snapshot = await users.doc(uid).get();
  return userDocToCreatorProfile(uid, asUserData(snapshot), extras);
}

export async function getCatalogCreator(
  uid: string,
  fallbackName: string,
): Promise<CatalogCreator> {
  const profile = await findProfile(uid);
  return toCatalogCreator(profile, uid, fallbackName);
}
