import { i as __toESM } from "../_runtime.mjs";
import { $ as AccordionRoot, Ct as require_jsx_runtime, Q as AccordionItem$1, X as AccordionTrigger$1, Y as AccordionPanel, Z as AccordionHeader, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Copy, F as ChevronDown, L as BadgeCheck, N as ChevronUp, R as ArrowUpRight, a as Target, b as Layers, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as cn, E as useI18n, S as Button$1, f as useAuth, m as APP_LINKS, r as CREATE_SYSTEM_PATH, u as FitraatMark, w as getInitials } from "./router-DTVZZ-r0.mjs";
import { t as Badge } from "./badge-DsjoU4A0.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CbueVUCK.mjs";
import { t as StudioGif } from "./studio-gif-BoQYPYgE.mjs";
import { t as categoryLabel } from "./labels-Bo_NEvdS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/(external)-DmnfHJQB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var landingCardClass = "transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-sm";
function LandingReveal({ children, className, delayMs = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (node.getBoundingClientRect().top < window.innerHeight * .92) return;
		setVisible(false);
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]", visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0", className),
		style: { transitionDelay: visible ? `${delayMs}ms` : "0ms" },
		children
	});
}
function LandingKicker({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]",
		children
	});
}
function LandingApp() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "app",
		className: "scroll-mt-20 border-y bg-muted/35",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.loop.kicker") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-3xl tracking-tight sm:text-4xl",
							children: t("landing.loop.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base",
							children: t("landing.loop.body")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
					id: "purpose-plan",
					alt: t("gif.plan"),
					size: 140,
					className: "self-start sm:self-center"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "pointer-events-none absolute top-4 right-[10%] left-[10%] hidden h-px bg-border lg:block"
				}), STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
					delayMs: index * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 flex size-8 items-center justify-center rounded-full border bg-background font-medium text-xs tabular-nums",
							children: step.number
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm",
								children: t(step.title)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-xs leading-relaxed",
								children: t(step.body)
							})]
						})]
					})
				}, step.number))]
			})]
		})
	});
}
var STEPS = [
	{
		number: "01",
		title: "landing.loop.prepare",
		body: "landing.loop.prepareBody"
	},
	{
		number: "02",
		title: "landing.loop.activate",
		body: "landing.loop.activateBody"
	},
	{
		number: "03",
		title: "landing.loop.focus",
		body: "landing.loop.focusBody"
	},
	{
		number: "04",
		title: "landing.loop.close",
		body: "landing.loop.closeBody"
	},
	{
		number: "05",
		title: "landing.loop.reflect",
		body: "landing.loop.reflectBody"
	}
];
var SAMPLES = [
	{
		id: "exam",
		category: "exam",
		gif: "purpose-library",
		gifAlt: "gif.library",
		title: "landing.sample.1.title",
		purpose: "landing.sample.1.purpose",
		creator: "landing.sample.1.creator",
		role: "landing.sample.1.role",
		sections: 6,
		tasks: 42
	},
	{
		id: "career",
		category: "career",
		gif: "purpose-plan",
		gifAlt: "gif.plan",
		title: "landing.sample.2.title",
		purpose: "landing.sample.2.purpose",
		creator: "landing.sample.2.creator",
		role: "landing.sample.2.role",
		sections: 5,
		tasks: 31
	},
	{
		id: "study",
		category: "study",
		gif: "purpose-complete",
		gifAlt: "gif.complete",
		title: "landing.sample.3.title",
		purpose: "landing.sample.3.purpose",
		creator: "landing.sample.3.creator",
		role: "landing.sample.3.role",
		sections: 4,
		tasks: 24
	}
];
function LandingSampleCard({ sample }) {
	const { t } = useI18n();
	const creator = t(sample.creator);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/systems",
		className: "group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: `h-full overflow-hidden shadow-none ${landingCardClass}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex aspect-[16/9] w-full items-center justify-center bg-muted/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
						id: sample.gif,
						alt: t(sample.gifAlt),
						size: 148
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: categoryLabel(t, sample.category)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-lg group-hover:underline",
							children: t(sample.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "line-clamp-2",
							children: t(sample.purpose)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-muted-foreground text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), t("systems.libraryMeta", {
							sections: sample.sections,
							tasks: sample.tasks
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-7 items-center justify-center rounded-full bg-muted font-medium text-[10px]",
							children: getInitials(creator)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium text-foreground text-sm",
								children: creator
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-muted-foreground text-xs",
								children: t(sample.role)
							})]
						})]
					})]
				})
			]
		})
	});
}
function LandingCatalog() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "systems",
		className: "mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "flex max-w-2xl flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.catalog.kicker") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-3xl tracking-tight sm:text-4xl",
						children: t("landing.showcase.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base",
						children: t("landing.showcase.body")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: SAMPLES.map((sample, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
					delayMs: index * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingSampleCard, { sample })
				}, sample.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
				delayMs: 180,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "lg",
					nativeButton: false,
					className: "w-fit",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
					children: [t("landing.hero.browse"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "data-icon": "inline-end" })]
				})
			})
		]
	});
}
function Accordion$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionRoot, {
		"data-slot": "accordion",
		className: cn("flex w-full flex-col", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
		"data-slot": "accordion-item",
		className: cn("not-last:border-b", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
			"data-slot": "accordion-trigger",
			className: cn("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", className),
			...props,
			children: [
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				})
			]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionPanel, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
			children
		})
	});
}
function LandingFaq() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
			className: "max-w-2xl space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.faq.kicker") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-3xl tracking-tight sm:text-4xl",
				children: t("landing.faq.title")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
			className: "max-w-3xl rounded-xl border bg-card px-4",
			children: FAQS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: item.question,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, { children: t(item.question) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t(item.answer)
				}) })]
			}, item.question))
		}) })]
	});
}
var FAQS = [
	{
		question: "landing.faq.q1",
		answer: "landing.faq.a1"
	},
	{
		question: "landing.faq.q2",
		answer: "landing.faq.a2"
	},
	{
		question: "landing.faq.q3",
		answer: "landing.faq.a3"
	},
	{
		question: "landing.faq.q4",
		answer: "landing.faq.a4"
	},
	{
		question: "landing.faq.q5",
		answer: "landing.faq.a5"
	},
	{
		question: "landing.faq.q6",
		answer: "landing.faq.a6"
	}
];
function LandingGetApp() {
	const { t } = useI18n();
	const { user, isReady } = useAuth();
	const createLink = isReady && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems/new" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/auth/v1/login",
		search: { redirect: CREATE_SYSTEM_PATH }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,var(--muted),transparent_65%)]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-3xl tracking-tight sm:text-4xl",
						children: t("landing.cta.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm leading-relaxed sm:text-base",
						children: t("landing.cta.body")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "lg",
							nativeButton: false,
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
							children: t("landing.hero.browse")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "lg",
							nativeButton: false,
							variant: "outline",
							render: createLink,
							children: t("landing.hero.create")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "lg",
							nativeButton: false,
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: APP_LINKS.webApp,
								target: "_blank",
								rel: "noreferrer"
							}),
							children: [t("landing.cta.web"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "data-icon": "inline-end" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "lg",
							nativeButton: false,
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: APP_LINKS.playStore,
								target: "_blank",
								rel: "noreferrer"
							}),
							children: [t("landing.cta.play"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "data-icon": "inline-end" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "lg",
							nativeButton: false,
							variant: "ghost",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: APP_LINKS.iPhoneGuide,
								target: "_blank",
								rel: "noreferrer"
							}),
							children: [t("landing.cta.iphone"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "data-icon": "inline-end" })]
						})
					]
				})]
			})]
		}) })
	});
}
function LandingHero() {
	const { t } = useI18n();
	const { user, isReady } = useAuth();
	const createLink = isReady && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/systems/new" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/auth/v1/login",
		search: { redirect: CREATE_SYSTEM_PATH }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] opacity-60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--muted),transparent_70%)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "landing-rise flex items-center gap-2 text-muted-foreground",
								style: { animationDelay: "40ms" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: "size-4 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.hero.kicker") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "landing-rise font-semibold text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]",
								style: { animationDelay: "120ms" },
								children: [t("landing.hero.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 block text-muted-foreground",
									children: t("landing.hero.titleAccent")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "landing-rise max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg",
								style: { animationDelay: "200ms" },
								children: t("landing.hero.body")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "landing-rise flex flex-wrap gap-2",
						style: { animationDelay: "280ms" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "lg",
								nativeButton: false,
								render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/systems" }),
								children: t("landing.hero.browse")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "lg",
								nativeButton: false,
								variant: "outline",
								render: createLink,
								children: t("landing.hero.create")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "lg",
								nativeButton: false,
								variant: "ghost",
								render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: APP_LINKS.webApp,
									target: "_blank",
									rel: "noreferrer"
								}),
								children: [t("landing.hero.openApp"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "data-icon": "inline-end" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-rise",
					style: { animationDelay: "220ms" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPreview, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: HIGHLIGHTS.map((item, index) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "landing-rise rounded-xl border bg-card/80 px-4 py-4 backdrop-blur-sm",
							style: { animationDelay: `${360 + index * 70}ms` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
								className: "flex items-center gap-2 font-medium text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 text-muted-foreground" }), t(item.label)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1.5 text-muted-foreground text-xs leading-relaxed",
								children: t(item.detail)
							})]
						}, item.label);
					})
				})
			})
		]
	});
}
function HeroPreview() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "absolute -inset-6 rounded-[2rem] bg-muted/70 blur-2xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-2xl border bg-card shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground/25" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground/15" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-muted-foreground text-xs",
						children: t("landing.preview.live")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center border-b bg-muted/20 px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
						id: "purpose-library",
						alt: t("gif.library"),
						size: 140
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 p-5",
					children: PREVIEW_ROWS.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 font-medium text-muted-foreground text-xs",
							children: String(index + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 space-y-1 pt-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm",
									children: t(row.title)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs leading-relaxed",
									children: t(row.body)
								}),
								index === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-full rounded-full bg-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-4/5 rounded-full bg-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-2/3 rounded-full bg-muted" })
									]
								}) : null
							]
						})]
					}, row.title))
				})
			]
		})]
	});
}
var HIGHLIGHTS = [
	{
		label: "landing.stat.purpose",
		detail: "landing.stat.purposeDetail",
		icon: Target
	},
	{
		label: "landing.stat.library",
		detail: "landing.stat.libraryDetail",
		icon: Layers
	},
	{
		label: "landing.stat.creators",
		detail: "landing.stat.creatorsDetail",
		icon: BadgeCheck
	},
	{
		label: "landing.stat.copy",
		detail: "landing.stat.copyDetail",
		icon: Copy
	}
];
var PREVIEW_ROWS = [
	{
		title: "landing.system.1.title",
		body: "landing.system.1.body"
	},
	{
		title: "landing.system.2.title",
		body: "landing.system.2.body"
	},
	{
		title: "landing.system.3.title",
		body: "landing.system.3.body"
	},
	{
		title: "landing.system.4.title",
		body: "landing.system.4.body"
	}
];
function LandingLoop() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "scroll-mt-20 border-y bg-muted/35",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "max-w-2xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.system.kicker") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-3xl tracking-tight sm:text-4xl",
						children: t("landing.system.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base",
						children: t("landing.system.body")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: PARTS.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
					delayMs: index * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: cn("h-full shadow-none", landingCardClass),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-muted-foreground text-xs tabular-nums",
								children: part.number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-base",
								children: t(part.title)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm leading-relaxed",
							children: t(part.body)
						}) })]
					})
				}, part.number))
			})]
		})
	});
}
var PARTS = [
	{
		number: "01",
		title: "landing.system.1.title",
		body: "landing.system.1.body"
	},
	{
		number: "02",
		title: "landing.system.2.title",
		body: "landing.system.2.body"
	},
	{
		number: "03",
		title: "landing.system.3.title",
		body: "landing.system.3.body"
	},
	{
		number: "04",
		title: "landing.system.4.title",
		body: "landing.system.4.body"
	}
];
function LandingProblem() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
			className: "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingKicker, { children: t("landing.problem.kicker") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-semibold text-3xl tracking-tight sm:text-4xl",
						children: [t("landing.problem.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-muted-foreground",
							children: t("landing.problem.titleAccent")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base",
						children: t("landing.problem.body")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioGif, {
				id: "purpose-complete",
				alt: t("gif.complete"),
				size: 140,
				className: "self-start sm:self-center"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: PROBLEMS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
				delayMs: index * 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: cn("h-full shadow-none", landingCardClass),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-muted-foreground text-xs tabular-nums",
							children: String(index + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: t(item.title)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm leading-relaxed",
						children: t(item.body)
					}) })]
				})
			}, item.title))
		})]
	});
}
var PROBLEMS = [
	{
		title: "landing.problem.1.title",
		body: "landing.problem.1.body"
	},
	{
		title: "landing.problem.2.title",
		body: "landing.problem.2.body"
	},
	{
		title: "landing.problem.3.title",
		body: "landing.problem.3.body"
	},
	{
		title: "landing.problem.4.title",
		body: "landing.problem.4.body"
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingProblem, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingLoop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCatalog, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingApp, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFaq, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingGetApp, {})
	] });
}
//#endregion
export { LandingPage as component };
