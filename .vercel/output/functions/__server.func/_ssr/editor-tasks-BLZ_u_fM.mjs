import { i as __toESM } from "../_runtime.mjs";
import { A as DialogClose, Ct as require_jsx_runtime, D as DialogPortal, E as DialogTitle, M as AlertDialogRoot, O as DialogPopup, j as DialogBackdrop, k as DialogDescription, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { F as ChevronDown, N as ChevronUp, O as Clock, i as Trash2, l as Plus, u as Pencil } from "../_libs/lucide-react.mjs";
import { C as cn, E as useI18n, S as Button$1, b as getFunctionsErrorMessage, v as toast } from "./router-DTVZZ-r0.mjs";
import { t as Badge } from "./badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CbueVUCK.mjs";
import { t as StudioGif } from "./studio-gif-BoQYPYgE.mjs";
import { a as priorityLabel, o as prioritySelectItems } from "./labels-Bo_NEvdS.mjs";
import { a as EmptyMedia, i as EmptyHeader, o as EmptyTitle, r as EmptyDescription, t as Empty } from "./format-Cyf7ziHm.mjs";
import "./templates-Dz8KNJUo.mjs";
import { _ as useUpdateTaskMutation, g as useUpdateSectionMutation, m as useReorderTasksMutation, n as useCreateSectionMutation, o as useDeleteSectionMutation, p as useReorderSectionsMutation, r as useCreateTaskMutation, s as useDeleteTaskMutation } from "./templates-f6MpW2dN.mjs";
import { n as Textarea } from "./textarea-e2R0841v.mjs";
import { a as FieldLabel, i as FieldGroup, r as FieldError, t as Field } from "./field-BhX2yGOo.mjs";
import { t as Input$1 } from "./input-COujH7Qi.mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./select-BvtYNnZ7.mjs";
import { n as Controller, r as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { i as string, r as object, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editor-tasks-BLZ_u_fM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "alert-dialog-title",
		className: cn("font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		"data-slot": "alert-dialog-action",
		className: cn(className),
		...props
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		"data-slot": "alert-dialog-cancel",
		className: cn(className),
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant,
			size
		}),
		...props
	});
}
function moveItem(items, index, direction) {
	const target = index + direction;
	if (target < 0 || target >= items.length) return items;
	const next = [...items];
	const [item] = next.splice(index, 1);
	if (item === void 0) return items;
	next.splice(target, 0, item);
	return next;
}
function createFormSchema$1(t) {
	return object({
		title: string().trim().min(2, { message: t("sections.nameError") }),
		description: string().trim()
	});
}
function EditorSections({ templateId, sections, tasks, selectedSectionId, onSelectSection, canEdit }) {
	const { t } = useI18n();
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const createSection = useCreateSectionMutation(templateId);
	const updateSection = useUpdateSectionMutation(templateId);
	const deleteSection = useDeleteSectionMutation(templateId);
	const reorderSections = useReorderSectionsMutation(templateId);
	const formSchema = (0, import_react.useMemo)(() => createFormSchema$1(t), [t]);
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		defaultValues: {
			title: "",
			description: ""
		}
	});
	const busy = createSection.isPending || updateSection.isPending || deleteSection.isPending || reorderSections.isPending;
	const pendingDelete = sections.find((section) => section.id === deleteId) ?? null;
	const resetForm = () => {
		form.reset({
			title: "",
			description: ""
		});
	};
	const onSubmit = async (data) => {
		try {
			if (editingId) {
				await updateSection.mutateAsync({
					sectionId: editingId,
					input: {
						title: data.title,
						description: data.description
					}
				});
				setEditingId(null);
			} else {
				await createSection.mutateAsync(data);
				setIsAdding(false);
			}
			resetForm();
		} catch (error) {
			toast.add({
				title: editingId ? t("sections.editError") : t("sections.addError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	const onStartEdit = (section) => {
		setIsAdding(false);
		setEditingId(section.id);
		form.reset({
			title: section.title,
			description: section.description
		});
	};
	const onCancelForm = () => {
		setIsAdding(false);
		setEditingId(null);
		resetForm();
	};
	const onReorder = async (index, direction) => {
		const next = moveItem(sections, index, direction);
		if (next === sections) return;
		try {
			await reorderSections.mutateAsync({ sectionIds: next.map((section) => section.id) });
		} catch (error) {
			toast.add({
				title: t("sections.reorderError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	const onConfirmDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteSection.mutateAsync(deleteId);
			if (editingId === deleteId) onCancelForm();
			setDeleteId(null);
		} catch (error) {
			toast.add({
				title: t("sections.deleteError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("sections.title") }), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					variant: "outline",
					disabled: busy,
					onClick: () => {
						if (isAdding) {
							onCancelForm();
							return;
						}
						setEditingId(null);
						resetForm();
						setIsAdding(true);
					},
					"aria-expanded": isAdding,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), isAdding ? t("common.cancel") : t("common.add")]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3",
				children: [
					canEdit && isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						noValidate: true,
						onSubmit: form.handleSubmit(onSubmit),
						className: "rounded-lg border bg-muted/30 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionFields, {
							form,
							t,
							pending: createSection.isPending,
							submitLabel: t("sections.add")
						})
					}) : null,
					sections.length === 0 && !isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						className: "py-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
								id: "purpose-library",
								alt: t("gif.library"),
								size: 120
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: t("sections.emptyTitle") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: canEdit ? t("sections.emptyEdit") : t("sections.emptyView") })
						] })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1",
						children: sections.map((section, index) => {
							const count = tasks.filter((task) => task.sectionId === section.id).length;
							const isSelected = selectedSectionId === section.id;
							const isEditing = editingId === section.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
								noValidate: true,
								onSubmit: form.handleSubmit(onSubmit),
								className: "rounded-lg border bg-muted/30 p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionFields, {
									form,
									t,
									pending: updateSection.isPending,
									submitLabel: updateSection.isPending ? t("sections.saving") : t("common.saveChanges"),
									onCancel: onCancelForm
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-start gap-1 rounded-lg border px-1 py-1", isSelected ? "border-primary bg-muted/60" : "border-transparent hover:bg-muted/40"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "min-w-0 flex-1 rounded-md px-2 py-1.5 text-left",
										onClick: () => onSelectSection(section.id),
										"aria-current": isSelected ? "true" : void 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate font-medium text-sm",
												children: section.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "shrink-0 text-muted-foreground text-xs",
												children: count
											})]
										}), section.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 line-clamp-2 text-muted-foreground text-xs",
											children: section.description
										}) : null]
									}),
									canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex shrink-0 flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "icon-xs",
											variant: "ghost",
											disabled: busy || index === 0,
											"aria-label": t("common.moveUp"),
											onClick: () => {
												onReorder(index, -1);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "icon-xs",
											variant: "ghost",
											disabled: busy || index === sections.length - 1,
											"aria-label": t("common.moveDown"),
											onClick: () => {
												onReorder(index, 1);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
										})]
									}) : null,
									canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "icon-xs",
											variant: "ghost",
											disabled: busy,
											"aria-label": t("sections.editAria", { title: section.title }),
											onClick: () => onStartEdit(section),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "icon-xs",
											variant: "ghost",
											disabled: busy,
											"aria-label": t("sections.deleteAria", { title: section.title }),
											onClick: () => setDeleteId(section.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
										})]
									}) : null
								]
							}) }, section.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
				open: Boolean(pendingDelete),
				onOpenChange: (open) => {
					if (!open) setDeleteId(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("sections.deleteConfirmTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("sections.deleteConfirmBody", { title: pendingDelete?.title ?? "" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: deleteSection.isPending,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					variant: "destructive",
					disabled: deleteSection.isPending,
					onClick: () => {
						onConfirmDelete();
					},
					children: t("common.delete")
				})] })] })
			})
		]
	});
}
function SectionFields({ form, t, pending, submitLabel, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
		className: "gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "title",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "section-title",
							children: t("sections.sectionTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							...field,
							id: "section-title",
							placeholder: t("sections.placeholder")
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
							htmlFor: "section-description",
							children: t("sections.description")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "section-description",
							placeholder: t("sections.optional")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: onCancel,
					disabled: pending,
					children: t("common.cancel")
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					size: "sm",
					disabled: pending,
					children: pending && !onCancel ? t("sections.adding") : submitLabel
				})]
			})
		]
	});
}
function createFormSchema(t) {
	return object({
		title: string().trim().min(2, { message: t("tasks.nameError") }),
		notes: string().trim(),
		priority: _enum([
			"low",
			"medium",
			"high"
		]),
		tags: string().trim(),
		estimatedMinutes: string().trim(),
		sectionId: string().trim().min(1)
	});
}
function parseTags(value) {
	return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}
