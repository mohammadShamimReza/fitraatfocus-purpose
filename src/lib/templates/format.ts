import { formatDistanceToNow } from "date-fns";
import { bn, enUS } from "date-fns/locale";

import { type AppLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/translate";

const DATE_LOCALES = {
  en: enUS,
  bn,
} as const;

export function formatUpdatedAt(value: string, locale: AppLocale = DEFAULT_LOCALE): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return translate(locale, "common.justNow");
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: DATE_LOCALES[locale] });
}

export function formatCount(value: number, locale: AppLocale = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en", { maximumFractionDigits: 0 }).format(value);
}
