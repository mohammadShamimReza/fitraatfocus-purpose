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

export type CreatorExtras = {
  headline: string;
  bio: string;
  expertise: string[];
  proof: string;
  location: string;
  website: string;
  updatedAt: string;
};

export function extrasFromUnknown(value: unknown): CreatorExtras {
  const data = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

  return {
    headline: String(data.headline ?? ""),
    bio: String(data.bio ?? ""),
    expertise: Array.isArray(data.expertise) ? data.expertise.map(String) : [],
    proof: String(data.proof ?? ""),
    location: String(data.location ?? ""),
    website: String(data.website ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

export function extrasAreEmpty(extras: CreatorExtras): boolean {
  return (
    extras.headline.trim() === "" &&
    extras.bio.trim() === "" &&
    extras.expertise.length === 0 &&
    extras.proof.trim() === "" &&
    extras.location.trim() === "" &&
    extras.website.trim() === ""
  );
}

export function userDocToCreatorProfile(
  uid: string,
  data: Record<string, unknown>,
  extras: CreatorExtras,
): CreatorProfile {
  return {
    uid,
    displayName: String(data.displayName ?? ""),
    headline: extras.headline,
    bio: extras.bio,
    expertise: extras.expertise,
    proof: extras.proof,
    location: extras.location,
    website: extras.website,
    avatarUrl: String(data.photoURL ?? ""),
    updatedAt: extras.updatedAt,
  };
}

export function toCatalogCreator(
  profile: CreatorProfile | undefined,
  uid: string,
  fallbackName: string,
): CatalogCreator {
  const displayName = profile?.displayName?.trim() || fallbackName.trim() || "Creator";

  return {
    uid,
    displayName,
    headline: profile?.headline ?? "",
    expertise: profile?.expertise ?? [],
    avatarUrl: profile?.avatarUrl ?? "",
  };
}
