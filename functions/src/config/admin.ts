import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp();

export const adminAuth = getAuth(app);
export const db = getFirestore(app);

export const collections = {
  profiles: "profiles",
  templates: "templates",
} as const;
