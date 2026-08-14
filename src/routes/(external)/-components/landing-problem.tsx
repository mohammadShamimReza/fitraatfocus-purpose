import { StudioGif } from "@/components/studio-gif";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";

import { landingCardClass, LandingKicker, LandingReveal } from "./landing-reveal";

export function LandingProblem() {
  const { t } = useI18n();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <LandingReveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <LandingKicker>{t("landing.problem.kicker")}</LandingKicker>
          <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
            {t("landing.problem.title")}
            <span className="mt-1 block text-muted-foreground">{t("landing.problem.titleAccent")}</span>
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            {t("landing.problem.body")}
          </p>
        </div>
        <StudioGif id="purpose-complete" alt={t("gif.complete")} size={140} className="self-start sm:self-center" />
      </LandingReveal>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROBLEMS.map((item, index) => (
          <LandingReveal key={item.title} delayMs={index * 80}>
            <Card className={cn("h-full shadow-none", landingCardClass)}>
              <CardHeader className="gap-2">
                <p className="font-medium text-muted-foreground text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="text-base">{t(item.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.body)}</p>
              </CardContent>
            </Card>
          </LandingReveal>
        ))}
      </div>
    </section>
  );
}

const PROBLEMS: { title: MessageKey; body: MessageKey }[] = [
  { title: "landing.problem.1.title", body: "landing.problem.1.body" },
  { title: "landing.problem.2.title", body: "landing.problem.2.body" },
  { title: "landing.problem.3.title", body: "landing.problem.3.body" },
  { title: "landing.problem.4.title", body: "landing.problem.4.body" },
];
