import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Download, M as CircleAlert, b as Layers, l as Plus } from "../_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1, b as getFunctionsErrorMessage, f as useAuth } from "./router-DTVZZ-r0.mjs";
import { t as Badge } from "./badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CbueVUCK.mjs";
import { t as StudioGif } from "./studio-gif-BoQYPYgE.mjs";
import { c as visibilityLabel, s as statusLabel, t as categoryLabel } from "./labels-Bo_NEvdS.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-D9UiP_oH.mjs";
import { a as EmptyMedia, c as formatUpdatedAt, i as EmptyHeader, n as EmptyContent, o as EmptyTitle, r as EmptyDescription, s as formatCount, t as Empty } from "./format-Cyf7ziHm.mjs";
import { t as Spinner } from "./spinner-CzIKaVEI.mjs";
import "./templates-Dz8KNJUo.mjs";
import { l as useMyTemplatesQuery } from "./templates-f6MpW2dN.mjs";
import { t as SystemCover } from "./system-cover-DTn_kK2e.mjs";
import { n as matchesTemplateSearch, t as TemplateFilters } from "./filter-Dn6jVz9F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/systems-4GNIyrHl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SystemsList() {
	const { user, isReady } = useAuth();
	const { t, locale } = useI18n();
	const query = useMyTemplatesQuery(isReady && Boolean(user));
	const [titleQuery, setTitleQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const drafts = query.data?.filter((item) => item.status === "draft").length ?? 0;
	const published = query.data?.filter((item) => item.status === "published").length ?? 0;
	const downloads = query.data?.reduce((sum, item) => sum + item.downloadCount, 0) ?? 0;
	const filtered = (0, import_react.useMemo)(() => (query.data ?? []).filter((item) => matchesTemplateSearch(item, titleQuery, category, status)), [
		query.data,
		titleQuery,
		category,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "@container/main flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl tracking-tight",
						children: t("systems.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted-foreground text-sm",
						children: t("systems.lead")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems/new" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), t("nav.newSystem")]
				})]
			}),
			query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-72 items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: t("systems.loading")
				})]
			}) : null,
			query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: t("systems.loadError") }),
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
			query.isSuccess && query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
				className: "min-h-80 border border-dashed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
						id: "purpose-library",
						alt: t("gif.library"),
						size: 140
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: t("systems.emptyTitle") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: t("systems.emptyBody") })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems/new" }),
					children: t("systems.create")
				}) })]
			}) : null,
			query.isSuccess && query.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateFilters, {
						query: titleQuery,
						onQueryChange: setTitleQuery,
						category,
						onCategoryChange: setCategory,
						status,
						onStatusChange: setStatus
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-muted-foreground text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(filtered.length === 1 ? "systems.countOne" : "systems.countMany", { count: filtered.length }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("systems.publishedCount", { count: published }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("systems.draftCount", { count: drafts }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("systems.downloadCount", { count: formatCount(downloads, locale) }) })
						]
					}),
					filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: t("search.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: filtered.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCard, { template }, template.id))
					})
				]
			}) : null
		]
	});
}
function SystemCard({ template }) {
	const { t, locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/dashboard/systems/$templateId",
		params: { templateId: template.id },
		className: "group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "h-full overflow-hidden transition-colors group-hover:bg-muted/40",
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
							children: categoryLabel(t, template.category)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: template.status === "published" ? "default" : "secondary",
								children: statusLabel(t, template.status)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: visibilityLabel(t, template.visibility)
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "line-clamp-2 text-lg",
							children: template.title || t("systems.untitled")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "line-clamp-2",
							children: template.purpose || t("systems.noPurpose")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between gap-3 text-muted-foreground text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), t("systems.libraryMeta", {
								sections: template.sectionCount,
								tasks: template.taskCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), formatCount(template.downloadCount, locale)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUpdatedAt(template.updatedAt, locale) })
					]
				})
			]
		})
	});
}
function SystemsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemsList, {});
}
//#endregion
export { SystemsPage as component };
