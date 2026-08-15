import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft } from "../_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1, b as getFunctionsErrorMessage, f as useAuth, v as toast } from "./router-DTVZZ-r0.mjs";
import { n as CardContent, t as Card } from "./card-CbueVUCK.mjs";
import { n as categorySelectItems } from "./labels-Bo_NEvdS.mjs";
import "./templates-Dz8KNJUo.mjs";
import { i as useCreateTemplateMutation, t as updateTemplate } from "./templates-f6MpW2dN.mjs";
import { n as Textarea } from "./textarea-e2R0841v.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, r as FieldError, t as Field } from "./field-BhX2yGOo.mjs";
import { t as Input$1 } from "./input-COujH7Qi.mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./select-BvtYNnZ7.mjs";
import { n as Controller, r as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { a as templateCoverPath, n as assertCoverFile, o as uploadTemplateCover, r as coverExtension, t as SystemCoverField } from "./system-cover-field-y4PppWSS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CZSJuJzi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createFormSchema(t) {
	return object({
		title: string().trim().min(2, { message: t("newSystem.titleError") }),
		purpose: string().trim().min(8, { message: t("newSystem.purposeError") }),
		story: string().trim().min(8, { message: t("newSystem.storyError") }),
		description: string().trim().min(8, { message: t("newSystem.insideError") }),
		category: string().min(1, { message: t("newSystem.categoryError") })
	});
}
function CreateSystemForm() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { t } = useI18n();
	const createTemplate = useCreateTemplateMutation();
	const [coverFile, setCoverFile] = (0, import_react.useState)(null);
	const [coverBusy, setCoverBusy] = (0, import_react.useState)(false);
	const coverPreview = (0, import_react.useMemo)(() => coverFile ? URL.createObjectURL(coverFile) : "", [coverFile]);
	const formSchema = (0, import_react.useMemo)(() => createFormSchema(t), [t]);
	const categoryItems = categorySelectItems(t);
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		defaultValues: {
			title: "",
			purpose: "",
			story: "",
			description: "",
			category: "exam"
		}
	});
	(0, import_react.useEffect)(() => {
		return () => {
			if (coverPreview) URL.revokeObjectURL(coverPreview);
		};
	}, [coverPreview]);
	const onSubmit = async (data) => {
		try {
			const created = await createTemplate.mutateAsync(data);
			if (!created?.id) throw new Error(t("newSystem.createMissing"));
			if (coverFile && user?.uid) {
				setCoverBusy(true);
				try {
					assertCoverFile(coverFile, {
						type: t("cover.typeError"),
						size: t("cover.sizeError")
					});
					const path = templateCoverPath(user.uid, created.id, coverExtension(coverFile));
					const imageUrl = await uploadTemplateCover(path, coverFile);
					await updateTemplate(created.id, {
						imageUrl,
						storagePath: path
					});
				} catch (error) {
					toast.add({
						title: t("cover.uploadError"),
						description: getFunctionsErrorMessage(error)
					});
				} finally {
					setCoverBusy(false);
				}
			}
			await navigate({
				to: "/dashboard/systems/$templateId",
				params: { templateId: created.id }
			});
		} catch (error) {
			toast.add({
				title: t("newSystem.createError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		noValidate: true,
		onSubmit: form.handleSubmit(onSubmit),
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemCoverField, {
				imageUrl: coverPreview,
				canEdit: true,
				busy: coverBusy || createTemplate.isPending,
				onPick: (file) => {
					try {
						assertCoverFile(file, {
							type: t("cover.typeError"),
							size: t("cover.sizeError")
						});
						setCoverFile(file);
					} catch (error) {
						toast.add({
							title: t("cover.uploadError"),
							description: error instanceof Error ? error.message : t("cover.typeError")
						});
					}
				},
				onRemove: coverFile ? () => setCoverFile(null) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "title",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "system-title",
							children: t("newSystem.titleLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							...field,
							id: "system-title",
							placeholder: t("newSystem.titlePlaceholder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("newSystem.titleHelp") }),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "category",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "system-category",
							children: t("newSystem.category")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							value: field.value,
							onValueChange: field.onChange,
							items: categoryItems,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "system-category",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("newSystem.categoryPlaceholder") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: categoryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: item.value,
								children: item.label
							}, item.value)) }) })]
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "purpose",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "system-purpose",
							children: t("newSystem.purpose")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "system-purpose",
							placeholder: t("newSystem.purposePlaceholder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("newSystem.purposeHelp") }),
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
							htmlFor: "system-story",
							children: t("newSystem.story")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "system-story",
							placeholder: t("newSystem.storyPlaceholder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("newSystem.storyHelp") }),
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
							htmlFor: "system-description",
							children: t("newSystem.inside")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "system-description",
							placeholder: t("newSystem.insidePlaceholder")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-end gap-2 border-t pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "submit",
				disabled: createTemplate.isPending || coverBusy,
				children: createTemplate.isPending || coverBusy ? t("newSystem.creating") : t("newSystem.continue")
			})
		})]
	}) }) });
}
function NewSystemPage() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				nativeButton: false,
				variant: "ghost",
				size: "sm",
				className: "-ml-2 w-fit",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "data-icon": "inline-start" }), t("systems.title")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl tracking-tight",
					children: t("newSystem.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: t("newSystem.lead")
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateSystemForm, {})]
	});
}
//#endregion
export { NewSystemPage as component };
