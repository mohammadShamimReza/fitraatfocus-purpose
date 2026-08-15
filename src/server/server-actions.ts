import { createServerFn } from "@tanstack/react-start";

import { DEFAULT_LOCALE, isAppLocale, LOCALE_STORAGE_KEY } from "@/lib/i18n/config";
import {
  getPreferencePersistence,
  PREFERENCE_REGISTRY,
  type PreferenceKey,
  type PreferenceValueMap,
  parsePreference,
} from "@/lib/preferences/preferences-config";

async function readCookie(key: string) {
  const { getCookie } = await import("@tanstack/react-start/server");
  return getCookie(key);
}

const getValueFromCookieServer = createServerFn({ method: "GET" })
  .validator((key: string) => key)
  .handler(async ({ data: key }) => readCookie(key));

export async function getValueFromCookie(key: string): Promise<string | undefined> {
  return getValueFromCookieServer({ data: key });
}

type SetCookieInput = {
  key: string;
  value: string;
  options: {
    path?: string;
    maxAge?: number;
  };
};

const setValueToCookieServer = createServerFn({ method: "POST" })
  .validator((data: SetCookieInput) => data)
  .handler(async ({ data }) => {
    const { setCookie } = await import("@tanstack/react-start/server");
    setCookie(data.key, data.value, {
      path: data.options.path ?? "/",
      maxAge: data.options.maxAge ?? 60 * 60 * 24 * 7, // default: 7 days
      sameSite: "lax",
    });
  });

export async function setValueToCookie(
  key: string,
  value: string,
  options: { path?: string; maxAge?: number } = {},
): Promise<void> {
  await setValueToCookieServer({ data: { key, value, options } });
}

const getPreferenceServer = createServerFn({ method: "GET" })
  .validator((key: PreferenceKey) => key)
  .handler(async ({ data: key }) => {
    const definition = PREFERENCE_REGISTRY[key];
    const persistence = getPreferencePersistence(key);

    if (persistence !== "client-cookie" && persistence !== "server-cookie") {
      return definition.defaultValue;
    }

    return parsePreference(key, (await readCookie(key))?.trim());
  });

export async function getPreference<K extends PreferenceKey>(key: K): Promise<PreferenceValueMap[K]> {
  return getPreferenceServer({ data: key }) as Promise<PreferenceValueMap[K]>;
}

const getDashboardLayoutServer = createServerFn({ method: "GET" }).handler(async () => ({
  defaultOpen: (await readCookie("sidebar_state")) !== "false",
  variant: parsePreference("sidebar_variant", (await readCookie("sidebar_variant"))?.trim()),
  collapsible: parsePreference("sidebar_collapsible", (await readCookie("sidebar_collapsible"))?.trim()),
}));

export async function getDashboardLayout() {
  return getDashboardLayoutServer();
}

const getInitialLocaleServer = createServerFn({ method: "GET" }).handler(async () => {
  const value = (await readCookie(LOCALE_STORAGE_KEY))?.trim() ?? "";
  return isAppLocale(value) ? value : DEFAULT_LOCALE;
});

export function getInitialLocale() {
  return getInitialLocaleServer();
}
