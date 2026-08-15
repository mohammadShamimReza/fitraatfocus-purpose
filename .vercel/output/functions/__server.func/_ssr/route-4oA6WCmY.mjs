import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useI18n, S as Button$1, f as useAuth, l as FitraatBrand, m as APP_LINKS, p as APP_CONFIG, r as CREATE_SYSTEM_PATH } from "./router-DTVZZ-r0.mjs";
import { t as Separator$1 } from "./separator-Diwm8j-6.mjs";
import { s as LocaleSwitcher } from "./locale-switcher-DPm_yI2i.mjs";
import { t as ThemeSwitcher } from "./theme-switcher-ZakYLFTE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-4oA6WCmY.js
var import_jsx_runtime = require_jsx_runtime();
function LandingFooter() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t bg-muted/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 lg:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatBrand, {
						markClassName: "size-5",
						nameClassName: "font-semibold text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs text-muted-foreground text-sm leading-relaxed",
						children: t("landing.footer.blurb")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterColumn, {
					title: t("landing.footer.product"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "how",
							className: "transition-colors hover:text-foreground",
							children: t("landing.nav.how")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/systems",
							className: "transition-colors hover:text-foreground",
							children: t("landing.nav.systems")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "app",
							className: "transition-colors hover:text-foreground",
							children: t("landing.nav.app")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "faq",
							className: "transition-colors hover:text-foreground",
							children: t("landing.nav.faq")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/v1/login",
							className: "transition-colors hover:text-foreground",
							children: t("landing.nav.studio")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterColumn, {
					title: t("landing.footer.getApp"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.webApp,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.cta.web")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.playStore,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.cta.play")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.iPhoneGuide,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.cta.iphone")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterColumn, {
					title: t("landing.footer.legal"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.privacy,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.footer.privacy")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.terms,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.footer.terms")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: APP_LINKS.donate,
							target: "_blank",
							rel: "noreferrer",
							className: "transition-colors hover:text-foreground",
							children: t("landing.footer.donate")
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto w-full max-w-6xl px-4 py-4 text-muted-foreground text-xs sm:px-6",
				children: APP_CONFIG.copyright
			})
		})]
	});
}
function FooterColumn({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foreground text-sm",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1.5 text-muted-foreground text-sm",
			children
		})]
	});
}
function LandingHeader() {
	const { t } = useI18n();
	const { user, isReady } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b bg-background/75 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatBrand, {
						markClassName: "size-5",
						nameClassName: "font-semibold text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "how"
							}),
							children: t("landing.nav.how")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
							children: t("landing.nav.browse")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "app"
							}),
							children: t("landing.nav.app")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "faq"
							}),
							children: t("landing.nav.faq")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSwitcher, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
							orientation: "vertical",
							className: "mx-1 hidden h-4 sm:block"
						}),
						isReady && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems" }),
							children: t("landing.nav.dashboard")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth/v1/login" }),
							children: t("landing.nav.signIn")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							nativeButton: false,
							size: "sm",
							className: "hidden sm:inline-flex",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/v1/login",
								search: { redirect: CREATE_SYSTEM_PATH }
							}),
							children: t("landing.nav.create")
						})] })
					]
				})
			]
		})
	});
}
function LandingLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {})
		]
	});
}
//#endregion
export { LandingLayout as component };
