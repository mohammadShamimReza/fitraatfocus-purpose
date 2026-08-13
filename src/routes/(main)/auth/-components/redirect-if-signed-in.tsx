import { type ReactNode, useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/auth/auth-provider";

export function RedirectIfSignedIn({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && user) {
      void navigate({ to: "/dashboard/systems", replace: true });
    }
  }, [isReady, navigate, user]);

  if (!isReady) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">Checking your session</span>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return children;
}
