import { useState } from "react";

import { useNavigate, useRouterState } from "@tanstack/react-router";

import { toast } from "@/components/ui/toast";
import { getAuthErrorKey } from "@/lib/auth/auth-errors";
import { useAuth } from "@/lib/auth/auth-provider";
import { getPostAuthPath } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { GoogleButton } from "./social-auth/google-button";

export function GoogleSignInButton() {
  const { signInWithGoogle, isConfigured } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const postAuthPath = useRouterState({
    select: (state) => getPostAuthPath(state.location.search),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClick = async () => {
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
      await navigate({ href: postAuthPath, replace: true });
    } catch (error) {
      toast.add({
        title: t("auth.googleFailed"),
        description: t(getAuthErrorKey(error)),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GoogleButton
      className="w-full"
      variant="outline"
      type="button"
      disabled={!isConfigured || isSubmitting}
      onClick={() => {
        void onClick();
      }}
    >
      {t("auth.continueGoogle")}
    </GoogleButton>
  );
}
