import { Link } from "@tanstack/react-router";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useAuth } from "@/lib/auth/auth-provider";
import { CREATE_SYSTEM_PATH } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { LandingReveal } from "./landing-reveal";

export function LandingGetApp() {
  const { t } = useI18n();
  const { user, isReady } = useAuth();
  const createLink =
    isReady && user ? (
      <Link to="/dashboard/systems/new" />
    ) : (
      <Link to="/auth/v1/login" search={{ redirect: CREATE_SYSTEM_PATH }} />
    );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
      <LandingReveal>
        <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,var(--muted),transparent_65%)]"
          />
          <div className="relative flex flex-col gap-8">
            <div className="max-w-xl space-y-3">
              <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.cta.title")}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">{t("landing.cta.body")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="lg" nativeButton={false} render={<Link to="/" hash="systems" />}>
                {t("landing.hero.browse")}
              </Button>
              <Button size="lg" nativeButton={false} variant="outline" render={createLink}>
                {t("landing.hero.create")}
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                variant="ghost"
                render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}
              >
                {t("landing.cta.web")}
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                variant="ghost"
                render={<a href={APP_LINKS.playStore} target="_blank" rel="noreferrer" />}
              >
                {t("landing.cta.play")}
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                variant="ghost"
                render={<a href={APP_LINKS.iPhoneGuide} target="_blank" rel="noreferrer" />}
              >
                {t("landing.cta.iphone")}
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>
      </LandingReveal>
    </section>
  );
}