function parseMinutes(value) {
	if (!value) return;
	const minutes = Number(value);
	return Number.isFinite(minutes) && minutes > 0 ? minutes : void 0;
}
function getPriorityVariant(priority) {
	if (priority === "high") return "destructive";
	if (priority === "low") return "secondary";
	return "outline";
}
function emptyForm(sectionId) {
	return {
		title: "",
		notes: "",
		priority: "medium",
		tags: "",
		estimatedMinutes: "",
		sectionId
	};
}
function EditorTasks({ templateId, section, sections, tasks, canEdit, onSelectSection }) {
	const { t } = useI18n();
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const createTask = useCreateTaskMutation(templateId);
	const updateTask = useUpdateTaskMutation(templateId);
	const deleteTask = useDeleteTaskMutation(templateId);
	const reorderTasks = useReorderTasksMutation(templateId);
	const formSchema = (0, import_react.useMemo)(() => createFormSchema(t), [t]);
	const priorityItems = prioritySelectItems(t);
	const sectionItems = sections.map((item) => ({
		value: item.id,
		label: item.title
	}));
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		defaultValues: emptyForm(section?.id ?? "")
	});
	const busy = createTask.isPending || updateTask.isPending || deleteTask.isPending || reorderTasks.isPending;
	const pendingDelete = tasks.find((task) => task.id === deleteId) ?? null;
	(0, import_react.useEffect)(() => {
		setIsAdding(false);
		setEditingId(null);
		form.reset(emptyForm(section?.id ?? ""));
	}, [form, section?.id]);
	const onCancelForm = () => {
		setIsAdding(false);
		setEditingId(null);
		form.reset(emptyForm(section?.id ?? ""));
	};
	const onSubmit = async (data) => {
		const payload = {
			title: data.title,
			notes: data.notes,
			priority: data.priority,
			tags: parseTags(data.tags),
			sectionId: data.sectionId,
			estimatedMinutes: parseMinutes(data.estimatedMinutes)
		};
		try {
			if (editingId) {
				await updateTask.mutateAsync({
					taskId: editingId,
					input: payload
				});
				if (data.sectionId !== section?.id) onSelectSection(data.sectionId);
				setEditingId(null);
			} else {
				if (!section) return;
				await createTask.mutateAsync({
					...payload,
					sectionId: section.id
				});
				setIsAdding(false);
			}
			form.reset(emptyForm(section?.id ?? ""));
		} catch (error) {
			toast.add({
				title: editingId ? t("tasks.editError") : t("tasks.addError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	const onStartEdit = (task) => {
		setIsAdding(false);
		setEditingId(task.id);
		form.reset({
			title: task.title,
			notes: task.notes,
			priority: task.priority,
			tags: task.tags.join(", "),
			estimatedMinutes: task.estimatedMinutes ? String(task.estimatedMinutes) : "",
			sectionId: task.sectionId
		});
	};
	const onReorder = async (index, direction) => {
		if (!section) return;
		const next = moveItem(tasks, index, direction);
		if (next === tasks) return;
		try {
			await reorderTasks.mutateAsync({
				sectionId: section.id,
				taskIds: next.map((task) => task.id)
			});
		} catch (error) {
			toast.add({
				title: t("tasks.reorderError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	const onConfirmDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteTask.mutateAsync(deleteId);
			if (editingId === deleteId) onCancelForm();
			setDeleteId(null);
		} catch (error) {
			toast.add({
				title: t("tasks.deleteError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex-row items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: section ? section.title : t("tasks.title") }), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				size: "sm",
				variant: "outline",
				disabled: !section || busy,
				onClick: () => {
					if (isAdding) {
						onCancelForm();
						return;
					}
					setEditingId(null);
					form.reset(emptyForm(section?.id ?? ""));
					setIsAdding(true);
				},
				"aria-expanded": isAdding,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "data-icon": "inline-start" }), isAdding ? t("common.cancel") : t("tasks.add")]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-3",
			children: [
				!section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					className: "min-h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: t("tasks.selectTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: t("tasks.selectBody") })] })
				}) : null,
				section && canEdit && isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					noValidate: true,
					onSubmit: form.handleSubmit(onSubmit),
					className: "rounded-lg border bg-muted/30 p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFields, {
						form,
						t,
						pending: createTask.isPending,
						submitLabel: createTask.isPending ? t("tasks.adding") : t("tasks.addLibrary"),
						showSection: false,
						priorityItems,
						sectionItems
					})
				}) : null,
				section && tasks.length === 0 && !isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					className: "min-h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
							id: "purpose-plan",
							alt: t("gif.plan"),
							size: 120
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: t("tasks.emptyTitle") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: canEdit ? t("tasks.emptyEdit") : t("tasks.emptyView") })
					] })
				}) : null,
				section && tasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: tasks.map((task, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: editingId === task.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						noValidate: true,
						onSubmit: form.handleSubmit(onSubmit),
						className: "rounded-lg border bg-muted/30 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFields, {
							form,
							t,
							pending: updateTask.isPending,
							submitLabel: updateTask.isPending ? t("tasks.saving") : t("common.saveChanges"),
							showSection: sections.length > 1,
							priorityItems,
							sectionItems,
							onCancel: onCancelForm
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 rounded-lg border px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm",
												children: task.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: getPriorityVariant(task.priority),
												children: priorityLabel(t, task.priority)
											}),
											task.estimatedMinutes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 text-muted-foreground text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), t("tasks.minutesValue", { count: task.estimatedMinutes })]
											}) : null
										]
									}),
									task.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-sm leading-relaxed",
										children: task.notes
									}) : null,
									task.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: task.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: tag
										}, tag))
									}) : null
								]
							}),
							canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon-xs",
									variant: "ghost",
									disabled: busy || index === 0,
									"aria-label": t("common.moveUp"),
									onClick: () => {
										onReorder(index, -1);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon-xs",
									variant: "ghost",
									disabled: busy || index === tasks.length - 1,
									"aria-label": t("common.moveDown"),
									onClick: () => {
										onReorder(index, 1);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
								})]
							}) : null,
							canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon-xs",
									variant: "ghost",
									disabled: busy,
									"aria-label": t("tasks.editAria", { title: task.title }),
									onClick: () => onStartEdit(task),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon-xs",
									variant: "ghost",
									disabled: busy,
									"aria-label": t("tasks.deleteAria", { title: task.title }),
									onClick: () => setDeleteId(task.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
								})]
							}) : null
						]
					}) }, task.id))
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
			open: Boolean(pendingDelete),
			onOpenChange: (open) => {
				if (!open) setDeleteId(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("tasks.deleteConfirmTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("tasks.deleteConfirmBody", { title: pendingDelete?.title ?? "" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
				disabled: deleteTask.isPending,
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				variant: "destructive",
				disabled: deleteTask.isPending,
				onClick: () => {
					onConfirmDelete();
				},
				children: t("common.delete")
			})] })] })
		})
	] });
}
function TaskFields({ form, t, pending, submitLabel, showSection, priorityItems, sectionItems, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
		className: "gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "title",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "task-title",
							children: t("tasks.task")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							...field,
							id: "task-title",
							placeholder: t("tasks.taskPlaceholder")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "notes",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "task-notes",
							children: t("tasks.how")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "task-notes",
							placeholder: t("tasks.howPlaceholder")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			showSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "sectionId",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "task-section",
							children: t("tasks.section")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							value: field.value,
							onValueChange: field.onChange,
							items: sectionItems,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "task-section",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: sectionItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: item.value,
								children: item.label
							}, item.value)) }) })]
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						control: form.control,
						name: "priority",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "gap-1.5",
							"data-invalid": fieldState.invalid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "task-priority",
									children: t("tasks.priority")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
									value: field.value,
									onValueChange: (value) => field.onChange(value),
									items: priorityItems,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "task-priority",
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: priorityItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
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
						name: "tags",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "gap-1.5",
							"data-invalid": fieldState.invalid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "task-tags",
									children: t("tasks.tags")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									...field,
									id: "task-tags",
									placeholder: t("tasks.tagsPlaceholder")
								}),
								fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						control: form.control,
						name: "estimatedMinutes",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "gap-1.5",
							"data-invalid": fieldState.invalid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "task-minutes",
									children: t("tasks.minutes")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									...field,
									id: "task-minutes",
									inputMode: "numeric",
									placeholder: "90"
								}),
								fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: onCancel,
					disabled: pending,
					children: t("common.cancel")
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					size: "sm",
					disabled: pending,
					children: submitLabel
				})]
			})
		]
	});
}
//#endregion
export { EditorTasks as n, EditorSections as t };
