import "./strip-auth-emulator";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Initialize the Admin SDK once per cold start.
 */
export function initializeFirebaseAdmin(): void {
  if (getApps().length === 0) {
    initializeApp();
  }
}

initializeFirebaseAdmin();

export const adminAuth = getAuth();
export const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

export const collections = {
  users: "users",
  templates: "templates",
  purposeTracks: "purposeTracks",
} as const;
