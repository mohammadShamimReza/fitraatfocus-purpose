import "./strip-auth-emulator";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp();

export const adminAuth = getAuth(app);
export const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true });

export const collections = {
  users: "users",
  templates: "templates",
  purposeTracks: "purposeTracks",
} as const;
