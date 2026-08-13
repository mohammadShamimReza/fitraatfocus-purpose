import { type ReactNode, useEffect } from "react";

import { useNavigate, useRouterState } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/auth/auth-provider";
import { getPostAuthPath } from "@/lib/auth/post-auth-path";

export function RedirectIfSignedIn({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();
  const postAuthPath = useRouterState({
    select: (state) => getPostAuthPath(state.location.search),
  });

  useEffect(() => {
    if (isReady && user) {
      void navigate({ href: postAuthPath, replace: true });
    }
  }, [isReady, navigate, postAuthPath, user]);

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
