import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { _ as LoaderCircle } from "../_libs/lucide-react.mjs";
import { C as cn } from "./router-DTVZZ-r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spinner-CzIKaVEI.js
var import_jsx_runtime = require_jsx_runtime();
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		"data-slot": "spinner",
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
//#endregion
export { Spinner as t };
