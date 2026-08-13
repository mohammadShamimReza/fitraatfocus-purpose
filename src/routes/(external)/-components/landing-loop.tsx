import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";

import { landingCardClass, LandingKicker, LandingReveal } from "./landing-reveal";

export function LandingLoop() {
  const { t } = useI18n();

  return (
    <section id="how" className="scroll-mt-20 border-y bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal className="max-w-2xl space-y-3">
          <LandingKicker>{t("landing.system.kicker")}</LandingKicker>
          <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.system.title")}</h2>
          <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            {t("landing.system.body")}
          </p>
        </LandingReveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {PARTS.map((part, index) => (
            <LandingReveal key={part.number} delayMs={index * 80}>
              <Card className={cn("h-full shadow-none", landingCardClass)}>
                <CardHeader className="gap-2">
                  <p className="font-medium text-muted-foreground text-xs tabular-nums">{part.number}</p>
                  <CardTitle className="text-base">{t(part.title)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(part.body)}</p>
                </CardContent>
              </Card>
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PARTS: { number: string; title: MessageKey; body: MessageKey }[] = [
  { number: "01", title: "landing.system.1.title", body: "landing.system.1.body" },
  { number: "02", title: "landing.system.2.title", body: "landing.system.2.body" },
  { number: "03", title: "landing.system.3.title", body: "landing.system.3.body" },
  { number: "04", title: "landing.system.4.title", body: "landing.system.4.body" },
];
