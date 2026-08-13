export type CreatorProfile = {
  uid: string;
  displayName: string;
  headline: string;
  bio: string;
  expertise: string[];
  proof: string;
  location: string;
  website: string;
  avatarUrl: string;
  updatedAt: string;
};

export type UpdateProfileInput = Omit<CreatorProfile, "uid" | "updatedAt">;

export type CatalogCreator = {
  uid: string;
  displayName: string;
  headline: string;
  expertise: string[];
  avatarUrl: string;
};

export function emptyProfile(uid: string, displayName: string, avatarUrl = ""): CreatorProfile {
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
    updatedAt: new Date().toISOString(),
  };
}

export function toCatalogCreator(profile: CreatorProfile | undefined, uid: string, fallbackName: string): CatalogCreator {
  const displayName = profile?.displayName?.trim() || fallbackName.trim() || "Creator";

  return {
    uid,
    displayName,
    headline: profile?.headline ?? "",
    expertise: profile?.expertise ?? [],
    avatarUrl: profile?.avatarUrl ?? "",
  };
}
