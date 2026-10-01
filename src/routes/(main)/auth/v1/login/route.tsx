/**
 * Screen: STUDIO-05
 * Documentation: docs/screens/STUDIO-05-login.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { Compass, Sparkles, Target, Users } from "lucide-react";

import { FitraatAppIcon } from "@/components/brand/fitraat-mark";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { APP_CONFIG } from "@/config/app-config";
import { parseAuthRedirectSearch } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { en } from "@/lib/i18n/messages/en";
import { privatePageHead } from "@/lib/seo/head";

import { FirebaseConfigAlert } from "../../-components/firebase-config-alert";
import { GoogleSignInButton } from "../../-components/google-sign-in-button";
import { RedirectIfSignedIn } from "../../-components/redirect-if-signed-in";

export const Route = createFileRoute("/(main)/auth/v1/login")({
  validateSearch: parseAuthRedirectSearch,
  head: () => privatePageHead(en["auth.signIn"]),
  component: LoginV1,
});

function LoginV1() {
  const { t } = useI18n();

  return (
    <RedirectIfSignedIn>
      <div className="flex h-dvh">
        <div className="relative hidden overflow-hidden bg-primary lg:block lg:w-1/3">
          <div className="-top-12 -left-10 absolute h-44 w-44 rounded-full bg-primary-foreground/15 blur-2xl motion-safe:animate-pulse" />
          <div className="absolute right-8 bottom-12 h-36 w-36 rounded-full bg-primary-foreground/10 blur-2xl motion-safe:animate-pulse [animation-delay:900ms]" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/20" />
          <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
          <div className="absolute top-[22%] left-[62%] rounded-full bg-primary-foreground/90 p-2 text-primary shadow-md motion-safe:animate-bounce [animation-duration:7s] [animation-delay:400ms]">
            <Compass className="size-4" />
          </div>
          <div className="absolute top-[68%] left-[26%] rounded-full bg-primary-foreground/90 p-2 text-primary shadow-md motion-safe:animate-bounce [animation-duration:8s] [animation-delay:1000ms]">
            <Sparkles className="size-4" />
          </div>
          <div className="absolute top-20 left-8 rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-primary-foreground backdrop-blur-md motion-safe:animate-bounce [animation-delay:200ms] [animation-duration:5s]">
            <div className="flex items-center gap-2">
              <Target className="size-4" />
              <span className="text-xs tracking-wide">Clear Outcome</span>
            </div>
          </div>
          <div className="absolute right-8 bottom-24 rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-primary-foreground backdrop-blur-md motion-safe:animate-bounce [animation-delay:700ms] [animation-duration:6s]">
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <span className="text-xs tracking-wide">Creator Impact</span>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <FitraatAppIcon className="mx-auto size-16 bg-primary-foreground text-primary ring-0" />
              <div className="space-y-2">
                <h1 className="font-light text-5xl text-primary-foreground">{APP_CONFIG.logo}</h1>
                <p className="text-primary-foreground/80 text-xl">{t("auth.signInStudio")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center overflow-hidden bg-background p-8 lg:w-2/3">
          <div className="absolute -top-8 right-16 h-28 w-28 rounded-full bg-primary/10 blur-xl motion-safe:animate-pulse" />
          <div className="absolute bottom-16 left-10 h-24 w-24 rounded-full bg-primary/10 blur-xl motion-safe:animate-pulse [animation-delay:1200ms]" />
          <div className="absolute top-1/2 right-1/4 h-14 w-14 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/5 motion-safe:animate-pulse [animation-delay:600ms]" />
          <div className="absolute top-16 left-20 h-20 w-20 rounded-full border border-dashed border-primary/30 motion-safe:animate-spin [animation-duration:14s]" />
          <div className="absolute right-20 bottom-20 h-16 w-16 rounded-full border border-dashed border-primary/20 motion-safe:animate-spin [animation-duration:18s] [animation-direction:reverse]" />
          <div className="absolute left-[18%] top-[62%] rounded-xl border border-primary/20 bg-background/85 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-md motion-safe:animate-bounce [animation-duration:7s] [animation-delay:500ms]">
            Creator-first flow
          </div>
          <div className="absolute right-[14%] top-[38%] rounded-xl border border-primary/20 bg-background/85 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-md motion-safe:animate-bounce [animation-duration:8s] [animation-delay:900ms]">
            Public catalog
          </div>
          <div className="absolute top-24 right-24 hidden rounded-2xl border border-primary/20 bg-background/80 px-3 py-2 text-foreground shadow-sm backdrop-blur-md xl:block motion-safe:animate-bounce [animation-delay:300ms] [animation-duration:6s]">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-medium">Build Once. Guide Many.</span>
            </div>
          </div>
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
