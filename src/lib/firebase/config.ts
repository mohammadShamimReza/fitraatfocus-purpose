export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

function readEnv(name: keyof ImportMetaEnv): string {
  return import.meta.env[name]?.trim() ?? "";
}

export function getFirebaseWebConfig(): FirebaseWebConfig {
  return {
    apiKey: readEnv("VITE_FIREBASE_API_KEY"),
    authDomain: readEnv("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: readEnv("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: readEnv("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readEnv("VITE_FIREBASE_APP_ID"),
  };
}

export function isFirebaseConfigured(config: FirebaseWebConfig = getFirebaseWebConfig()): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

export function getFunctionsBaseUrl(): string {
  return import.meta.env.VITE_FUNCTIONS_URL?.trim().replace(/\/$/, "") ?? "";
}

export function isFunctionsApiEnabled(): boolean {
  return Boolean(getFunctionsBaseUrl());
}

export function getFunctionsRegion(): string {
  return import.meta.env.VITE_FUNCTIONS_REGION?.trim() ?? "";
}
