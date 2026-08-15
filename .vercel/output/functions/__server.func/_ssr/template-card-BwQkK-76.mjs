import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Download, b as Layers } from "../_libs/lucide-react.mjs";
import { w as getInitials } from "./router-DTVZZ-r0.mjs";
import { t as Badge } from "./badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CbueVUCK.mjs";
import { a as getExpertiseLabel, i as getCategoryLabel } from "./options-Cl7-Lkhi.mjs";
import { s as formatCount } from "./format-Cyf7ziHm.mjs";
import { t as SystemCover } from "./system-cover-DTn_kK2e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/template-card-BwQkK-76.js
var import_jsx_runtime = require_jsx_runtime();
function TemplateCard({ template }) {
	const expertise = template.creator.expertise.slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full overflow-hidden shadow-none transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCover, {
				src: template.imageUrl,
				alt: "",
				className: "rounded-t-xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: getCategoryLabel(template.category)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-muted-foreground text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), formatCount(template.downloadCount)]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/systems/$templateId",
							params: { templateId: template.id },
							className: "rounded-sm outline-none transition-colors hover:underline group-hover/card:underline focus-visible:ring-3 focus-visible:ring-ring/50",
							children: template.title
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						className: "line-clamp-2",
						children: template.purpose
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between gap-3 text-muted-foreground text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
							template.sectionCount,
							" sections · ",
							template.taskCount,
							" tasks"
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/creators/$creatorId",
					params: { creatorId: template.creator.uid },
					className: "flex items-center gap-2 rounded-lg outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-7 items-center justify-center rounded-full bg-muted font-medium text-[10px]",
						children: getInitials(template.creator.displayName)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-medium text-foreground text-sm",
							children: template.creator.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-muted-foreground text-xs",
							children: template.creator.headline || expertise.map(getExpertiseLabel).join(" · ") || "Creator"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { TemplateCard as t };
