import { i as __toESM } from "./_runtime.mjs";
import { C as TabsPanel, Ct as require_jsx_runtime, S as TabsList$1, T as TabsRoot, w as TabsTab, wt as require_react } from "./_libs/@base-ui/react+[...].mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft, E as Download, M as CircleAlert, b as Layers, n as Users, v as ListTodo } from "./_libs/lucide-react.mjs";
import { C as cn, E as useI18n, S as Button$1, b as getFunctionsErrorMessage, f as useAuth, n as Route$1, v as toast } from "./_ssr/router-DTVZZ-r0.mjs";
import { t as Badge } from "./_ssr/badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-CbueVUCK.mjs";
import { c as visibilityLabel, l as visibilitySelectItems, n as categorySelectItems, s as statusLabel, t as categoryLabel } from "./_ssr/labels-Bo_NEvdS.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./_ssr/alert-D9UiP_oH.mjs";
import { c as formatUpdatedAt, s as formatCount } from "./_ssr/format-Cyf7ziHm.mjs";
import { t as Spinner } from "./_ssr/spinner-CzIKaVEI.mjs";
import "./_ssr/templates-Dz8KNJUo.mjs";
import { f as usePublishTemplateMutation, h as useTemplateQuery, v as useUpdateTemplateMutation } from "./_ssr/templates-f6MpW2dN.mjs";
import { n as Textarea } from "./_ssr/textarea-e2R0841v.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, r as FieldError, t as Field } from "./_ssr/field-BhX2yGOo.mjs";
import { t as Input$1 } from "./_ssr/input-COujH7Qi.mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./_ssr/select-BvtYNnZ7.mjs";
import { n as Controller, r as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
import { i as string, r as object } from "./_libs/zod.mjs";
import { n as EditorTasks, t as EditorSections } from "./_ssr/editor-tasks-BLZ_u_fM.mjs";
import { a as templateCoverPath, i as deleteStorageFile, n as assertCoverFile, o as uploadTemplateCover, r as coverExtension, t as SystemCoverField } from "./_ssr/system-cover-field-y4PppWSS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_templateId-9ligeGri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tabs$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsRoot, {
		"data-slot": "tabs",
		"data-orientation": orientation,
		className: cn("group/tabs flex gap-2 data-horizontal:flex-col", className),
		...props
	});
}
var tabsListVariants = cva("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function TabsList({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
		"data-slot": "tabs-list",
		"data-variant": variant,
		className: cn(tabsListVariants({ variant }), className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTab, {
		"data-slot": "tabs-trigger",
		className: cn("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanel, {
		"data-slot": "tabs-content",
		className: cn("flex-1 text-sm outline-none", className),
		...props
	});
}
function createFormSchema$1(t) {
	return object({
		purpose: string().trim().min(8, { message: t("newSystem.purposeError") }),
		story: string().trim().min(8, { message: t("newSystem.storyError") }),
		description: string().trim().min(8, { message: t("newSystem.insideError") })
	});
}
function EditorMetadataForm({ template, canEdit }) {
	const { t } = useI18n();
	const updateTemplate = useUpdateTemplateMutation(template.id);
	const formSchema = (0, import_react.useMemo)(() => createFormSchema$1(t), [t]);
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		values: {
			purpose: template.purpose,
			story: template.story,
			description: template.description
		}
	});
	const onSubmit = async (data) => {
		try {
			await updateTemplate.mutateAsync(data);
			toast.add({
				title: t("editor.saved"),
				description: t("editor.savedBody")
			});
		} catch (error) {
			toast.add({
				title: t("editor.saveError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	if (!canEdit) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("editor.purposeStory") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("editor.purposeStoryHelp") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-sm",
					children: t("newSystem.purpose")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-relaxed",
					children: template.purpose || t("systems.noPurpose")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-sm",
					children: t("newSystem.story")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-relaxed",
					children: template.story || t("editor.noStory")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-sm",
					children: t("newSystem.inside")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-relaxed",
					children: template.description || t("editor.noDescription")
				})]
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("editor.purposeStory") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("editor.purposeStoryHelp") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		noValidate: true,
		onSubmit: form.handleSubmit(onSubmit),
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "purpose",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "editor-purpose",
							children: t("newSystem.purpose")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "editor-purpose"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("editor.outcomeHelp") }),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "story",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "editor-story",
							children: t("newSystem.story")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "editor-story"
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "description",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "editor-description",
							children: t("newSystem.inside")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "editor-description"
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "submit",
				disabled: updateTemplate.isPending,
				children: updateTemplate.isPending ? t("common.save") : t("editor.saveDetails")
			})
		})]
	}) })] });
}
function OwnerInsights({ template }) {
	const { t, locale } = useI18n();
	const uniquePeople = template.downloaderUids.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, {
				icon: Download,
				label: t("insights.downloads"),
				value: formatCount(template.downloadCount, locale),
				hint: t("insights.downloadsHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, {
				icon: Users,
				label: t("insights.unique"),
				value: formatCount(uniquePeople, locale),
				hint: t("insights.uniqueHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, {
				icon: Layers,
				label: t("insights.library"),
				value: t("insights.libraryValue", {
					sections: template.sectionCount,
					tasks: template.taskCount
				}),
				hint: t("insights.libraryHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, {
				icon: ListTodo,
				label: t("insights.updated"),
				value: formatUpdatedAt(template.updatedAt, locale),
				hint: template.status === "published" ? template.visibility === "public" ? t("insights.live") : t("insights.privateLive") : t("insights.draft")
			})
		]
	});
}
function InsightCard({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
		className: "flex-row items-center justify-between gap-2 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "font-medium text-muted-foreground text-xs",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 text-muted-foreground" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-lg tracking-tight",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-xs",
			children: hint
		})]
	})] });
}
function createFormSchema(t) {
	return object({
		title: string().trim().min(2, { message: t("newSystem.titleError") }),
		category: string().min(1, { message: t("newSystem.categoryError") })
	});
}
function EditorOverview({ template, canEdit }) {
	const { user } = useAuth();
	const { t } = useI18n();
	const updateTemplate = useUpdateTemplateMutation(template.id);
	const [coverBusy, setCoverBusy] = (0, import_react.useState)(false);
	const formSchema = (0, import_react.useMemo)(() => createFormSchema(t), [t]);
	const categoryItems = categorySelectItems(t);
	const visibilityItems = visibilitySelectItems(t);
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		values: {
			title: template.title,
			category: template.category || "exam"
		}
	});
	const onPickCover = async (file) => {
		if (!user?.uid) return;
		try {
			assertCoverFile(file, {
				type: t("cover.typeError"),
				size: t("cover.sizeError")
			});
			setCoverBusy(true);
			const path = templateCoverPath(user.uid, template.id, coverExtension(file));
			const imageUrl = await uploadTemplateCover(path, file);
			const previousPath = template.storagePath;
			await updateTemplate.mutateAsync({
				imageUrl,
				storagePath: path
			});
			if (previousPath && previousPath !== path) await deleteStorageFile(previousPath);
		} catch (error) {
			toast.add({
				title: t("cover.uploadError"),
				description: getFunctionsErrorMessage(error)
			});
		} finally {
			setCoverBusy(false);
		}
	};
	const onRemoveCover = async () => {
		try {
			setCoverBusy(true);
			const previousPath = template.storagePath;
			await updateTemplate.mutateAsync({
				imageUrl: "",
				storagePath: ""
			});
			if (previousPath) await deleteStorageFile(previousPath);
		} catch (error) {
			toast.add({
				title: t("cover.removeError"),
				description: getFunctionsErrorMessage(error)
			});
		} finally {
			setCoverBusy(false);
		}
	};
	const onSubmit = async (data) => {
		try {
			await updateTemplate.mutateAsync(data);
			toast.add({
				title: t("editor.saved"),
				description: t("editor.savedOverviewBody")
			});
		} catch (error) {
			toast.add({
				title: t("editor.saveError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	const onVisibilityChange = async (visibility) => {
		try {
			await updateTemplate.mutateAsync({ visibility });
			toast.add({
				title: t("visibility.saved"),
				description: visibility === "public" ? t("visibility.savedPublic") : t("visibility.savedPrivate")
			});
		} catch (error) {
			toast.add({
				title: t("visibility.error"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerInsights, { template }) : null,
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("editor.identity") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("editor.identityHelp") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				noValidate: true,
				onSubmit: form.handleSubmit(onSubmit),
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCoverField, {
					imageUrl: template.imageUrl,
					canEdit: true,
					busy: coverBusy || updateTemplate.isPending,
					onPick: (file) => {
						onPickCover(file);
					},
					onRemove: template.imageUrl ? () => void onRemoveCover() : void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						control: form.control,
						name: "title",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "gap-1.5",
							"data-invalid": fieldState.invalid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "overview-title",
									children: t("newSystem.titleLabel")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									...field,
									id: "overview-title"
								}),
								fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						control: form.control,
						name: "category",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "gap-1.5",
							"data-invalid": fieldState.invalid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "overview-category",
									children: t("newSystem.category")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
									value: field.value,
									onValueChange: field.onChange,
									items: categoryItems,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "overview-category",
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: categoryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: item.value,
										children: item.label
									}, item.value)) }) })]
								}),
								fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
							]
						})
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: updateTemplate.isPending || coverBusy,
						children: updateTemplate.isPending ? t("common.save") : t("editor.saveOverview")
					})
				})]
			}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("editor.identity") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("editor.identityHelp") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCoverField, {
					imageUrl: template.imageUrl,
					canEdit: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium text-sm",
							children: t("newSystem.titleLabel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: template.title || t("systems.untitled")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium text-sm",
							children: t("newSystem.category")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: categoryLabel(t, template.category)
						})]
					})]
				})]
			})] }),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("editor.visibility") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("visibility.help") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
				value: template.visibility === "public" ? "public" : "private",
				onValueChange: (value) => {
					onVisibilityChange(value === "public" ? "public" : "private");
				},
				items: visibilityItems,
				disabled: updateTemplate.isPending,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: visibilityItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: item.value,
					children: item.label
				}, item.value)) }) })]
			}) })] }) : null
		]
	});
}
function getPublishLabel(status, isPending, t) {
	if (status === "published") return t("editor.published");
	if (isPending) return t("editor.publishing");
	return t("editor.publish");
}
function SystemEditor({ templateId }) {
	const { user, isReady } = useAuth();
	const { t } = useI18n();
	const query = useTemplateQuery(templateId, isReady);
	const publish = usePublishTemplateMutation(templateId);
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
	const onPublish = async () => {
		try {
			const next = await publish.mutateAsync();
			toast.add({
				title: t("editor.published"),
				description: next.visibility === "public" ? t("editor.publishedToast") : t("editor.publishedPrivateToast")
			});
		} catch (error) {
			toast.add({
				title: t("editor.publishError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-72 items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t("editor.loading")
		})]
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: t("editor.loadError") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query.error ? getFunctionsErrorMessage(query.error) : t("editor.notFound") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						size: "sm",
						onClick: () => void query.refetch(),
						children: t("common.tryAgain")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						nativeButton: false,
						variant: "ghost",
						size: "sm",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems" }),
						children: t("editor.back")
					})]
				})]
			})
		]
	});
	const template = query.data;
	const canEdit = Boolean(user && user.uid === template.creatorUid);
	const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;
	const sectionTasks = selectedSection ? tasks.filter((task) => task.sectionId === selectedSection.id) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				nativeButton: false,
				variant: "ghost",
				size: "sm",
				className: "-ml-2 w-fit",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "data-icon": "inline-start" }), t("systems.title")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: categoryLabel(t, template.category)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: template.status === "published" ? "default" : "secondary",
									children: statusLabel(t, template.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: visibilityLabel(t, template.visibility)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl tracking-tight sm:text-3xl",
							children: template.title || t("systems.untitled")
						}),
						template.creatorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground text-sm",
							children: [
								t("common.byPrefix"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/creators/$creatorId",
									params: { creatorId: template.creatorUid },
									className: "text-foreground underline-offset-4 hover:underline",
									children: template.creatorName
								})
							]
						}) : null
					]
				}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					className: "shrink-0",
					disabled: template.status === "published" || publish.isPending,
					onClick: () => {
						onPublish();
					},
					children: getPublishLabel(template.status, publish.isPending, t)
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
			defaultValue: "library",
			className: "gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					variant: "line",
					className: "h-auto w-full justify-start rounded-none border-b bg-transparent p-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "library",
							className: "rounded-none px-4 py-2.5",
							children: t("editor.library")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "details",
							className: "rounded-none px-4 py-2.5",
							children: t("editor.details")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "overview",
							className: "rounded-none px-4 py-2.5",
							children: t("editor.overview")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "library",
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: t("editor.libraryLead")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorSections, {
							templateId,
							sections,
							tasks,
							selectedSectionId,
							onSelectSection: setSelectedSectionId,
							canEdit
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorTasks, {
							templateId,
							section: selectedSection,
							sections,
							tasks: sectionTasks,
							canEdit,
							onSelectSection: setSelectedSectionId
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "details",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorMetadataForm, {
						template,
						canEdit
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "overview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorOverview, {
						template,
						canEdit
					})
				})
			]
		})]
	});
}
function SystemEditorPage() {
	const { templateId } = Route$1.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemEditor, { templateId });
}
//#endregion
export { SystemEditorPage as component };
