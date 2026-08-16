import { type ReactNode, useEffect } from "react";

import { useNavigate, useRouterState } from "@tanstack/react-router";

import { SessionSkeleton } from "@/components/page-skeletons";
import { useAuth } from "@/lib/auth/auth-provider";
import { getPostAuthPath } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function RedirectIfSignedIn({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const { t } = useI18n();
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
    return <SessionSkeleton label={t("auth.checkingSession")} />;
  }

  if (user) {
    return null;
  }

  return children;
}
