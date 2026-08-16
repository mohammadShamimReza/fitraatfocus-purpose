import { useState } from "react";

import { Link } from "@tanstack/react-router";

import { ArrowUpRight } from "lucide-react";

import { FitraatMark } from "@/components/brand/fitraat-mark";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useAuth } from "@/lib/auth/auth-provider";
import { CREATE_SYSTEM_PATH } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";

import { InteractiveLibrary, USE_STAGES, type UseStage } from "./landing-library-play";
import { LandingKicker } from "./landing-reveal";
import { UseInAppNote } from "./use-in-app-note";

const CHIPS: MessageKey[] = ["landing.hero.chip.1", "landing.hero.chip.2", "landing.hero.chip.3"];

export function LandingHero() {
  const { t } = useI18n();
  const { user, isReady } = useAuth();
  const [stage, setStage] = useState<UseStage>("open");
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,var(--muted),transparent_70%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-7">
          <div className="max-w-xl space-y-5">
            <div
              className="landing-rise flex items-center gap-2 text-muted-foreground"
              style={{ animationDelay: "40ms" }}
            >
              <FitraatMark className="size-4 text-foreground" />
              <LandingKicker>{t("landing.hero.kicker")}</LandingKicker>
            </div>
            <h1
              className="landing-rise font-semibold text-5xl tracking-tight sm:text-6xl lg:text-[4.25rem] lg:leading-[0.98]"
              style={{ animationDelay: "120ms" }}
            >
              {t("landing.hero.title")}
              <span className="mt-2 block text-muted-foreground">{t("landing.hero.titleAccent")}</span>
            </h1>
            <p
              className="landing-rise max-w-md text-base text-muted-foreground leading-relaxed sm:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              {t("landing.hero.body")}
            </p>
            <div className="landing-rise flex flex-wrap gap-2" style={{ animationDelay: "240ms" }}>
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border bg-background/80 px-3 py-1 text-muted-foreground text-xs"
                >
                  {t(chip)}
                </span>
              ))}
            </div>
          </div>
          <div className="landing-rise flex flex-wrap gap-2" style={{ animationDelay: "280ms" }}>
            <Button size="lg" nativeButton={false} render={<Link to="/systems" />}>
              {t("landing.hero.browse")}
            </Button>
            <Button
              size="lg"
              nativeButton={false}
              variant="outline"
              render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}
            >
              {t("landing.hero.openApp")}
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button size="lg" nativeButton={false} variant="ghost" render={createLink}>
              {t("landing.hero.create")}
            </Button>
          </div>
          <UseInAppNote className="landing-rise max-w-md" />
        </div>

        <div className="landing-rise relative" style={{ animationDelay: "220ms" }}>
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-muted/80 blur-3xl" />
          <div className="relative">
            <InteractiveLibrary compact stage={stage} onStage={setStage} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {USE_STAGES.map((item, index) => {
            const active = stage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStage(item.id)}
                className={cn(
                  "landing-rise rounded-2xl border px-4 py-4 text-left transition-colors",
                  active ? "border-foreground/20 bg-card shadow-sm" : "bg-background/70 hover:bg-card",
                )}
                style={{ animationDelay: `${360 + index * 70}ms` }}
              >
                <p className="font-medium text-muted-foreground text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-medium text-sm">{t(item.title)}</p>
                <p className="mt-1 text-muted-foreground text-xs leading-relaxed">{t(item.body)}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
