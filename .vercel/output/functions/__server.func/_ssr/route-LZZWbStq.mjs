import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { d as useRouterState, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { C as cn, E as useI18n, S as Button$1, c as FitraatAppIcon, f as useAuth, i as getPostAuthPath, v as toast } from "./router-DTVZZ-r0.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-D9UiP_oH.mjs";
import { t as Spinner } from "./spinner-CzIKaVEI.mjs";
import { s as LocaleSwitcher } from "./locale-switcher-DPm_yI2i.mjs";
import { t as getAuthErrorKey } from "./auth-errors-DOakCACi.mjs";
import { t as siGoogle } from "../_libs/simple-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-LZZWbStq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FirebaseConfigAlert() {
	const { isConfigured } = useAuth();
	const { t } = useI18n();
	if (isConfigured) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: t("auth.firebaseMissing") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: t("auth.firebaseHelp") })
		]
	});
}
function SimpleIcon({ icon, className, ...props }) {
	const { title, path } = icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		"aria-label": title,
		"aria-hidden": "false",
		focusable: "false",
		className: cn("size-5 fill-foreground", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path })]
	});
}
function GoogleButton({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		variant: "secondary",
		className: cn(className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleIcon, {
			icon: siGoogle,
			className: "size-4"
		}), children ?? "Continue with Google"]
	});
}
function GoogleSignInButton() {
	const { signInWithGoogle, isConfigured } = useAuth();
	const { t } = useI18n();
	const navigate = useNavigate();
	const postAuthPath = useRouterState({ select: (state) => getPostAuthPath(state.location.search) });
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const onClick = async () => {
		setIsSubmitting(true);
		try {
			await signInWithGoogle();
			await navigate({
				href: postAuthPath,
				replace: true
			});
		} catch (error) {
			toast.add({
				title: t("auth.googleFailed"),
				description: t(getAuthErrorKey(error))
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleButton, {
		className: "w-full",
		variant: "outline",
		type: "button",
		disabled: !isConfigured || isSubmitting,
		onClick: () => {
			onClick();
		},
		children: t("auth.continueGoogle")
	});
}
function RedirectIfSignedIn({ children }) {
	const { user, isReady } = useAuth();
	const navigate = useNavigate();
	const postAuthPath = useRouterState({ select: (state) => getPostAuthPath(state.location.search) });
	(0, import_react.useEffect)(() => {
		if (isReady && user) navigate({
			href: postAuthPath,
			replace: true
		});
	}, [
		isReady,
		navigate,
		postAuthPath,
		user
	]);
	if (!isReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Checking your session"
		})]
	});
	if (user) return null;
	return children;
}
function LoginV1() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectIfSignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden bg-primary lg:block lg:w-1/3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full flex-col items-center justify-center p-12 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatAppIcon, { className: "mx-auto size-16 bg-primary-foreground text-primary ring-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-light text-5xl text-primary-foreground",
							children: "Fitraat Focus"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-primary-foreground/80 text-xl",
							children: t("auth.signInStudio")
						})]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-full items-center justify-center bg-background p-8 lg:w-2/3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-4 right-4 lg:top-6 lg:right-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSwitcher, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md space-y-10 py-24 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium tracking-tight",
						children: t("auth.signIn")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-xl text-muted-foreground",
						children: t("auth.signInHelp")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirebaseConfigAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignInButton, {})]
				})]
			})]
		})]
	}) });
}
//#endregion
export { LoginV1 as component };
