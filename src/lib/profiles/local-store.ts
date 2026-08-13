import type { CreatorProfile } from "@/types/profile";

import { SEED_PROFILES } from "./seed";

const PROFILES_KEY = "fitraat.studio.profiles";

function parseProfiles(raw: string | null): CreatorProfile[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CreatorProfile[]) : [];
  } catch {
    return [];
  }
}

export function readLocalProfiles(): CreatorProfile[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = parseProfiles(window.localStorage.getItem(PROFILES_KEY));
  const byUid = new Map(SEED_PROFILES.map((profile) => [profile.uid, profile]));

  for (const profile of stored) {
    if (profile.uid) {
      byUid.set(profile.uid, profile);
    }
  }

  const next = [...byUid.values()];
  const needsWrite = next.some((profile) => !stored.some((item) => item.uid === profile.uid));

  if (needsWrite) {
    writeLocalProfiles(next);
  }

  return next;
}

export function writeLocalProfiles(profiles: CreatorProfile[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getLocalProfile(uid: string): CreatorProfile | undefined {
  return readLocalProfiles().find((profile) => profile.uid === uid);
}

export function upsertLocalProfile(profile: CreatorProfile): CreatorProfile {
  const profiles = readLocalProfiles().filter((item) => item.uid !== profile.uid);
  profiles.unshift(profile);
  writeLocalProfiles(profiles);
  return profile;
}
