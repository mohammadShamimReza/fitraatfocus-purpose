import { isFunctionsApiEnabled } from "@/lib/firebase/config";
import * as local from "@/lib/profiles/repository";
import type { CreatorProfile, UpdateProfileInput } from "@/types/profile";

import { functionsRequest } from "./http";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

function useRemote(): boolean {
  return isFunctionsApiEnabled();
}

export async function getProfile(uid: string): Promise<CreatorProfile> {
  if (!useRemote()) {
    return local.getProfile(uid);
  }

  return unwrapData(await functionsRequest(functionPaths.profiles.detail(uid), { auth: false }));
}

export async function getMyProfile(): Promise<CreatorProfile> {
  if (!useRemote()) {
    return local.getMyProfile();
  }

  return unwrapData(await functionsRequest(functionPaths.profiles.me));
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<CreatorProfile> {
  if (!useRemote()) {
    return local.updateMyProfile(input);
  }

  return unwrapData(await functionsRequest(functionPaths.profiles.me, { method: "PATCH", body: input }));
}
