import { Link } from "@tanstack/react-router";

import { ArrowUpRight, BadgeCheck, Copy, Layers, Target } from "lucide-react";

import { FitraatMark } from "@/components/brand/fitraat-mark";
import { StudioGif } from "@/components/studio-gif";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useAuth } from "@/lib/auth/auth-provider";
import { CREATE_SYSTEM_PATH } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

import { LandingKicker } from "./landing-reveal";

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
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--muted),transparent_70%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-8">
          <div className="max-w-xl space-y-5">
            <div
              className="landing-rise flex items-center gap-2 text-muted-foreground"
              style={{ animationDelay: "40ms" }}
            >
              <FitraatMark className="size-4 text-foreground" />
              <LandingKicker>{t("landing.hero.kicker")}</LandingKicker>
            </div>
            <h1
              className="landing-rise font-semibold text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
              style={{ animationDelay: "120ms" }}
            >
              {t("landing.hero.title")}
              <span className="mt-2 block text-muted-foreground">{t("landing.hero.titleAccent")}</span>
            </h1>
            <p
              className="landing-rise max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              {t("landing.hero.body")}
            </p>
          </div>
          <div className="landing-rise flex flex-wrap gap-2" style={{ animationDelay: "280ms" }}>
            <Button size="lg" nativeButton={false} render={<Link to="/systems" />}>
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
              {t("landing.hero.openApp")}
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="landing-rise" style={{ animationDelay: "220ms" }}>
          <HeroPreview />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="landing-rise rounded-xl border bg-card/80 px-4 py-4 backdrop-blur-sm"
                style={{ animationDelay: `${360 + index * 70}ms` }}
              >
                <dt className="flex items-center gap-2 font-medium text-sm">
                  <Icon className="size-3.5 text-muted-foreground" />
                  {t(item.label)}
                </dt>
                <dd className="mt-1.5 text-muted-foreground text-xs leading-relaxed">{t(item.detail)}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function HeroPreview() {
  const { t } = useI18n();

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-muted/70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-muted-foreground/40" />
            <span className="size-2 rounded-full bg-muted-foreground/25" />
            <span className="size-2 rounded-full bg-muted-foreground/15" />
          </div>
          <p className="font-medium text-muted-foreground text-xs">{t("landing.preview.live")}</p>
        </div>
        <div className="flex justify-center border-b bg-muted/20 px-5 py-4">
          <StudioGif id="purpose-library" alt={t("gif.library")} size={140} />
        </div>
        <div className="space-y-4 p-5">
          {PREVIEW_ROWS.map((row, index) => (
            <div key={row.title} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 font-medium text-muted-foreground text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 space-y-1 pt-0.5">
                <p className="font-medium text-sm">{t(row.title)}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{t(row.body)}</p>
                {index === 3 ? (
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-muted" />
                    <div className="h-1.5 w-4/5 rounded-full bg-muted" />
                    <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HIGHLIGHTS: { label: MessageKey; detail: MessageKey; icon: typeof Target }[] = [
  { label: "landing.stat.purpose", detail: "landing.stat.purposeDetail", icon: Target },
  { label: "landing.stat.library", detail: "landing.stat.libraryDetail", icon: Layers },
  { label: "landing.stat.creators", detail: "landing.stat.creatorsDetail", icon: BadgeCheck },
  { label: "landing.stat.copy", detail: "landing.stat.copyDetail", icon: Copy },
];

const PREVIEW_ROWS: { title: MessageKey; body: MessageKey }[] = [
  { title: "landing.system.1.title", body: "landing.system.1.body" },
  { title: "landing.system.2.title", body: "landing.system.2.body" },
  { title: "landing.system.3.title", body: "landing.system.3.body" },
  { title: "landing.system.4.title", body: "landing.system.4.body" },
];
