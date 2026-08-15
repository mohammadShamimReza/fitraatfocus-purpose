import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { M as CircleAlert } from "../_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1, b as getFunctionsErrorMessage } from "./router-DTVZZ-r0.mjs";
import { t as StudioGif } from "./studio-gif-BoQYPYgE.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-D9UiP_oH.mjs";
import { a as EmptyMedia, i as EmptyHeader, o as EmptyTitle, r as EmptyDescription, t as Empty } from "./format-Cyf7ziHm.mjs";
import { t as Spinner } from "./spinner-CzIKaVEI.mjs";
import "./templates-Dz8KNJUo.mjs";
import { d as usePublicTemplatesQuery } from "./templates-f6MpW2dN.mjs";
import { t as TemplateCard } from "./template-card-BwQkK-76.mjs";
import { n as matchesTemplateSearch, t as TemplateFilters } from "./filter-Dn6jVz9F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/systems-3HEH6rY7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicCatalog() {
	const { t } = useI18n();
	const query = usePublicTemplatesQuery(true);
	const [titleQuery, setTitleQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => (query.data ?? []).filter((item) => matchesTemplateSearch(item, titleQuery, category)), [
		query.data,
		titleQuery,
		category
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]",
						children: t("landing.catalog.kicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-semibold text-3xl tracking-tight sm:text-4xl",
						children: t("landing.catalog.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base",
						children: t("landing.catalog.body")
					})
				]
			}),
			query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-64 items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: t("landing.catalog.loading")
				})]
			}) : null,
			query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: t("landing.catalog.error") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: getFunctionsErrorMessage(query.error) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "sm",
							className: "w-fit",
							onClick: () => void query.refetch(),
							children: t("common.tryAgain")
						})]
					})
				]
			}) : null,
			query.isSuccess && query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				className: "min-h-64 border border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
						id: "purpose-library",
						alt: t("gif.library"),
						size: 140
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: t("landing.catalog.emptyTitle") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: t("landing.catalog.emptyBody") })
				] })
			}) : null,
			query.isSuccess && query.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateFilters, {
					query: titleQuery,
					onQueryChange: setTitleQuery,
					category,
					onCategoryChange: setCategory
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: t("search.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
					children: filtered.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { template }, template.id))
				})]
			}) : null
		]
	});
}
function PublicSystemsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicCatalog, {});
}
//#endregion
export { PublicSystemsPage as component };
