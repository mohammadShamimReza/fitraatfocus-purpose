import { ArrowUpRight } from "lucide-react";

import { APP_LINKS } from "@/config/app-config";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { cn } from "@/lib/utils";

export function UseInAppNote({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <p className={cn("text-muted-foreground text-sm leading-relaxed", className)}>
      {t("landing.appNote")}{" "}
      <a
        href={APP_LINKS.webApp}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-foreground underline-offset-4 hover:underline"
      >
        {t("landing.appNoteCta")}
        <ArrowUpRight className="size-3.5" />
      </a>
    </p>
  );
}
