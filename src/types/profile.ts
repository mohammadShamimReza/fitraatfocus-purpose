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
