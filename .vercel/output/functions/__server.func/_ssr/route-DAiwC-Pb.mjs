import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as CircleAlert } from "../_libs/lucide-react.mjs";
import { C as cn, E as useI18n, S as Button$1, b as getFunctionsErrorMessage, f as useAuth, v as toast } from "./router-DTVZZ-r0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CbueVUCK.mjs";
import { r as expertiseItems } from "./labels-Bo_NEvdS.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-D9UiP_oH.mjs";
import { t as Spinner } from "./spinner-CzIKaVEI.mjs";
import "./templates-Dz8KNJUo.mjs";
import { r as useUpdateMyProfileMutation, t as useMyProfileQuery } from "./profiles-DSpIcg7v.mjs";
import { n as Textarea } from "./textarea-e2R0841v.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, r as FieldError, t as Field } from "./field-BhX2yGOo.mjs";
import { t as Input$1 } from "./input-COujH7Qi.mjs";
import { n as Controller, r as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { i as string, n as array, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DAiwC-Pb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createFormSchema(t) {
	return object({
		displayName: string().trim().min(2, { message: t("profile.nameError") }),
		headline: string().trim().min(8, { message: t("profile.headlineError") }),
		bio: string().trim().min(12, { message: t("profile.bioError") }),
		proof: string().trim().min(8, { message: t("profile.proofError") }),
		expertise: array(string()).min(1, { message: t("profile.expertiseError") }),
		location: string().trim(),
		website: string().trim(),
		avatarUrl: string().trim()
	});
}
function normalizeWebsite(value) {
	const trimmed = value.trim();
	if (!trimmed) return "";
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
	return `https://${trimmed}`;
}
function CreatorProfileForm({ profile }) {
	const { t } = useI18n();
	const updateProfile = useUpdateMyProfileMutation();
	const formSchema = (0, import_react.useMemo)(() => createFormSchema(t), [t]);
	const expertiseOptions = expertiseItems(t);
	const form = useForm({
		resolver: (values, context, options) => u(formSchema)(values, context, options),
		values: {
			displayName: profile.displayName,
			headline: profile.headline,
			bio: profile.bio,
			proof: profile.proof,
			expertise: profile.expertise,
			location: profile.location,
			website: profile.website,
			avatarUrl: profile.avatarUrl
		}
	});
	const onSubmit = async (data) => {
		try {
			await updateProfile.mutateAsync({
				...data,
				website: normalizeWebsite(data.website)
			});
			toast.add({
				title: t("profile.saved"),
				description: t("profile.savedBody")
			});
		} catch (error) {
			toast.add({
				title: t("profile.saveError"),
				description: getFunctionsErrorMessage(error)
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("profile.credibility") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t("profile.credibilityHelp") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		noValidate: true,
		onSubmit: form.handleSubmit(onSubmit),
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "displayName",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "profile-name",
							children: t("profile.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							...field,
							id: "profile-name",
							placeholder: t("profile.namePlaceholder")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "headline",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "profile-headline",
							children: t("profile.headline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							...field,
							id: "profile-headline",
							placeholder: t("profile.headlinePlaceholder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("profile.headlineHelp") }),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "expertise",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: t("profile.expertise") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: expertiseOptions.map((item) => {
								const selected = field.value.includes(item.value);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									type: "button",
									size: "sm",
									variant: selected ? "default" : "outline",
									className: cn(!selected && "text-muted-foreground"),
									"aria-pressed": selected,
									onClick: () => {
										const next = selected ? field.value.filter((value) => value !== item.value) : [...field.value, item.value];
										field.onChange(next);
									},
									children: item.label
								}, item.value);
							})
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "bio",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "profile-bio",
							children: t("profile.bio")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "profile-bio",
							placeholder: t("profile.bioPlaceholder")
						}),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control: form.control,
				name: "proof",
				render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					className: "gap-1.5",
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "profile-proof",
							children: t("profile.proof")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							id: "profile-proof",
							placeholder: t("profile.proofPlaceholder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("profile.proofHelp") }),
						fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
					control: form.control,
					name: "location",
					render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						className: "gap-1.5",
						"data-invalid": fieldState.invalid,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
								htmlFor: "profile-location",
								children: t("profile.location")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								...field,
								id: "profile-location",
								placeholder: "Dhaka"
							}),
							fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
					control: form.control,
					name: "website",
					render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						className: "gap-1.5",
						"data-invalid": fieldState.invalid,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
								htmlFor: "profile-website",
								children: t("profile.website")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								...field,
								id: "profile-website",
								placeholder: "https://"
							}),
							fieldState.invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: [fieldState.error] })
						]
					})
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "submit",
				disabled: updateProfile.isPending,
				children: updateProfile.isPending ? t("profile.saving") : t("profile.save")
			})
		})]
	}) })] });
}
function CreatorProfilePage() {
	const { isReady } = useAuth();
	const { t } = useI18n();
	const query = useMyProfileQuery(isReady);
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-72 items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t("profile.loading")
		})]
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: t("profile.loadError") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query.error ? getFunctionsErrorMessage(query.error) : t("common.tryAgain") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					size: "sm",
					className: "w-fit",
					onClick: () => void query.refetch(),
					children: t("common.tryAgain")
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl tracking-tight",
				children: t("profile.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-sm",
				children: [
					t("profile.lead"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/creators/$creatorId",
						params: { creatorId: query.data.uid },
						className: "text-foreground underline",
						children: t("profile.viewPublic")
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorProfileForm, { profile: query.data })]
	});
}
//#endregion
export { CreatorProfilePage as component };
