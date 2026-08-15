import { f as getPreferencePersistence, m as parsePreference, o as PREFERENCE_REGISTRY, p as isAppLocale } from "./preferences-config-1RcgJSw-.mjs";
import { a as setCookie$1, n as createServerFn, r as getCookie, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-actions-CbYbjyqU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getValueFromCookieServer_createServerFn_handler = createServerRpc({
	id: "f9d8ae559166898eb614ac265196b64179a739d9e310b9a94fd53b6d1cc3c447",
	name: "getValueFromCookieServer",
	filename: "src/server/server-actions.ts"
}, (opts) => getValueFromCookieServer.__executeServer(opts));
var getValueFromCookieServer = createServerFn({ method: "GET" }).validator((key) => key).handler(getValueFromCookieServer_createServerFn_handler, ({ data: key }) => getCookie(key));
var setValueToCookieServer_createServerFn_handler = createServerRpc({
	id: "0176c172b4f14ca60481e6038161d67997a0758d5fe5197ac516a6cf465e47ca",
	name: "setValueToCookieServer",
	filename: "src/server/server-actions.ts"
}, (opts) => setValueToCookieServer.__executeServer(opts));
var setValueToCookieServer = createServerFn({ method: "POST" }).validator((data) => data).handler(setValueToCookieServer_createServerFn_handler, ({ data }) => {
	setCookie$1(data.key, data.value, {
		path: data.options.path ?? "/",
		maxAge: data.options.maxAge ?? 604800,
		sameSite: "lax"
	});
});
var getPreferenceServer_createServerFn_handler = createServerRpc({
	id: "2956aca5c7d5dd1cdeb6c495f84aae6dc2a941b9144f2122b7abbca3e8212b4a",
	name: "getPreferenceServer",
	filename: "src/server/server-actions.ts"
}, (opts) => getPreferenceServer.__executeServer(opts));
var getPreferenceServer = createServerFn({ method: "GET" }).validator((key) => key).handler(getPreferenceServer_createServerFn_handler, ({ data: key }) => {
	const definition = PREFERENCE_REGISTRY[key];
	const persistence = getPreferencePersistence(key);
	if (persistence !== "client-cookie" && persistence !== "server-cookie") return definition.defaultValue;
	return parsePreference(key, getCookie(key)?.trim());
});
var getDashboardLayoutServer_createServerFn_handler = createServerRpc({
	id: "684f03a5db59fc91a94338b0308aaff88adf242c5ce92d8852cabd8263a72416",
	name: "getDashboardLayoutServer",
	filename: "src/server/server-actions.ts"
}, (opts) => getDashboardLayoutServer.__executeServer(opts));
var getDashboardLayoutServer = createServerFn({ method: "GET" }).handler(getDashboardLayoutServer_createServerFn_handler, () => ({
	defaultOpen: getCookie("sidebar_state") !== "false",
	variant: parsePreference("sidebar_variant", getCookie("sidebar_variant")?.trim()),
	collapsible: parsePreference("sidebar_collapsible", getCookie("sidebar_collapsible")?.trim())
}));
var getInitialLocaleServer_createServerFn_handler = createServerRpc({
	id: "0a3af5262666a3dc61d50514e406ec9690cb780738e76d23848e9c9299e706ca",
	name: "getInitialLocaleServer",
	filename: "src/server/server-actions.ts"
}, (opts) => getInitialLocaleServer.__executeServer(opts));
var getInitialLocaleServer = createServerFn({ method: "GET" }).handler(getInitialLocaleServer_createServerFn_handler, () => {
	const value = getCookie("fitraat.studio.locale")?.trim() ?? "";
	return isAppLocale(value) ? value : "en";
});
//#endregion
export { getDashboardLayoutServer_createServerFn_handler, getInitialLocaleServer_createServerFn_handler, getPreferenceServer_createServerFn_handler, getValueFromCookieServer_createServerFn_handler, setValueToCookieServer_createServerFn_handler };
