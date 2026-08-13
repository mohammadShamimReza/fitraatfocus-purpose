import { useI18n } from "@/lib/i18n/i18n-provider";

export function LocalOnlyNote() {
  const { t } = useI18n();

  return <p className="text-muted-foreground text-xs">{t("systems.localNote")}</p>;
}
