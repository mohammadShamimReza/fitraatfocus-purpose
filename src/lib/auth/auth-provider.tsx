import { createContext, type ReactNode, use, useCallback, useEffect, useMemo, useState } from "react";

import type { User } from "firebase/auth";

import { isFirebaseConfigured } from "@/lib/firebase/config";

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadAuth() {
  const [{ getFirebaseAuth, getGoogleAuthProvider }, firebaseAuth] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/auth"),
  ]);

  return { getFirebaseAuth, getGoogleAuthProvider, firebaseAuth };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setIsReady(true);
      return;
    }

    let unsubscribe: () => void = () => undefined;
    let cancelled = false;

    void loadAuth()
      .then(({ getFirebaseAuth, firebaseAuth }) => {
        if (cancelled) {
          return;
        }

        unsubscribe = firebaseAuth.onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
          setUser(nextUser);
          setIsReady(true);
        });
      })
      .catch(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [isConfigured]);

  const signInWithGoogle = useCallback(async () => {
    const { getFirebaseAuth, getGoogleAuthProvider, firebaseAuth } = await loadAuth();
    await firebaseAuth.signInWithPopup(getFirebaseAuth(), getGoogleAuthProvider());
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { getFirebaseAuth, firebaseAuth } = await loadAuth();
    await firebaseAuth.signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const { getFirebaseAuth, firebaseAuth } = await loadAuth();
    await firebaseAuth.createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  }, []);

  const signOut = useCallback(async () => {
    const { getFirebaseAuth, firebaseAuth } = await loadAuth();
    await firebaseAuth.signOut(getFirebaseAuth());
  }, []);

  const getIdToken = useCallback(async () => {
    const { getFirebaseAuth } = await loadAuth();
    const currentUser = getFirebaseAuth().currentUser;

    if (!currentUser) {
      throw new Error("You need to sign in first.");
    }

    return currentUser.getIdToken();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isConfigured,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      getIdToken,
    }),
    [user, isReady, isConfigured, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, getIdToken],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
