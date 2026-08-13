import { type ReactNode, useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";

import { useAuth } from "./auth-provider";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !user) {
      void navigate({ to: "/auth/v1/login", replace: true });
    }
  }, [isReady, navigate, user]);

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">Checking your session</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
