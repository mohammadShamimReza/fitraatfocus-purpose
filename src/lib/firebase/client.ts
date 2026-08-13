import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirebaseWebConfig, isFirebaseConfigured } from "./config";

function assertBrowser(): void {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is only available in the browser.");
  }
}

export function getFirebaseApp(): FirebaseApp {
  assertBrowser();

  const config = getFirebaseWebConfig();

  if (!isFirebaseConfigured(config)) {
    throw new Error("Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.");
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(config);
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getGoogleAuthProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}
