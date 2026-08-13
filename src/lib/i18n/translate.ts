import type { AppLocale } from "./config";
import { bn } from "./messages/bn";
import { en, type MessageKey } from "./messages/en";

const dictionaries: Record<AppLocale, Record<MessageKey, string>> = { en, bn };

export type TranslateVars = Record<string, string | number>;

export function translate(locale: AppLocale, key: MessageKey, vars?: TranslateVars): string {
  const template = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
  if (!vars) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = vars[name];
    return value === undefined ? `{${name}}` : String(value);
  });
}

export type TranslateFn = (key: MessageKey, vars?: TranslateVars) => string;
