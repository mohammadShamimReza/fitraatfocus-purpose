import type { CreatorProfile, UpdateProfileInput } from "@/types/profile";

import { functionsRequest } from "./http";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

export async function getProfile(uid: string): Promise<CreatorProfile> {
  return unwrapData(await functionsRequest(functionPaths.profiles.detail(uid), { auth: false }));
}

export async function getMyProfile(): Promise<CreatorProfile> {
  return unwrapData(await functionsRequest(functionPaths.profiles.me));
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<CreatorProfile> {
  return unwrapData(await functionsRequest(functionPaths.profiles.me, { method: "PATCH", body: input }));
}
