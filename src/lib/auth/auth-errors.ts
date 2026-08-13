import { FirebaseError } from "firebase/app";

import type { MessageKey } from "@/lib/i18n/messages/en";

const AUTH_ERROR_KEYS: Record<string, MessageKey> = {
  "auth/user-disabled": "auth.userDisabled",
  "auth/popup-closed-by-user": "auth.popupClosed",
  "auth/cancelled-popup-request": "auth.popupClosed",
  "auth/popup-blocked": "auth.popupBlocked",
  "auth/network-request-failed": "auth.network",
  "auth/too-many-requests": "auth.tooMany",
  "auth/operation-not-allowed": "auth.notAllowed",
};

export function getAuthErrorKey(error: unknown): MessageKey {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_KEYS[error.code] ?? "auth.generic";
  }

  return "auth.generic";
}
