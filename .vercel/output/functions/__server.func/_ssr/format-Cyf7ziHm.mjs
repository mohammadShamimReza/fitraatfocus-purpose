import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { C as cn, T as translate } from "./router-DTVZZ-r0.mjs";
import { n as formatDistanceToNow, r as enUS, t as bn } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-Cyf7ziHm.js
var import_jsx_runtime = require_jsx_runtime();
function Empty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty",
		className: cn("flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance", className),
		...props
	});
}
function EmptyHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-header",
		className: cn("flex max-w-sm flex-col items-center gap-2", className),
		...props
	});
}
var emptyMediaVariants = cva("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4"
	} },
	defaultVariants: { variant: "default" }
});
function EmptyMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-icon",
		"data-variant": variant,
		className: cn(emptyMediaVariants({
			variant,
			className
		})),
		...props
	});
}
function EmptyTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-title",
		className: cn("font-heading text-sm font-medium tracking-tight", className),
		...props
	});
}
function EmptyDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-description",
		className: cn("text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function EmptyContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-content",
		className: cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance", className),
		...props
	});
}
var DATE_LOCALES = {
	en: enUS,
	bn
};
function formatUpdatedAt(value, locale = "en") {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return translate(locale, "common.justNow");
	return formatDistanceToNow(date, {
		addSuffix: true,
		locale: DATE_LOCALES[locale]
	});
}
function formatCount(value, locale = "en") {
	return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en", { maximumFractionDigits: 0 }).format(value);
}
//#endregion
export { EmptyMedia as a, formatUpdatedAt as c, EmptyHeader as i, EmptyContent as n, EmptyTitle as o, EmptyDescription as r, formatCount as s, Empty as t };
