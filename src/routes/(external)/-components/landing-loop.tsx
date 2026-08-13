import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

export function LandingLoop() {
  const { t } = useI18n();

  return (
    <section id="how" className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-8 px-4 pb-16 sm:px-6">
      <div className="max-w-2xl space-y-1.5">
        <p className="font-medium text-muted-foreground text-sm">{t("landing.loop.kicker")}</p>
        <h2 className="text-2xl tracking-tight sm:text-3xl">{t("landing.loop.title")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{t("landing.loop.body")}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {STEPS.map((step) => (
          <Card key={step.number} className="shadow-xs">
            <CardHeader className="gap-2">
              <p className="text-muted-foreground text-xs">{step.number}</p>
              <CardTitle className="text-base">{t(step.title)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(step.body)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm">{t("landing.loop.pillarsTitle")}</h3>
        <ul className="flex flex-wrap gap-2">
          {PILLARS.map((pillar) => (
            <li key={pillar} className="rounded-lg border bg-card px-3 py-1.5 text-muted-foreground text-sm">
              {t(pillar)}
            </li>
          ))}
        </ul>
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

const PILLARS: MessageKey[] = [
  "landing.loop.pillar.time",
  "landing.loop.pillar.space",
  "landing.loop.pillar.energy",
  "landing.loop.pillar.resources",
  "landing.loop.pillar.intention",
];
