import { Ct as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft, M as CircleAlert, h as MapPin, w as Globe } from "./_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1, b as getFunctionsErrorMessage, o as Route$9, w as getInitials } from "./_ssr/router-DTVZZ-r0.mjs";
import { t as Badge } from "./_ssr/badge-DsjoU4A0.mjs";
import { a as getExpertiseLabel } from "./_ssr/options-Cl7-Lkhi.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./_ssr/alert-D9UiP_oH.mjs";
import { i as EmptyHeader, o as EmptyTitle, r as EmptyDescription, t as Empty } from "./_ssr/format-Cyf7ziHm.mjs";
import { t as Spinner } from "./_ssr/spinner-CzIKaVEI.mjs";
import "./_ssr/templates-Dz8KNJUo.mjs";
import { n as useProfileQuery } from "./_ssr/profiles-DSpIcg7v.mjs";
import { a as useCreatorTemplatesQuery } from "./_ssr/templates-f6MpW2dN.mjs";
import { t as TemplateCard } from "./_ssr/template-card-BwQkK-76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_creatorId-CDz8uSfx.js
var import_jsx_runtime = require_jsx_runtime();
function PublicCreatorView({ creatorId }) {
	const { t } = useI18n();
	const profileQuery = useProfileQuery(creatorId, true);
	const templatesQuery = useCreatorTemplatesQuery(creatorId, true);
	if (profileQuery.isPending || templatesQuery.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-72 items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Loading creator"
		})]
	});
	if (profileQuery.isError || !profileQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Could not load this creator" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profileQuery.error ? getFunctionsErrorMessage(profileQuery.error) : "Creator not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					nativeButton: false,
					variant: "ghost",
					size: "sm",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
					children: t("catalog.back")
				})]
			})
		]
	});
	const profile = profileQuery.data;
	const templates = templatesQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				nativeButton: false,
				variant: "ghost",
				size: "sm",
				className: "-ml-2 w-fit",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "data-icon": "inline-start" }), t("catalog.back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-16 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-lg",
					children: getInitials(profile.displayName)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl tracking-tight",
								children: profile.displayName
							}), profile.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: profile.headline
							}) : null]
						}),
						profile.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-sm leading-relaxed",
							children: profile.bio
						}) : null,
						profile.proof ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-muted-foreground text-sm leading-relaxed",
							children: profile.proof
						}) : null,
						profile.expertise.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: profile.expertise.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: getExpertiseLabel(item)
							}, item))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3 text-muted-foreground text-xs",
							children: [profile.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), profile.location]
							}) : null, profile.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: profile.website,
								className: "inline-flex items-center gap-1.5 hover:text-foreground",
								rel: "noreferrer",
								target: "_blank",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5" }), "Website"]
							}) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl tracking-tight",
					children: "Published systems"
				}), templates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					className: "min-h-48 border border-dashed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "No published systems" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: "This creator has not published a library yet." })] })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { template }, template.id))
				})]
			})
		]
	});
}
function PublicCreatorPage() {
	const { creatorId } = Route$9.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicCreatorView, { creatorId })
	});
}
//#endregion
export { PublicCreatorPage as component };
