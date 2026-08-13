import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { setClientCookie } from "@/lib/cookie";

import { type AppLocale, DEFAULT_LOCALE, isAppLocale, LOCALE_META, LOCALE_STORAGE_KEY } from "./config";
import type { MessageKey } from "./messages/en";
import { type TranslateFn, type TranslateVars, translate } from "./translate";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: TranslateFn;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function persistLocale(locale: AppLocale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked in private mode.
  }

  setClientCookie(LOCALE_STORAGE_KEY, locale, 365);
  document.documentElement.lang = LOCALE_META[locale].htmlLang;
}

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: AppLocale;
}) {
  const [locale, setLocaleState] = useState<AppLocale>(isAppLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE);

  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const t = useCallback((key: MessageKey, vars?: TranslateVars) => translate(locale, key, vars), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const fallbackI18n: I18nContextValue = {
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
  t: (key, vars) => translate(DEFAULT_LOCALE, key, vars),
};

export function useI18n(): I18nContextValue {
  return useContext(I18nContext) ?? fallbackI18n;
}
