import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

import { LandingKicker, LandingReveal } from "./landing-reveal";

export function LandingApp() {
  const { t } = useI18n();

  return (
    <section id="app" className="scroll-mt-20 border-y bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal className="max-w-2xl space-y-3">
          <LandingKicker>{t("landing.loop.kicker")}</LandingKicker>
          <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.loop.title")}</h2>
          <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            {t("landing.loop.body")}
          </p>
        </LandingReveal>

        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-[10%] left-[10%] hidden h-px bg-border lg:block"
          />
          {STEPS.map((step, index) => (
            <LandingReveal key={step.number} delayMs={index * 70}>
              <li className="relative flex flex-col gap-3">
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full border bg-background font-medium text-xs tabular-nums">
                  {step.number}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-medium text-sm">{t(step.title)}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{t(step.body)}</p>
                </div>
              </li>
            </LandingReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEPS: { number: string; title: MessageKey; body: MessageKey }[] = [
  { number: "01", title: "landing.loop.prepare", body: "landing.loop.prepareBody" },
  { number: "02", title: "landing.loop.activate", body: "landing.loop.activateBody" },
  { number: "03", title: "landing.loop.focus", body: "landing.loop.focusBody" },
  { number: "04", title: "landing.loop.close", body: "landing.loop.closeBody" },
  { number: "05", title: "landing.loop.reflect", body: "landing.loop.reflectBody" },
];
