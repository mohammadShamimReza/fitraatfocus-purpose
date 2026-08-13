import { FunctionsApiError } from "./errors";

export async function getBearerToken(): Promise<string> {
  const { getFirebaseAuth } = await import("@/lib/firebase/client");
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    throw new FunctionsApiError("You need to sign in first.", 401);
  }

  return user.getIdToken();
}
