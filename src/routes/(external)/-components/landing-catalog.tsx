import { Link } from "@tanstack/react-router";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { LandingKicker, LandingReveal } from "./landing-reveal";
import { LANDING_SAMPLES, LandingSampleCard } from "./landing-sample-card";

export function LandingCatalog() {
  const { t } = useI18n();

  return (
    <section
      id="systems"
      className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20"
    >
      <LandingReveal className="flex max-w-2xl flex-col gap-3">
        <LandingKicker>{t("landing.catalog.kicker")}</LandingKicker>
        <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.showcase.title")}</h2>
        <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          {t("landing.showcase.body")}
        </p>
      </LandingReveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {LANDING_SAMPLES.map((sample, index) => (
          <LandingReveal key={sample.id} delayMs={index * 60}>
            <LandingSampleCard sample={sample} />
          </LandingReveal>
        ))}
      </div>

      <LandingReveal delayMs={180}>
        <Button size="lg" nativeButton={false} className="w-fit" render={<Link to="/systems" />}>
          {t("landing.hero.browse")}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </LandingReveal>
    </section>
  );
}
