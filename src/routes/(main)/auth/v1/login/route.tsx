/**
 * Screen: STUDIO-05
 * Documentation: docs/screens/STUDIO-05-login.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { FitraatAppIcon } from "@/components/brand/fitraat-mark";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { parseAuthRedirectSearch } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { FirebaseConfigAlert } from "../../-components/firebase-config-alert";
import { GoogleSignInButton } from "../../-components/google-sign-in-button";
import { RedirectIfSignedIn } from "../../-components/redirect-if-signed-in";

export const Route = createFileRoute("/(main)/auth/v1/login")({
  validateSearch: parseAuthRedirectSearch,
  component: LoginV1,
});

function LoginV1() {
  const { t } = useI18n();

  return (
    <RedirectIfSignedIn>
      <div className="flex h-dvh">
        <div className="hidden bg-primary lg:block lg:w-1/3">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <FitraatAppIcon className="mx-auto size-16 bg-primary-foreground text-primary ring-0" />
              <div className="space-y-2">
                <h1 className="font-light text-5xl text-primary-foreground">Fitraat Focus</h1>
                <p className="text-primary-foreground/80 text-xl">{t("auth.signInStudio")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
            <LocaleSwitcher />
          </div>
          <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
            <div className="space-y-4 text-center">
              <div className="font-medium tracking-tight">{t("auth.signIn")}</div>
              <div className="mx-auto max-w-xl text-muted-foreground">{t("auth.signInHelp")}</div>
            </div>
            <div className="space-y-4">
              <FirebaseConfigAlert />
              <GoogleSignInButton />
            </div>
          </div>
        </div>
      </div>
    </RedirectIfSignedIn>
  );
}
