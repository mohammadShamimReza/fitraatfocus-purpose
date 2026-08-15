//#region node_modules/.nitro/vite/services/ssr/assets/preferences-config-1RcgJSw-.js
function googleFonts(faces) {
	return `https://fonts.googleapis.com/css2?${faces.map((face) => `family=${face.family.replaceAll(" ", "+")}:${face.axes ?? "wght@400..700"}`).join("&")}&display=swap`;
}
function googleFont(family, axes = "wght@400..700") {
	return googleFonts([{
		family,
		axes
	}]);
}
function fontCssFamily(font) {
	return `${[font.family, ...font.companions ?? []].map((name) => `"${name}"`).join(", ")}, ${font.fallback}`;
}
var fontRegistry = {
	fitraat: {
		label: "Fitraat",
		family: "Plus Jakarta Sans",
		companions: [
			"Hind Siliguri",
			"Kohinoor Bangla",
			"Nirmala UI"
		],
		fallback: "sans-serif",
		stylesheet: googleFonts([{ family: "Plus Jakarta Sans" }, {
			family: "Hind Siliguri",
			axes: "wght@400;500;600;700"
		}])
	},
	geist: {
		label: "Geist",
		family: "Geist",
		fallback: "sans-serif",
		stylesheet: googleFont("Geist")
	},
	inter: {
		label: "Inter",
		family: "Inter",
		fallback: "sans-serif",
		stylesheet: googleFont("Inter")
	},
	notoSans: {
		label: "Noto Sans",
		family: "Noto Sans",
		fallback: "sans-serif",
		stylesheet: googleFont("Noto Sans")
	},
	nunitoSans: {
		label: "Nunito Sans",
		family: "Nunito Sans",
		fallback: "sans-serif",
		stylesheet: googleFont("Nunito Sans")
	},
	figtree: {
		label: "Figtree",
		family: "Figtree",
		fallback: "sans-serif",
		stylesheet: googleFont("Figtree")
	},
	roboto: {
		label: "Roboto",
		family: "Roboto",
		fallback: "sans-serif",
		stylesheet: googleFont("Roboto")
	},
	raleway: {
		label: "Raleway",
		family: "Raleway",
		fallback: "sans-serif",
		stylesheet: googleFont("Raleway")
	},
	dmSans: {
		label: "DM Sans",
		family: "DM Sans",
		fallback: "sans-serif",
		stylesheet: googleFont("DM Sans")
	},
	publicSans: {
		label: "Public Sans",
		family: "Public Sans",
		fallback: "sans-serif",
		stylesheet: googleFont("Public Sans")
	},
	outfit: {
		label: "Outfit",
		family: "Outfit",
		fallback: "sans-serif",
		stylesheet: googleFont("Outfit")
	},
	geistMono: {
		label: "Geist Mono",
		family: "Geist Mono",
		fallback: "monospace",
		stylesheet: googleFont("Geist Mono")
	},
	geistPixelSquare: {
		label: "Geist Pixel Square",
		family: "Geist Pixel",
		fallback: "sans-serif",
		stylesheet: googleFont("Geist Pixel", "ELSH@1"),
		variationSettings: "\"ELSH\" 1"
	},
	jetBrainsMono: {
		label: "JetBrains Mono",
		family: "JetBrains Mono",
		fallback: "monospace",
		stylesheet: googleFont("JetBrains Mono")
	},
	notoSerif: {
		label: "Noto Serif",
		family: "Noto Serif",
		fallback: "serif",
		stylesheet: googleFont("Noto Serif")
	},
	robotoSlab: {
		label: "Roboto Slab",
		family: "Roboto Slab",
		fallback: "serif",
		stylesheet: googleFont("Roboto Slab")
	},
	merriweather: {
		label: "Merriweather",
		family: "Merriweather",
		fallback: "serif",
		stylesheet: googleFont("Merriweather")
	},
	lora: {
		label: "Lora",
		family: "Lora",
		fallback: "serif",
		stylesheet: googleFont("Lora")
	},
	playfairDisplay: {
		label: "Playfair Display",
		family: "Playfair Display",
		fallback: "serif",
		stylesheet: googleFont("Playfair Display")
	}
};
var fontKeys = Object.keys(fontRegistry);
var fontOptions = fontKeys.map((key) => ({
	key,
	label: fontRegistry[key].label
}));
var fontBootRegistry = Object.fromEntries(fontKeys.map((key) => {
	const font = fontRegistry[key];
	return [key, {
		family: font.family,
		fallback: font.fallback,
		stylesheet: font.stylesheet,
		variationSettings: "variationSettings" in font ? font.variationSettings : void 0,
		companions: "companions" in font ? font.companions : void 0
	}];
}));
var LOCALES = ["en", "bn"];
var LOCALE_STORAGE_KEY = "fitraat.studio.locale";
var LOCALE_META = {
	en: {
		label: "English",
		nativeLabel: "English",
		htmlLang: "en"
	},
	bn: {
		label: "Bengali",
		nativeLabel: "বাংলা",
		htmlLang: "bn"
	}
};
function isAppLocale(value) {
	return LOCALES.includes(value);
}
var SIDEBAR_VARIANT_VALUES = [
	{
		label: "Sidebar",
		value: "sidebar"
	},
	{
		label: "Inset",
		value: "inset"
	},
	{
		label: "Floating",
		value: "floating"
	}
].map((v) => v.value);
var SIDEBAR_COLLAPSIBLE_VALUES = [{
	label: "Icon",
	value: "icon"
}, {
	label: "Offcanvas",
	value: "offcanvas"
}].map((v) => v.value);
var CONTENT_LAYOUT_VALUES = [{
	label: "Centered",
	value: "centered"
}, {
	label: "Full Width",
	value: "full-width"
}].map((v) => v.value);
var NAVBAR_STYLE_VALUES = [{
	label: "Sticky",
	value: "sticky"
}, {
	label: "Scroll",
	value: "scroll"
}].map((v) => v.value);
var THEME_MODE_VALUES = [
	{
		label: "Light",
		value: "light"
	},
	{
		label: "Dark",
		value: "dark"
	},
	{
		label: "System",
		value: "system"
	}
].map((o) => o.value);
var THEME_PRESET_OPTIONS = [
	{
		label: "Default",
		value: "default",
		primary: {
			light: "oklch(0.205 0 0)",
			dark: "oklch(0.922 0 0)"
		}
	},
	{
		label: "Brutalist",
		value: "brutalist",
		primary: {
			light: "oklch(0.6489 0.237 26.9728)",
			dark: "oklch(0.7044 0.1872 23.1858)"
		}
	},
	{
		label: "Soft Pop",
		value: "soft-pop",
		primary: {
			light: "oklch(0.5106 0.2301 276.9656)",
			dark: "oklch(0.6801 0.1583 276.9349)"
		}
	},
	{
		label: "Tangerine",
		value: "tangerine",
		primary: {
			light: "oklch(0.64 0.17 36.44)",
			dark: "oklch(0.64 0.17 36.44)"
		}
	}
];
var THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);
/**
* How each preference should be saved.
*
* "client-cookie"  → write cookie on the browser only.
* "server-cookie"  → write cookie through a Server Function.
* "localStorage"   → save only on the client (non-layout stuff).
* "none"           → no saving, resets on reload.
*
* Layout-critical prefs (sidebar_variant / sidebar_collapsible)
* must stay consistent during SSR → so they can’t use localStorage.
* Others are flexible and can use any persistence.
*/
function definePreference(definition) {
	return definition;
}
function defineSSRPreference(definition) {
	return definition;
}
var PREFERENCE_REGISTRY = {
	theme_mode: definePreference({
		values: THEME_MODE_VALUES,
		defaultValue: "light",
		persistence: "client-cookie",
		attribute: "data-theme-mode"
	}),
	theme_preset: definePreference({
		values: THEME_PRESET_VALUES,
		defaultValue: "default",
		persistence: "client-cookie",
		attribute: "data-theme-preset"
	}),
	font: definePreference({
		values: fontKeys,
		defaultValue: "fitraat",
		persistence: "client-cookie",
		attribute: "data-font"
	}),
	content_layout: definePreference({
		values: CONTENT_LAYOUT_VALUES,
		defaultValue: "centered",
		persistence: "client-cookie",
		attribute: "data-content-layout"
	}),
	navbar_style: definePreference({
		values: NAVBAR_STYLE_VALUES,
		defaultValue: "sticky",
		persistence: "client-cookie",
		attribute: "data-navbar-style"
	}),
	sidebar_variant: defineSSRPreference({
		values: SIDEBAR_VARIANT_VALUES,
		defaultValue: "sidebar",
		persistence: "client-cookie",
		attribute: "data-sidebar-variant"
	}),
	sidebar_collapsible: defineSSRPreference({
		values: SIDEBAR_COLLAPSIBLE_VALUES,
		defaultValue: "icon",
		persistence: "client-cookie",
		attribute: "data-sidebar-collapsible"
	})
};
var PREFERENCE_KEYS = Object.freeze(Object.keys(PREFERENCE_REGISTRY));
function getPreferencePersistence(key) {
	return PREFERENCE_REGISTRY[key].persistence;
}
var PREFERENCE_DEFAULTS = Object.fromEntries(PREFERENCE_KEYS.map((key) => [key, PREFERENCE_REGISTRY[key].defaultValue]));
function parsePreference(key, rawValue) {
	const definition = PREFERENCE_REGISTRY[key];
	const allowedValues = definition.values;
	if (rawValue && allowedValues.includes(rawValue)) return rawValue;
	return definition.defaultValue;
}
//#endregion
export { PREFERENCE_KEYS as a, fontBootRegistry as c, fontRegistry as d, getPreferencePersistence as f, PREFERENCE_DEFAULTS as i, fontCssFamily as l, parsePreference as m, LOCALE_META as n, PREFERENCE_REGISTRY as o, isAppLocale as p, LOCALE_STORAGE_KEY as r, THEME_PRESET_OPTIONS as s, LOCALES as t, fontOptions as u };
