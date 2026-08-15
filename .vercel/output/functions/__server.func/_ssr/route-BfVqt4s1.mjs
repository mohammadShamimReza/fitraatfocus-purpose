import { i as __toESM } from "../_runtime.mjs";
import { s as THEME_PRESET_OPTIONS, u as fontOptions } from "./preferences-config-1RcgJSw-.mjs";
import { A as DialogClose, Ct as require_jsx_runtime, D as DialogPortal$1, E as DialogTitle$1, O as DialogPopup, St as mergeProps, a as Toggle, c as PopoverPortal, d as AvatarFallback$1, et as useRender, f as AvatarImage$1, i as ToggleGroup, j as DialogBackdrop, k as DialogDescription$1, l as PopoverTrigger$1, m as DialogRoot, n as CollapsibleTrigger$1, o as PopoverPopup, p as AvatarRoot, r as CollapsibleRoot, s as PopoverPositioner, t as CollapsiblePanel, u as PopoverRoot, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CirclePlus, I as Check, P as ChevronRight, T as EllipsisVertical, c as Search, d as PanelLeft, g as LogOut, k as CircleUser, l as Plus, s as Settings, t as X, v as ListTodo, y as LayoutGrid } from "../_libs/lucide-react.mjs";
import { t as useShallow } from "../_libs/zustand.mjs";
import { C as cn, E as useI18n, S as Button$1, _ as TooltipTrigger, d as usePreferencesStore, f as useAuth, g as TooltipContent, h as Tooltip$1, p as APP_CONFIG, s as Route$10, u as FitraatMark, v as toast, w as getInitials } from "./router-DTVZZ-r0.mjs";
import { i as navItemTitle } from "./labels-Bo_NEvdS.mjs";
import { t as Spinner } from "./spinner-CzIKaVEI.mjs";
import { t as Label } from "./textarea-e2R0841v.mjs";
import { t as Separator$1 } from "./separator-Diwm8j-6.mjs";
import "./input-COujH7Qi.mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./select-BvtYNnZ7.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuGroup, s as LocaleSwitcher, t as DropdownMenu } from "./locale-switcher-DPm_yI2i.mjs";
import { t as ThemeSwitcher } from "./theme-switcher-ZakYLFTE.mjs";
import { t as getAuthErrorKey } from "./auth-errors-DOakCACi.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BfVqt4s1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "sheet-content",
		"data-side": side,
		className: cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-0.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "sheet-title",
		className: cn("font-heading text-base font-medium text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "sheet-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 604800;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: cn(className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarInset({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className),
		...props
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("w-full text-sm", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-0", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [comp, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function SidebarMenuBadge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", className),
		...props
	});
}
function SidebarMenuSub({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className),
		...props
	});
}
function SidebarMenuSubItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		className: cn("group/menu-sub-item relative", className),
		...props
	});
}
function SidebarMenuSubButton({ render, size = "md", isActive = false, className, ...props }) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps({ className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className) }, props),
		render,
		state: {
			slot: "sidebar-menu-sub-button",
			sidebar: "menu-sub-button",
			size,
			active: isActive
		}
	});
}
function RequireAuth({ children }) {
	const { user, isReady } = useAuth();
	const { t } = useI18n();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		if (isReady && !user) navigate({
			to: "/auth/v1/login",
			search: { redirect: pathname },
			replace: true
		});
	}, [
		isReady,
		navigate,
		pathname,
		user
	]);
	if (!isReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t("auth.checkingSession")
		})]
	});
	if (!user) return null;
	return children;
}
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function getUserDisplayName(user) {
	if (!user) return "Creator";
	return user.displayName?.trim() || user.email || "Creator";
}
function getUserEmail(user) {
	return user?.email ?? "";
}
function getUserAvatar(user) {
	return user?.photoURL ?? "";
}
function AccountMenu() {
	const { user, signOut } = useAuth();
	const { t } = useI18n();
	const navigate = useNavigate();
	const name = getUserDisplayName(user);
	const email = getUserEmail(user);
	const avatar = getUserAvatar(user);
	const onSignOut = async () => {
		try {
			await signOut();
			await navigate({
				href: "/",
				replace: true
			});
		} catch (error) {
			toast.add({
				title: t("auth.signOutFailed"),
				description: t(getAuthErrorKey(error))
			});
		}
	};
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, { className: "size-9 rounded-lg" }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
			src: avatar || void 0,
			alt: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: getInitials(name) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		className: "min-w-56 rounded-lg",
		side: "bottom",
		align: "end",
		sideOffset: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0.5 px-2 py-1.5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-semibold",
					children: name
				}), email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-muted-foreground text-xs",
					children: email
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {}), t("nav.catalog")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/profile" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, {}), t("nav.profile")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => {
					onSignOut();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), t("nav.logOut")]
			})
		]
	})] });
}
function Popover$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRoot, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger$1, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPopup, {
			"data-slot": "popover-content",
			className: cn("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
var toggleVariants = cva("group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-muted"
		},
		size: {
			default: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function ToggleGroup$1({ className, variant, size, spacing = 2, orientation = "horizontal", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		"data-orientation": orientation,
		style: { "--gap": spacing },
		className: cn("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing,
				orientation
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }) {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
}
function LayoutControls() {
	const { values, resolvedThemeMode, setPreference, resetPreferences } = usePreferencesStore(useShallow((state) => ({
		values: state.values,
		resolvedThemeMode: state.resolvedThemeMode,
		setPreference: state.setPreference,
		resetPreferences: state.resetPreferences
	})));
	const { theme_mode: themeMode, theme_preset: themePreset, content_layout: contentLayout, navbar_style: navbarStyle, sidebar_variant: variant, sidebar_collapsible: collapsible, font } = values;
	const themePresetItems = THEME_PRESET_OPTIONS.map((preset) => ({
		value: preset.value,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2.5 rounded-full",
				style: { backgroundColor: (resolvedThemeMode ?? "light") === "dark" ? preset.primary.dark : preset.primary.light }
			}), preset.label]
		})
	}));
	const fontItems = fontOptions.map((option) => ({
		value: option.key,
		label: option.label
	}));
	const onThemePresetChange = (preset) => {
		setPreference("theme_preset", preset);
	};
	const onFontChange = (value) => {
		if (!value) return;
		setPreference("font", value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, { size: "icon" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
		align: "end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-medium text-sm leading-none",
					children: "Preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "Customize your dashboard layout preferences."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 **:data-[slot=toggle-group]:w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Theme Preset"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							items: themePresetItems,
							value: themePreset,
							onValueChange: (value) => {
								if (!value) return;
								onThemePresetChange(value);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								size: "sm",
								className: "w-full text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									className: "items-center",
									placeholder: "Preset"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: THEME_PRESET_OPTIONS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								className: "text-xs",
								value: preset.value,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 rounded-full",
										style: { backgroundColor: resolvedThemeMode === "dark" ? preset.primary.dark : preset.primary.light }
									}), preset.label]
								})
							}, preset.value)) }) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Fonts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							items: fontItems,
							value: font,
							onValueChange: (value) => {
								if (!value) return;
								onFontChange(value);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								size: "sm",
								className: "w-full text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select font" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: fontOptions.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								className: "text-xs",
								value: font.key,
								children: font.label
							}, font.key)) }) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Theme Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
							size: "sm",
							spacing: 0,
							variant: "outline",
							value: [themeMode],
							onValueChange: ([mode]) => {
								if (!mode) return;
								setPreference("theme_mode", mode);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "light",
									"aria-label": "Toggle light",
									children: "Light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "dark",
									"aria-label": "Toggle dark",
									children: "Dark"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "system",
									"aria-label": "Toggle system",
									children: "System"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Page Layout"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
							size: "sm",
							spacing: 0,
							variant: "outline",
							value: [contentLayout],
							onValueChange: ([layout]) => {
								if (!layout) return;
								setPreference("content_layout", layout);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "centered",
								"aria-label": "Toggle centered",
								children: "Centered"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "full-width",
								"aria-label": "Toggle full-width",
								children: "Full Width"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Navbar Behavior"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
							size: "sm",
							spacing: 0,
							variant: "outline",
							value: [navbarStyle],
							onValueChange: ([style]) => {
								if (!style) return;
								setPreference("navbar_style", style);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "sticky",
								"aria-label": "Toggle sticky",
								children: "Sticky"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "scroll",
								"aria-label": "Toggle scroll",
								children: "Scroll"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Sidebar Style"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
							size: "sm",
							spacing: 0,
							variant: "outline",
							value: [variant],
							onValueChange: ([nextVariant]) => {
								if (!nextVariant) return;
								setPreference("sidebar_variant", nextVariant);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "inset",
									"aria-label": "Toggle inset",
									children: "Inset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "sidebar",
									"aria-label": "Toggle sidebar",
									children: "Sidebar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
									value: "floating",
									"aria-label": "Toggle floating",
									children: "Floating"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-medium text-xs",
							children: "Sidebar Collapse Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
							size: "sm",
							spacing: 0,
							variant: "outline",
							value: [collapsible],
							onValueChange: ([nextCollapsible]) => {
								if (!nextCollapsible) return;
								setPreference("sidebar_collapsible", nextCollapsible);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "icon",
								"aria-label": "Toggle icon",
								children: "Icon"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								value: "offcanvas",
								"aria-label": "Toggle offcanvas",
								children: "OffCanvas"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						size: "sm",
						variant: "outline",
						className: "w-full text-xs",
						onClick: resetPreferences,
						children: "Restore Defaults"
					})
				]
			})]
		})
	})] });
}
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "dialog-content",
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("font-heading text-base leading-none font-medium", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
		"inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
		"block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
		"data-slot": "command",
		className: cn("flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground", className),
		...props
	});
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, showCloseButton = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
			className: "sr-only",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", className),
			showCloseButton,
			children
		})]
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "command-input-wrapper",
		className: "p-1 pb-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
			className: "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
				"data-slot": "command-input",
				className: cn("w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
				...props
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 opacity-50" }) })]
		})
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
		"data-slot": "command-list",
		className: cn("no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", className),
		...props
	});
}
function CommandEmpty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
		"data-slot": "command-empty",
		className: cn("py-6 text-center text-sm", className),
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		"data-slot": "command-group",
		className: cn("overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground", className),
		...props
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
		"data-slot": "command-separator",
		className: cn("-mx-1 h-px bg-border", className),
		...props
	});
}
function CommandItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
		"data-slot": "command-item",
		className: cn("group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })]
	});
}
var sidebarItems = [{
	id: 1,
	label: "Studio",
	items: [
		{
			id: "systems",
			title: "My systems",
			url: "/dashboard/systems",
			icon: ListTodo
		},
		{
			id: "new-system",
			title: "New system",
			url: "/dashboard/systems/new",
			icon: Plus
		},
		{
			id: "profile",
			title: "Profile",
			url: "/dashboard/profile",
			icon: CircleUser
		}
	]
}];
var sidebarGroupLabels = new Set(sidebarItems.flatMap((group) => group.label ? [group.label] : []));
function getSubItemGroup(groupLabel, itemTitle) {
	return sidebarGroupLabels.has(itemTitle) ? groupLabel ?? "Other" : itemTitle;
}
var searchItems = sidebarItems.flatMap((group) => group.items.flatMap((item) => {
	if (item.subItems) return item.subItems.map((sub) => ({
		id: sub.id,
		group: getSubItemGroup(group.label, item.title),
		label: sub.title,
		url: sub.url,
		icon: item.icon,
		disabled: sub.disabled,
		newTab: sub.newTab
	}));
	return [{
		id: item.id,
		group: group.label ?? "Other",
		label: item.title,
		url: item.url,
		icon: item.icon,
		disabled: item.disabled,
		newTab: item.newTab
	}];
}));
function getAvailableItems(items) {
	return items.filter((item) => !item.disabled);
}
var recommendations = getAvailableItems(searchItems);
function groupBy(items) {
	return [...new Set(items.map((item) => item.group))].map((group) => ({
		group,
		items: items.filter((item) => item.group === group)
	}));
}
function SearchDialog() {
	const [open, setOpen] = import_react.useState(false);
	const [query, setQuery] = import_react.useState("");
	const navigate = useNavigate();
	const { t } = useI18n();
	const localizeItem = (item) => ({
		...item,
		group: item.group === "Studio" ? t("nav.studio") : item.group,
		label: navItemTitle(t, item.id, item.label)
	});
	import_react.useEffect(() => {
		const down = (e) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	const handleOpenChange = (value) => {
		setOpen(value);
		if (!value) setQuery("");
	};
	const handleSelect = (item) => {
		if (item.disabled) return;
		handleOpenChange(false);
		if (item.newTab) window.open(item.url, "_blank", "noopener,noreferrer");
		else navigate({ to: item.url });
	};
	const renderGroups = (items) => groupBy(items.map(localizeItem)).map(({ group, items: groupItems }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
		heading: group,
		children: groupItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandItem, {
			disabled: item.disabled,
			value: `${item.group} ${item.label}`,
			onSelect: () => handleSelect(item),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: item.label
				})]
			})
		}, `${group}-${item.id}`))
	})] }, group));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		onClick: () => handleOpenChange(true),
		variant: "link",
		className: "px-0! font-normal text-muted-foreground hover:no-underline",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "data-icon": "inline-start" }),
			t("search.label"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", {
				className: "inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium text-[10px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs",
					children: "⌘"
				}), "J"]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
			placeholder: t("search.placeholder"),
			value: query,
			onValueChange: setQuery
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: t("search.empty") }), query ? renderGroups(searchItems) : renderGroups(recommendations)] })] })
	})] });
}
function Collapsible$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleRoot, {
		"data-slot": "collapsible",
		...props
	});
}
function CollapsibleTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger$1, {
		"data-slot": "collapsible-trigger",
		...props
	});
}
function CollapsibleContent({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsiblePanel, {
		"data-slot": "collapsible-content",
		...props
	});
}
function CollapsedIconFallback({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex size-4 shrink-0 items-center justify-center rounded-xs font-medium text-[10px] outline",
		children: title.slice(0, 1)
	});
}
function hasSubItems(item) {
	return Boolean(item.subItems?.length);
}
function NavMain({ items }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const { t } = useI18n();
	const newSystemLabel = t("nav.newSystem");
	const isItemActive = (item) => {
		if (hasSubItems(item)) return item.subItems.some((sub) => path.startsWith(sub.url));
		return path === item.url;
	};
	const isSubItemActive = (url) => {
		return path === url;
	};
	const isSubmenuOpen = (item) => {
		return item.subItems.some((sub) => path.startsWith(sub.url));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, {
		className: "flex flex-col gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems/new" }),
			tooltip: newSystemLabel,
			className: "min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: newSystemLabel })]
		}) }) })
	}) }), items.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [group.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, {
		className: "group-data-[collapsible=icon]:pointer-events-none",
		children: group.label === "Studio" ? t("nav.studio") : group.label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
		item,
		isItemActive,
		isSubItemActive,
		isSubmenuOpen
	}, item.id)) }) })] }, group.id))] });
}
function NavItem({ item, isItemActive, isSubItemActive, isSubmenuOpen }) {
	const { state, isMobile } = useSidebar();
	const isCollapsedDesktop = state === "collapsed" && !isMobile;
	if (!hasSubItems(item)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinkItem, {
		item,
		isActive: isItemActive(item),
		showIconFallback: isCollapsedDesktop
	});
	if (isCollapsedDesktop) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropdownItem, {
		item,
		isActive: isItemActive(item),
		isSubItemActive
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavCollapsibleItem, {
		item,
		isActive: isItemActive(item),
		defaultOpen: isSubmenuOpen(item),
		isSubItemActive
	});
}
function NavLinkItem({ item, isActive, showIconFallback }) {
	const { t } = useI18n();
	const title = navItemTitle(t, item.id, item.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.url,
			target: item.newTab ? "_blank" : void 0,
			rel: item.newTab ? "noreferrer" : void 0
		}),
		"aria-disabled": item.disabled,
		tooltip: title,
		isActive,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinkIcon, {
			item,
			title,
			showFallback: showIconFallback
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItemBadge, { badge: item.badge })] });
}
function NavLinkIcon({ item, title, showFallback }) {
	const Icon = item.icon;
	if (Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {});
	if (showFallback) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsedIconFallback, { title });
	return null;
}
function NavDropdownItem({ item, isActive, isSubItemActive }) {
	const Icon = item.icon;
	const { t } = useI18n();
	const title = navItemTitle(t, item.id, item.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
			tooltip: title,
			isActive,
			disabled: item.disabled
		}),
		children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsedIconFallback, { title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		side: "right",
		align: "start",
		sideOffset: 12,
		className: "w-48",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: item.subItems.map((subItem) => {
			const SubIcon = subItem.icon;
			const subTitle = navItemTitle(t, subItem.id, subItem.title);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: subItem.url,
					target: subItem.newTab ? "_blank" : void 0,
					rel: subItem.newTab ? "noreferrer" : void 0,
					"aria-current": isSubItemActive(subItem.url) ? "page" : void 0,
					className: "flex items-center gap-2"
				}),
				disabled: subItem.disabled,
				children: [SubIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subTitle })]
			}, subItem.id);
		}) })
	})] }) });
}
function NavCollapsibleItem({ item, isActive, defaultOpen, isSubItemActive }) {
	const Icon = item.icon;
	const { t } = useI18n();
	const title = navItemTitle(t, item.id, item.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible$1, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			"data-slot": "sidebar-menu-item",
			"data-sidebar": "menu-item",
			className: "group/menu-item relative"
		}),
		defaultOpen,
		className: "group/collapsible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
					tooltip: title,
					isActive,
					disabled: item.disabled
				}),
				children: [
					Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto transition-transform duration-200 group-data-panel-open/menu-button:rotate-90" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItemBadge, { badge: item.badge }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuSub, { children: item.subItems.map((subItem) => {
				const SubIcon = subItem.icon;
				const subTitle = navItemTitle(t, subItem.id, subItem.title);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuSubItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuSubButton, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: subItem.url,
						target: subItem.newTab ? "_blank" : void 0,
						rel: subItem.newTab ? "noreferrer" : void 0
					}),
					"aria-disabled": subItem.disabled,
					isActive: isSubItemActive(subItem.url),
					children: [SubIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subTitle })]
				}) }, subItem.id);
			}) }) })
		]
	});
}
function NavItemBadge({ badge }) {
	if (!badge) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuBadge, {
		className: cn("rounded-sm border capitalize", badge === "new" && "border-green-600 text-green-600 peer-hover/menu-button:text-green-600 peer-data-active/menu-button:text-green-600", badge === "soon" && "border-muted-foreground text-muted-foreground"),
		children: badge
	});
}
function NavUser() {
	const { isMobile } = useSidebar();
	const { user, signOut } = useAuth();
	const { t } = useI18n();
	const navigate = useNavigate();
	const name = getUserDisplayName(user);
	const email = getUserEmail(user);
	const avatar = getUserAvatar(user);
	const onSignOut = async () => {
		try {
			await signOut();
			await navigate({
				href: "/",
				replace: true
			});
		} catch (error) {
			toast.add({
				title: t("auth.signOutFailed"),
				description: t(getAuthErrorKey(error))
			});
		}
	};
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
			size: "lg",
			className: "data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
				className: "h-8 w-8 rounded-lg grayscale",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					src: avatar || void 0,
					alt: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					className: "rounded-lg",
					children: getInitials(name)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 text-left text-sm leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-muted-foreground text-xs",
					children: email
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "ml-auto size-4" })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		className: "w-(--anchor-width) min-w-56 rounded-lg",
		side: isMobile ? "bottom" : "right",
		align: "end",
		sideOffset: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-2 py-1.5 text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
					className: "h-8 w-8 rounded-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: avatar || void 0,
						alt: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "rounded-lg",
						children: getInitials(name)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid flex-1 text-left text-sm leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-muted-foreground text-xs",
						children: email
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {}), t("nav.catalog")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/profile" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, {}), t("nav.profile")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => {
					onSignOut();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), t("nav.logOut")]
			})
		]
	})] }) }) });
}
function AppSidebar({ ...props }) {
	const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(useShallow((s) => ({
		sidebarVariant: s.values.sidebar_variant,
		sidebarCollapsible: s.values.sidebar_collapsible,
		isSynced: s.isSynced
	})));
	const variant = isSynced ? sidebarVariant : props.variant;
	const collapsible = isSynced ? sidebarCollapsible : props.collapsible;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		...props,
		variant,
		collapsible,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-base",
					children: APP_CONFIG.name
				})]
			}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavMain, { items: sidebarItems }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavUser, {}) })
		]
	});
}
function DashboardLayout() {
	const { defaultOpen, variant, collapsible } = Route$10.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
		defaultOpen,
		style: { "--sidebar-width": "calc(var(--spacing) * 68)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
			variant,
			collapsible
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarInset, {
			className: cn("[html[data-content-layout=centered]_&>*]:mx-auto", "[html[data-content-layout=centered]_&>*]:w-full", "[html[data-content-layout=centered]_&>*]:max-w-screen-2xl", "peer-data-[variant=inset]:border", "[--dashboard-header-height:--spacing(12)]", "min-w-0 overflow-x-clip"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: cn("flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12", "[html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-50 [html[data-navbar-style=sticky]_&]:overflow-hidden [html[data-navbar-style=sticky]_&]:rounded-t-[inherit] [html[data-navbar-style=sticky]_&]:bg-background/50 [html[data-navbar-style=sticky]_&]:backdrop-blur-md"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full items-center justify-between px-4 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 lg:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, { className: "-ml-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
								orientation: "vertical",
								className: "mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutControls, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSwitcher, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenu, {})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 min-w-0 flex-1 overflow-x-hidden p-4 has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	}) });
}
//#endregion
export { DashboardLayout as component };
