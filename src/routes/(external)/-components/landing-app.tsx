import { useState } from "react";

import { Check } from "lucide-react";

import { StudioGif } from "@/components/studio-gif";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";

import { LandingKicker, LandingReveal } from "./landing-reveal";
import { UseInAppNote } from "./use-in-app-note";

export function LandingApp() {
  const { t } = useI18n();
  const [active, setActive] = useState(2);
  const [done, setDone] = useState(false);
  const step = STEPS[active] ?? STEPS[2];
  if (!step) {
    return null;
  }

  return (
    <section id="app" className="scroll-mt-20 border-y bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <LandingKicker>{t("landing.loop.kicker")}</LandingKicker>
            <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.loop.title")}</h2>
            <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
              {t("landing.loop.body")}
            </p>
            <UseInAppNote />
          </div>
          <StudioGif id="purpose-plan" alt={t("gif.plan")} size={140} className="self-start sm:self-center" />
        </LandingReveal>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
          <ol className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {STEPS.map((item, index) => (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    active === index ? "border-foreground/20 bg-card shadow-sm" : "bg-background/60 hover:bg-card",
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background font-medium text-xs tabular-nums">
                    {item.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-sm">{t(item.title)}</span>
                    <span className="mt-0.5 block text-muted-foreground text-xs leading-relaxed">{t(item.body)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="font-medium text-sm">{t(step.title)}</p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{t(step.hint)}</p>
            <div className="mt-4 rounded-xl border px-3 py-3">
              <p className="text-muted-foreground text-xs">
                {t("landing.play.from", { system: t("landing.sample.1.title") })}
              </p>
              <p className={cn("mt-1 text-sm", done && "text-muted-foreground line-through")}>
                {t("landing.demo.task.1")}
              </p>
              <Button
                className="mt-3"
                size="sm"
                variant={done ? "secondary" : "outline"}
                onClick={() => setDone((value) => !value)}
              >
                {done ? <Check /> : null}
                {done ? t("landing.play.done") : t("landing.play.markDone")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS: { number: string; title: MessageKey; body: MessageKey; hint: MessageKey }[] = [
  { number: "01", title: "landing.loop.prepare", body: "landing.loop.prepareBody", hint: "landing.loop.prepareHint" },
  {
    number: "02",
    title: "landing.loop.activate",
    body: "landing.loop.activateBody",
    hint: "landing.loop.activateHint",
  },
  { number: "03", title: "landing.loop.focus", body: "landing.loop.focusBody", hint: "landing.loop.focusHint" },
  { number: "04", title: "landing.loop.close", body: "landing.loop.closeBody", hint: "landing.loop.closeHint" },
  { number: "05", title: "landing.loop.reflect", body: "landing.loop.reflectBody", hint: "landing.loop.reflectHint" },
];
