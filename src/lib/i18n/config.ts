export const LOCALES = ["en", "bn"] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";
export const LOCALE_STORAGE_KEY = "fitraat.studio.locale";

export const LOCALE_META: Record<AppLocale, { label: string; nativeLabel: string; htmlLang: string }> = {
  en: { label: "English", nativeLabel: "English", htmlLang: "en" },
  bn: { label: "Bengali", nativeLabel: "বাংলা", htmlLang: "bn" },
};

export function isAppLocale(value: string): value is AppLocale {
  return LOCALES.includes(value as AppLocale);
}
