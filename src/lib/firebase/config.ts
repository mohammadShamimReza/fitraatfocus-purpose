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

const DEFAULT_PROJECT_ID = "fitraat-focus";
const DEFAULT_FUNCTIONS_REGION = "us-central1";
const STUDIO_FUNCTION_NAME = "studio";

export function isFirebaseConfigured(config: FirebaseWebConfig = getFirebaseWebConfig()): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

export function getFunctionsRegion(): string {
  return import.meta.env.VITE_FUNCTIONS_REGION?.trim() || DEFAULT_FUNCTIONS_REGION;
}

export function getStudioFunctionName(): string {
  return STUDIO_FUNCTION_NAME;
}

export function getFunctionsBaseUrl(): string {
  const override = import.meta.env.VITE_FUNCTIONS_URL?.trim().replace(/\/$/, "");
  if (override) {
    return override;
  }

  const projectId = getFirebaseWebConfig().projectId || DEFAULT_PROJECT_ID;
  const region = getFunctionsRegion();
  const name = getStudioFunctionName();

  if (import.meta.env.DEV) {
    return `http://127.0.0.1:5001/${projectId}/${region}/${name}`;
  }

  return `https://${region}-${projectId}.cloudfunctions.net/${name}`;
}
