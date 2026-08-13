import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function LandingGetApp() {
  const { t } = useI18n();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex flex-col gap-6 rounded-xl border bg-card px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl tracking-tight">{t("landing.cta.title")}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{t("landing.cta.body")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button nativeButton={false} render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}>
            {t("landing.cta.web")}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href={APP_LINKS.playStore} target="_blank" rel="noreferrer" />}
          >
            {t("landing.cta.play")}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href={APP_LINKS.iPhoneGuide} target="_blank" rel="noreferrer" />}
          >
            {t("landing.cta.iphone")}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
