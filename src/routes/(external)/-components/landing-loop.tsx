import { useState } from "react";

import { useI18n } from "@/lib/i18n/i18n-provider";
import { cn } from "@/lib/utils";

import { InteractiveLibrary, USE_STAGES, type UseStage } from "./landing-library-play";
import { LandingKicker, LandingReveal } from "./landing-reveal";
import { UseInAppNote } from "./use-in-app-note";

export function LandingLoop() {
  const { t } = useI18n();
  const [stage, setStage] = useState<UseStage>("open");

  return (
    <section id="how" className="scroll-mt-20 border-y bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal className="max-w-2xl space-y-3">
          <LandingKicker>{t("landing.use.kicker")}</LandingKicker>
          <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.use.title")}</h2>
          <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">{t("landing.use.body")}</p>
          <UseInAppNote />
        </LandingReveal>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {USE_STAGES.map((item, index) => {
              const active = stage === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setStage(item.id)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-4 text-left transition-colors",
                      active ? "border-foreground/20 bg-card shadow-sm" : "bg-background/60 hover:bg-card",
                    )}
                  >
                    <p className="font-medium text-muted-foreground text-xs tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-medium text-sm">{t(item.title)}</p>
                    <p className="mt-1 text-muted-foreground text-xs leading-relaxed">{t(item.body)}</p>
                  </button>
                </li>
              );
            })}
          </ol>

          <InteractiveLibrary stage={stage} onStage={setStage} />
        </div>
      </div>
    </section>
  );
}
