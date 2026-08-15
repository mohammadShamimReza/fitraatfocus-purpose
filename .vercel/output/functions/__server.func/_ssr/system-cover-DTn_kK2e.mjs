import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { b as Layers } from "../_libs/lucide-react.mjs";
import { C as cn } from "./router-DTVZZ-r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-cover-DTn_kK2e.js
var import_jsx_runtime = require_jsx_runtime();
function SystemCover({ src, alt, className }) {
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("aspect-[16/9] w-full object-cover", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex aspect-[16/9] w-full items-center justify-center bg-muted/40", className),
		"aria-hidden": alt ? void 0 : true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
			className: "size-8 text-muted-foreground",
			"aria-hidden": "true"
		}), alt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: alt
		}) : null]
	});
}
//#endregion
export { SystemCover as t };
