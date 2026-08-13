import { type ReactNode, useEffect } from "react";

import { useNavigate, useRouterState } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { useAuth } from "./auth-provider";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (isReady && !user) {
      void navigate({
        to: "/auth/v1/login",
        search: { redirect: pathname },
        replace: true,
      });
    }
  }, [isReady, navigate, pathname, user]);

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">{t("auth.checkingSession")}</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
