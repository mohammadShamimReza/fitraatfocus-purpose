import { i as __toESM } from "./_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "./_libs/@base-ui/react+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft, E as Download, M as CircleAlert, b as Layers, v as ListTodo } from "./_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1, a as Route$7, b as getFunctionsErrorMessage, f as useAuth, v as toast, w as getInitials } from "./_ssr/router-DTVZZ-r0.mjs";
import { t as Badge } from "./_ssr/badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-CbueVUCK.mjs";
import { a as getExpertiseLabel, i as getCategoryLabel } from "./_ssr/options-Cl7-Lkhi.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./_ssr/alert-D9UiP_oH.mjs";
import { s as formatCount } from "./_ssr/format-Cyf7ziHm.mjs";
import { t as Spinner } from "./_ssr/spinner-CzIKaVEI.mjs";
import "./_ssr/templates-Dz8KNJUo.mjs";
import { c as useDownloadTemplateMutation, u as usePublicTemplateQuery } from "./_ssr/templates-f6MpW2dN.mjs";
import { t as SystemCover } from "./_ssr/system-cover-DTn_kK2e.mjs";
import { n as EditorTasks, t as EditorSections } from "./_ssr/editor-tasks-BLZ_u_fM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_templateId-PS0AMS4s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicTemplateView({ templateId }) {
	const { t } = useI18n();
	const { user, isReady } = useAuth();
	const query = usePublicTemplateQuery(templateId, true);
	const download = useDownloadTemplateMutation(templateId);
	const [selectedSectionId, setSelectedSectionId] = (0, import_react.useState)(null);
	const sections = (0, import_react.useMemo)(() => {
		return [...query.data?.sections ?? []].sort((left, right) => left.order - right.order);
	}, [query.data?.sections]);
	const tasks = (0, import_react.useMemo)(() => {
		return [...query.data?.tasks ?? []].sort((left, right) => left.order - right.order);
	}, [query.data?.tasks]);
	(0, import_react.useEffect)(() => {
		if (sections.length === 0) {
			setSelectedSectionId(null);
			return;
		}
		setSelectedSectionId((current) => {
			if (current && sections.some((section) => section.id === current)) return current;
			return sections[0]?.id ?? null;
		});
	}, [sections]);
	const onDownload = async () => {
		try {
			await download.mutateAsync();
			toast.add({
				title: "Downloaded",
				description: "This system is marked as downloaded for your account."
			});
		} catch (error) {
			toast.add({
				title: "Could not download",
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-72 items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Loading the system"
		})]
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Could not load this system" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query.error ? getFunctionsErrorMessage(query.error) : "The system was not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					nativeButton: false,
					variant: "ghost",
					size: "sm",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
					children: t("catalog.back")
				})]
			})
		]
	});
	const template = query.data;
	const isOwner = Boolean(user && user.uid === template.creatorUid);
	const hasDownloaded = Boolean(user && template.downloaderUids.includes(user.uid));
	const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;
	const sectionTasks = selectedSection ? tasks.filter((task) => task.sectionId === selectedSection.id) : [];
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
				className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCover, {
							src: template.imageUrl,
							alt: template.title,
							className: "max-w-xl rounded-xl border"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: getCategoryLabel(template.category)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl tracking-tight sm:text-4xl",
							children: template.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-muted-foreground text-sm leading-relaxed",
							children: template.purpose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 text-muted-foreground text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
										template.sectionCount,
										" sections"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "size-3.5" }),
										template.taskCount,
										" tasks"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }),
										formatCount(template.downloadCount),
										" downloads"
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateAction, {
					templateId,
					isOwner,
					hasDownloaded,
					isReady,
					isSignedIn: Boolean(user),
					isPending: download.isPending,
					onDownload
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Creator"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Why this library is worth trusting." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/creators/$creatorId",
				params: { creatorId: template.creator.uid },
				className: "flex items-start gap-3 rounded-lg outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 flex size-10 items-center justify-center rounded-full bg-muted font-medium text-xs",
					children: getInitials(template.creator.displayName)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-sm",
							children: template.creator.displayName
						}),
						template.creator.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-muted-foreground text-sm",
							children: template.creator.headline
						}) : null,
						template.creator.expertise.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex flex-wrap gap-1 pt-1",
							children: template.creator.expertise.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: getExpertiseLabel(item)
							}, item))
						}) : null
					]
				})]
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorSections, {
					templateId,
					sections,
					tasks,
					selectedSectionId,
					onSelectSection: setSelectedSectionId,
					canEdit: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorTasks, {
					templateId,
					section: selectedSection,
					sections,
					tasks: sectionTasks,
					canEdit: false,
					onSelectSection: setSelectedSectionId
				})]
			})
		]
	});
}
function TemplateAction({ templateId, isOwner, hasDownloaded, isReady, isSignedIn, isPending, onDownload }) {
	if (isOwner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dashboard/systems/$templateId",
			params: { templateId }
		}),
		children: "Edit in studio"
	});
	if (hasDownloaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		disabled: true,
		children: "Downloaded"
	});
	if (isReady && isSignedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		disabled: isPending,
		onClick: () => void onDownload(),
		children: isPending ? "Downloading…" : "Download"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/auth/v1/login",
			search: { redirect: `/systems/${templateId}` }
		}),
		children: "Sign in to download"
	});
}
function PublicTemplatePage() {
	const { templateId } = Route$7.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicTemplateView, { templateId })
	});
}
//#endregion
export { PublicTemplatePage as component };
