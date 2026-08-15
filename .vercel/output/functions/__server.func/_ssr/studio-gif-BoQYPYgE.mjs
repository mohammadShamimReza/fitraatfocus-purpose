import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { C as cn } from "./router-DTVZZ-r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-gif-BoQYPYgE.js
var import_jsx_runtime = require_jsx_runtime();
function StudioGif({ id, alt, size = 160, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex shrink-0 overflow-hidden", className),
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/gifs/${id}-light.gif`,
			alt,
			width: size,
			height: size,
			className: "size-full object-contain dark:hidden"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/gifs/${id}-dark.gif`,
			alt: "",
			width: size,
			height: size,
			className: "hidden size-full object-contain dark:block",
			"aria-hidden": "true"
		})]
	});
}
//#endregion
export { StudioGif as t };
