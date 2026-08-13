import type { User } from "firebase/auth";

export function getUserDisplayName(user: User | null): string {
  if (!user) {
    return "Creator";
  }

  return user.displayName?.trim() || user.email || "Creator";
}

export function getUserEmail(user: User | null): string {
  return user?.email ?? "";
}

export function getUserAvatar(user: User | null): string {
  return user?.photoURL ?? "";
}
