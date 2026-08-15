import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { m as Monitor, o as Sun, p as Moon } from "../_libs/lucide-react.mjs";
import { t as useShallow } from "../_libs/zustand.mjs";
import { S as Button$1, d as usePreferencesStore } from "./router-DTVZZ-r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-switcher-ZakYLFTE.js
var import_jsx_runtime = require_jsx_runtime();
var THEME_CYCLE = [
	"light",
	"dark",
	"system"
];
function ThemeSwitcher() {
	const { themeMode, setPreference } = usePreferencesStore(useShallow((state) => ({
		themeMode: state.values.theme_mode,
		setPreference: state.setPreference
	})));
	const cycleTheme = () => {
		const nextTheme = THEME_CYCLE[(THEME_CYCLE.indexOf(themeMode) + 1) % THEME_CYCLE.length];
		setPreference("theme_mode", nextTheme);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		size: "icon",
		onClick: cycleTheme,
		"aria-label": `Current theme: ${themeMode}. Click to cycle themes`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "hidden [html[data-theme-mode=system]_&]:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "hidden dark:block [html[data-theme-mode=system]_&]:hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "block dark:hidden [html[data-theme-mode=system]_&]:hidden" })
		]
	});
}
//#endregion
export { ThemeSwitcher as t };
