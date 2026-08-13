import { Link } from "@tanstack/react-router";

import { ArrowUpRight } from "lucide-react";

import { FitraatMark } from "@/components/brand/fitraat-mark";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useAuth } from "@/lib/auth/auth-provider";
import { CREATE_SYSTEM_PATH } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

export function LandingHero() {
  const { t } = useI18n();
  const { user, isReady } = useAuth();
  const createLink =
    isReady && user ? (
      <Link to="/dashboard/systems/new" />
    ) : (
      <Link to="/auth/v1/login" search={{ redirect: CREATE_SYSTEM_PATH }} />
    );

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FitraatMark className="size-4 text-foreground" />
          <p className="font-medium text-sm">{t("landing.hero.kicker")}</p>
        </div>
        <h1 className="text-4xl tracking-tight sm:text-5xl">
          {t("landing.hero.title")}
          <span className="block text-muted-foreground">{t("landing.hero.titleAccent")}</span>
        </h1>
        <p className="max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">{t("landing.hero.body")}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button nativeButton={false} render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}>
          {t("landing.hero.openApp")}
          <ArrowUpRight data-icon="inline-end" />
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link to="/" hash="systems" />}>
          {t("landing.hero.browse")}
        </Button>
        <Button nativeButton={false} variant="ghost" render={createLink}>
          {t("landing.hero.create")}
        </Button>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <div key={item.label} className="rounded-xl border bg-card px-4 py-3">
            <dt className="font-medium text-sm">{t(item.label)}</dt>
            <dd className="mt-1 text-muted-foreground text-xs leading-relaxed">{t(item.detail)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const HIGHLIGHTS: { label: MessageKey; detail: MessageKey }[] = [
  { label: "landing.stat.loop", detail: "landing.stat.loopDetail" },
  { label: "landing.stat.pillars", detail: "landing.stat.pillarsDetail" },
  { label: "landing.stat.lang", detail: "landing.stat.langDetail" },
  { label: "landing.stat.platforms", detail: "landing.stat.platformsDetail" },
];
