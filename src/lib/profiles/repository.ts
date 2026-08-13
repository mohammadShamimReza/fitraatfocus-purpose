import { getUserAvatar, getUserDisplayName } from "@/lib/auth/user-display";
import { FunctionsApiError } from "@/lib/functions/errors";
import { readLocalTemplates, upsertLocalTemplate } from "@/lib/templates/local-store";
import type { CreatorProfile, UpdateProfileInput } from "@/types/profile";
import type { CatalogCreator } from "@/types/template";

import { getLocalProfile, upsertLocalProfile } from "./local-store";

async function getOptionalUser() {
  try {
    const { getFirebaseAuth } = await import("@/lib/firebase/client");
    return getFirebaseAuth().currentUser;
  } catch {
    return null;
  }
}

async function requireUser() {
  const user = await getOptionalUser();

  if (!user) {
    throw new FunctionsApiError("You need to sign in first.", 401);
  }

  return user;
}

function nowIso(): string {
  return new Date().toISOString();
}

function emptyProfile(uid: string, displayName: string, avatarUrl = ""): CreatorProfile {
  return {
    uid,
    displayName,
    headline: "",
    bio: "",
    expertise: [],
    proof: "",
    location: "",
    website: "",
    avatarUrl,
    updatedAt: nowIso(),
  };
}

export function toCatalogCreator(uid: string, fallbackName: string): CatalogCreator {
  const profile = getLocalProfile(uid);
  const displayName = profile?.displayName?.trim() || fallbackName.trim() || "Creator";

  return {
    uid,
    displayName,
    headline: profile?.headline ?? "",
    expertise: profile?.expertise ?? [],
    avatarUrl: profile?.avatarUrl ?? "",
  };
}

export async function getProfile(uid: string): Promise<CreatorProfile> {
  const stored = getLocalProfile(uid);

  if (stored) {
    return stored;
  }

  const owned = readLocalTemplates().find((template) => template.creatorUid === uid);

  if (owned) {
    return emptyProfile(uid, owned.creatorName);
  }

  throw new FunctionsApiError("Creator not found.", 404);
}

export async function getMyProfile(): Promise<CreatorProfile> {
  const user = await requireUser();
  const stored = getLocalProfile(user.uid);

  if (stored) {
    return stored;
  }

  return emptyProfile(user.uid, getUserDisplayName(user), getUserAvatar(user));
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<CreatorProfile> {
  const user = await requireUser();
  const profile = upsertLocalProfile({
    ...input,
    uid: user.uid,
    updatedAt: nowIso(),
  });

  for (const template of readLocalTemplates()) {
    if (template.creatorUid === user.uid && template.creatorName !== profile.displayName) {
      upsertLocalTemplate({ ...template, creatorName: profile.displayName });
    }
  }

  return profile;
}
