import { i as __toESM } from "../_runtime.mjs";
import { a as PREFERENCE_KEYS, c as fontBootRegistry, d as fontRegistry, f as getPreferencePersistence, i as PREFERENCE_DEFAULTS, l as fontCssFamily, m as parsePreference, n as LOCALE_META, o as PREFERENCE_REGISTRY, p as isAppLocale, r as LOCALE_STORAGE_KEY } from "./preferences-config-1RcgJSw-.mjs";
import { Ct as require_jsx_runtime, _t as ToastViewport$1, at as TooltipPortal, ct as createToastManager, dt as ToastAction$1, ft as ToastClose$1, gt as ToastRoot, ht as ToastContent$1, it as TooltipPositioner, lt as useToastManager, mt as ToastDescription$1, nt as TooltipArrow, ot as TooltipTrigger$1, pt as ToastTitle$1, rt as TooltipPopup, st as TooltipRoot, tt as TooltipProvider$1, ut as ToastPortal$1, vt as ToastProvider$1, wt as require_react, xt as Button } from "../_libs/@base-ui/react+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as __exportAll, r as isFirebaseConfigured } from "./config-B0Zk47tz.mjs";
import { L as redirect, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { S as Info, _ as LoaderCircle, f as OctagonX, j as CircleCheck, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { n as useStore, r as createStore } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/i18n-provider-plx2JJhL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var getInitials = (str) => {
	if (typeof str !== "string" || !str.trim()) return "?";
	return str.trim().split(/\s+/).filter(Boolean).map((word) => word[0]).join("").toUpperCase() || "?";
};
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var setClientCookie = () => {
	throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
var dictionaries = {
	en: {
		"nav.studio": "Studio",
		"nav.newSystem": "New system",
		"nav.systems": "My systems",
		"nav.profile": "Profile",
		"nav.catalog": "View catalog",
		"nav.logOut": "Log out",
		"nav.language": "Language",
		"search.label": "Search",
		"search.placeholder": "Search systems…",
		"search.empty": "No results found.",
		"search.titlePlaceholder": "Search by title…",
		"search.category": "Category",
		"search.categoryAll": "All categories",
		"search.statusAll": "All statuses",
		"common.tryAgain": "Try again",
		"common.cancel": "Cancel",
		"common.add": "Add",
		"common.edit": "Edit",
		"common.delete": "Delete",
		"common.save": "Saving…",
		"common.saveChanges": "Save",
		"common.moveUp": "Move up",
		"common.moveDown": "Move down",
		"common.by": "By {name}",
		"common.byPrefix": "By",
		"common.loading": "Loading",
		"common.justNow": "Just now",
		"status.draft": "draft",
		"status.published": "published",
		"visibility.public": "Public",
		"visibility.private": "Private",
		"visibility.help": "Public appears in the catalog. Private stays on your account and in the Fitraat Focus app.",
		"visibility.saved": "Visibility updated",
		"visibility.savedPublic": "This system is in the public catalog.",
		"visibility.savedPrivate": "Only you can see this system, including in the Fitraat Focus app.",
		"visibility.error": "Could not update visibility",
		"category.exam": "Exam",
		"category.career": "Career",
		"category.study": "Study",
		"category.craft": "Craft",
		"category.health": "Health",
		"category.other": "Other",
		"priority.low": "Low",
		"priority.medium": "Medium",
		"priority.high": "High",
		"expertise.exam": "Exam prep",
		"expertise.career": "Career",
		"expertise.study": "Study systems",
		"expertise.craft": "Craft",
		"expertise.health": "Health",
		"expertise.teaching": "Teaching",
		"expertise.coaching": "Coaching",
		"expertise.research": "Research",
		"auth.checkingSession": "Checking your session",
		"auth.signIn": "Sign in",
		"auth.signInStudio": "Sign in to open your studio",
		"auth.signInHelp": "Continue with Google. New creators are signed up on the first visit. The catalog stays public.",
		"auth.continueGoogle": "Continue with Google",
		"auth.googleFailed": "Could not sign in with Google",
		"auth.signOutFailed": "Could not sign out",
		"auth.userDisabled": "This account has been disabled.",
		"auth.popupClosed": "Google sign-in was cancelled.",
		"auth.popupBlocked": "The browser blocked the Google sign-in popup.",
		"auth.network": "Network error. Check your connection and try again.",
		"auth.tooMany": "Too many attempts. Wait a moment and try again.",
		"auth.notAllowed": "Google sign-in is not enabled for the Firebase project.",
		"auth.generic": "Could not complete sign-in. Try again.",
		"auth.firebaseMissing": "Firebase is not configured",
		"auth.firebaseHelp": "Copy .env.example to .env and add the shared Fitraat Focus Firebase values.",
		"systems.title": "My systems",
		"systems.lead": "Write the library. Keep it private for the Fitraat Focus app, or make it public in the catalog.",
		"systems.loading": "Loading your systems",
		"systems.loadError": "Could not load your systems",
		"systems.emptyTitle": "Start with one purpose",
		"systems.emptyBody": "Name the goal, write why you are the person to teach it, then build the task library.",
		"systems.create": "Create a system",
		"systems.countOne": "{count} system",
		"systems.countMany": "{count} systems",
		"systems.publishedCount": "{count} published",
		"systems.draftCount": "{count} draft",
		"systems.downloadCount": "{count} downloads",
		"systems.untitled": "Untitled system",
		"systems.noPurpose": "No purpose written yet.",
		"systems.libraryMeta": "{sections} sections · {tasks} tasks",
		"systems.sectionsCount": "{count} sections",
		"systems.tasksCount": "{count} tasks",
		"newSystem.title": "New system",
		"newSystem.lead": "Start with the purpose and the story. Sections and tasks come next.",
		"newSystem.titleLabel": "Title",
		"newSystem.titlePlaceholder": "Gaokao first-place study system",
		"newSystem.titleHelp": "The name people will see when they choose this library.",
		"newSystem.titleError": "Give the system a name.",
		"newSystem.category": "Category",
		"newSystem.categoryPlaceholder": "Choose a category",
		"newSystem.categoryError": "Choose a category.",
		"newSystem.purpose": "Purpose",
		"newSystem.purposePlaceholder": "What this system is for, in plain language.",
		"newSystem.purposeHelp": "One clear outcome. Not a list of features.",
		"newSystem.purposeError": "Describe the purpose in a sentence or two.",
		"newSystem.story": "Story",
		"newSystem.storyPlaceholder": "Why you are the person to write this. What you completed.",
		"newSystem.storyHelp": "Credibility, not a biography.",
		"newSystem.storyError": "Say why this system is credible.",
		"newSystem.inside": "What is inside",
		"newSystem.insidePlaceholder": "The shape of the library: phases, subjects, or kinds of work.",
		"newSystem.insideError": "Add a short description of the library.",
		"newSystem.creating": "Creating…",
		"newSystem.continue": "Continue to library",
		"newSystem.createError": "Could not create the system",
		"newSystem.createMissing": "The system could not be created.",
		"cover.label": "Cover image",
		"cover.help": "A still image for the catalog and the Fitraat Focus app. JPEG, PNG, or WebP, up to 10 MB.",
		"cover.alt": "System cover",
		"cover.add": "Add image",
		"cover.replace": "Replace image",
		"cover.remove": "Remove image",
		"cover.uploading": "Uploading…",
		"cover.typeError": "Choose a JPEG, PNG, or WebP image.",
		"cover.sizeError": "Keep the image under 10 MB.",
		"cover.uploadError": "Could not upload the image",
		"cover.removeError": "Could not remove the image",
		"editor.loading": "Loading the system",
		"editor.loadError": "Could not load this system",
		"editor.notFound": "The system was not found.",
		"editor.back": "Back to systems",
		"editor.addPurpose": "Add a purpose in Details.",
		"editor.publish": "Publish",
		"editor.publishing": "Publishing…",
		"editor.published": "Published",
		"editor.publishedToast": "This system is now in the public catalog.",
		"editor.publishedPrivateToast": "This system is ready in the Fitraat Focus app. It stays off the catalog while it is private.",
		"editor.publishError": "Could not publish",
		"editor.visibility": "Who can see this",
		"editor.library": "Library",
		"editor.libraryLead": "Sections and tasks in the order people will follow.",
		"editor.details": "Details",
		"editor.overview": "Overview",
		"editor.purposeStory": "Purpose and story",
		"editor.purposeStoryHelp": "This is what people read before they fork the library.",
		"editor.outcomeHelp": "The outcome this library is for.",
		"editor.saveDetails": "Save details",
		"editor.identity": "Name and cover",
		"editor.identityHelp": "How this system appears in the catalog and in Fitraat Focus.",
		"editor.saveOverview": "Save overview",
		"editor.saved": "Saved",
		"editor.savedBody": "System details were updated.",
		"editor.savedOverviewBody": "Name and cover were updated.",
		"editor.saveError": "Could not save",
		"editor.noStory": "No story written yet.",
		"editor.noDescription": "No description written yet.",
		"insights.downloads": "Downloads",
		"insights.downloadsHint": "People who took a copy",
		"insights.unique": "Unique people",
		"insights.uniqueHint": "Counted once per account",
		"insights.library": "Library",
		"insights.libraryHint": "Sections and tasks",
		"insights.updated": "Updated",
		"insights.live": "Live on the catalog",
		"insights.privateLive": "Ready in your app, not on the catalog",
		"insights.draft": "Still a draft",
		"insights.libraryValue": "{sections} / {tasks}",
		"sections.title": "Sections",
		"sections.nameError": "Name the section.",
		"sections.sectionTitle": "Section title",
		"sections.placeholder": "Math fundamentals",
		"sections.description": "Description",
		"sections.optional": "Optional",
		"sections.adding": "Adding…",
		"sections.add": "Add section",
		"sections.emptyTitle": "No sections yet",
		"sections.emptyEdit": "Group the work before you add tasks.",
		"sections.emptyView": "This library has no sections yet.",
		"sections.addError": "Could not add section",
		"sections.deleteError": "Could not delete section",
		"sections.deleteAria": "Delete {title}",
		"sections.editAria": "Edit {title}",
		"sections.editError": "Could not update section",
		"sections.reorderError": "Could not rearrange sections",
		"sections.saving": "Saving…",
		"sections.deleteConfirmTitle": "Delete this section?",
		"sections.deleteConfirmBody": "This also removes every task in {title}. People who already took a copy keep theirs.",
		"tasks.title": "Tasks",
		"tasks.nameError": "Name the task.",
		"tasks.add": "Add task",
		"tasks.selectTitle": "Select a section",
		"tasks.selectBody": "Tasks live inside a section of the library.",
		"tasks.task": "Task",
		"tasks.taskPlaceholder": "Complete one timed mock paper",
		"tasks.how": "How to do it",
		"tasks.howPlaceholder": "The method, not just the title.",
		"tasks.priority": "Priority",
		"tasks.tags": "Tags",
		"tasks.tagsPlaceholder": "math, mock",
		"tasks.minutes": "Minutes",
		"tasks.adding": "Adding…",
		"tasks.addLibrary": "Add to library",
		"tasks.emptyTitle": "No tasks in this section",
		"tasks.emptyEdit": "Add the work someone would pick into a day.",
		"tasks.emptyView": "This section has no tasks yet.",
		"tasks.addError": "Could not add task",
		"tasks.deleteError": "Could not delete task",
		"tasks.deleteAria": "Delete {title}",
		"tasks.editAria": "Edit {title}",
		"tasks.editError": "Could not update task",
		"tasks.reorderError": "Could not rearrange tasks",
		"tasks.saving": "Saving…",
		"tasks.section": "Section",
		"tasks.deleteConfirmTitle": "Delete this task?",
		"tasks.deleteConfirmBody": "Remove {title} from the library. People who already took a copy keep theirs.",
		"tasks.minutesValue": "{count} min",
		"profile.title": "Profile",
		"profile.lead": "People see this on the public catalog.",
		"profile.viewPublic": "View public page",
		"profile.loading": "Loading your profile",
		"profile.loadError": "Could not load your profile",
		"profile.credibility": "Credibility",
		"profile.credibilityHelp": "Shown on every system you publish, so people know who wrote the library.",
		"profile.name": "Name",
		"profile.namePlaceholder": "Your name",
		"profile.nameError": "People need a name they can trust.",
		"profile.headline": "Headline",
		"profile.headlinePlaceholder": "Exam coach. 8 years. One method.",
		"profile.headlineHelp": "One line. Why someone should trust this library.",
		"profile.headlineError": "One line on why you are credible.",
		"profile.expertise": "Expertise",
		"profile.expertiseError": "Pick at least one area.",
		"profile.bio": "Bio",
		"profile.bioPlaceholder": "Who you are in a few sentences.",
		"profile.bioError": "Write a short bio.",
		"profile.proof": "Proof",
		"profile.proofPlaceholder": "What you completed. A result, a role, a year of teaching.",
		"profile.proofHelp": "Specific. Not a slogan.",
		"profile.proofError": "Say what you actually finished.",
		"profile.location": "Location",
		"profile.website": "Website",
		"profile.saving": "Saving…",
		"profile.save": "Save profile",
		"profile.saved": "Profile saved",
		"profile.savedBody": "This is what people see on your systems.",
		"profile.saveError": "Could not save profile",
		"landing.nav.how": "How it works",
		"landing.nav.systems": "Systems",
		"landing.nav.faq": "FAQ",
		"landing.nav.browse": "Browse",
		"landing.nav.signIn": "Sign in",
		"landing.nav.create": "Create a system",
		"landing.nav.dashboard": "Dashboard",
		"landing.nav.openApp": "Open the app",
		"landing.nav.app": "The app",
		"landing.nav.studio": "Creator studio",
		"landing.hero.kicker": "Purpose System Studio · for Fitraat Focus",
		"landing.hero.title": "Libraries from people who already did the work.",
		"landing.hero.titleAccent": "Not another blank to-do list.",
		"landing.hero.body": "This studio publishes purpose-driven systems: a named outcome, a story, and a library of sections and tasks. Open one, see who wrote it, then take a copy into the Fitraat Focus app.",
		"landing.hero.openApp": "Open the app",
		"landing.hero.browse": "Browse systems",
		"landing.hero.create": "Create a system",
		"landing.preview.live": "System shape",
		"landing.catalog.kicker": "Catalog",
		"landing.stat.purpose": "Purpose first",
		"landing.stat.purposeDetail": "Title, purpose, and story before any task.",
		"landing.stat.library": "Structured library",
		"landing.stat.libraryDetail": "Sections and finishable tasks, in order.",
		"landing.stat.creators": "Named creators",
		"landing.stat.creatorsDetail": "Profile and proof on every published system.",
		"landing.stat.copy": "Take a copy",
		"landing.stat.copyDetail": "Use it in the Fitraat Focus app when you run the work.",
		"landing.problem.kicker": "Why a system",
		"landing.problem.title": "A list is not a method.",
		"landing.problem.titleAccent": "A system is.",
		"landing.problem.body": "Most people collect tasks. A purpose system names the outcome, explains why this library works, and gives you the work in order — written by someone who already ran it.",
		"landing.problem.1.title": "Tasks without a finish line",
		"landing.problem.1.body": "A dump of todos has no purpose, so you cannot tell what done looks like.",
		"landing.problem.2.title": "No one standing behind it",
		"landing.problem.2.body": "Anonymous templates are hard to trust. Here every published system shows who wrote it.",
		"landing.problem.3.title": "No reusable structure",
		"landing.problem.3.body": "Useful work lives in sections you can walk through, not a single endless list.",
		"landing.problem.4.title": "You rebuild the same plan",
		"landing.problem.4.body": "Instead of starting from scratch, take a library from someone who already did the work.",
		"landing.system.kicker": "How a system is built",
		"landing.system.title": "Purpose, then the library.",
		"landing.system.body": "Every published system has the same shape, so you can judge it quickly, see who stands behind it, and take a copy.",
		"landing.system.1.title": "Purpose",
		"landing.system.1.body": "The outcome this library is for — exam, career, study, craft, health, or something else.",
		"landing.system.2.title": "Story and proof",
		"landing.system.2.body": "Why this creator is the person to write it, plus a public profile you can open.",
		"landing.system.3.title": "Sections",
		"landing.system.3.body": "Phases of the work, in order, so the library has a beginning, a middle, and a close.",
		"landing.system.4.title": "Tasks",
		"landing.system.4.body": "Finishable work with notes, priority, tags, and estimated minutes — not slogans.",
		"landing.loop.kicker": "Where you run it",
		"landing.loop.title": "The app holds the session. The system holds the work.",
		"landing.loop.body": "Fitraat Focus is the 5-step deep-work loop. Systems from this studio become the library you follow inside that loop.",
		"landing.loop.prepare": "Prepare",
		"landing.loop.prepareBody": "Set Block Time, Block Space, Energy, Resources, and Intention before you start.",
		"landing.loop.activate": "Activate",
		"landing.loop.activateBody": "Run a short ritual that lowers resistance and shifts you out of browsing mode.",
		"landing.loop.focus": "Focus",
		"landing.loop.focusBody": "Use Pomodoro or ultradian cycles with break guard and in-session support.",
		"landing.loop.close": "Close",
		"landing.loop.closeBody": "End with a closing ritual so work does not follow you into the rest of the day.",
		"landing.loop.reflect": "Reflect",
		"landing.loop.reflectBody": "Score focus, energy, and satisfaction so the next session is a little better.",
		"landing.showcase.title": "What a published system looks like",
		"landing.showcase.body": "Purpose, a named creator, sections, and finishable tasks. These cards show the catalog shape. Browse to open the live systems and take a copy.",
		"landing.sample.1.title": "Ninety days to a board exam",
		"landing.sample.1.purpose": "A close-range exam library: what to study, what to drop, and how to close each week without rebuilding the plan.",
		"landing.sample.1.creator": "N. Rahman",
		"landing.sample.1.role": "Exam coach",
		"landing.sample.2.title": "Portfolio first, then interviews",
		"landing.sample.2.purpose": "Ship a body of work you can stand behind, then walk into interviews with a sequence instead of a scramble.",
		"landing.sample.2.creator": "A. Karim",
		"landing.sample.2.role": "Career mentor",
		"landing.sample.3.title": "Read with a close, not a pile",
		"landing.sample.3.purpose": "A reading method that finishes books: capture, review, and a weekly close so unread stacks stop growing.",
		"landing.sample.3.creator": "S. Ahmed",
		"landing.sample.3.role": "Study method",
		"landing.catalog.title": "Published systems",
		"landing.catalog.body": "Open a library, read the purpose, and see who wrote it. Sign in only if you want to take a copy or publish your own.",
		"landing.catalog.loading": "Loading systems",
		"landing.catalog.error": "Could not load systems",
		"landing.catalog.emptyTitle": "No published systems yet",
		"landing.catalog.emptyBody": "When a creator publishes a library, it will show up here.",
		"catalog.back": "All systems",
		"gif.library": "Sections gathering into a still library",
		"gif.plan": "A task settling onto a day",
		"gif.complete": "A still flame of attention becoming a mark of completion",
		"landing.faq.kicker": "FAQ",
		"landing.faq.title": "Questions before you begin",
		"landing.faq.q1": "What is a purpose system?",
		"landing.faq.a1": "A purpose system is a library: a named outcome, a story, sections, and tasks. It is the method, not a blank list.",
		"landing.faq.q2": "What is this studio for?",
		"landing.faq.a2": "Creators publish systems here so other people can see who wrote them and take a copy. Browsing is public. Sign in to write a library or download one.",
		"landing.faq.q3": "How is this different from a to-do app?",
		"landing.faq.a3": "A to-do app stores your tasks. This studio publishes reusable systems with purpose, structure, and a named author. You run the work in Fitraat Focus.",
		"landing.faq.q4": "Do I need to sign in to read a system?",
		"landing.faq.a4": "No. Anyone can open a published system and the creator’s public page. Sign in only to create, edit, or take a copy.",
		"landing.faq.q5": "Where do I actually do the work?",
		"landing.faq.a5": "In the Fitraat Focus app: Prepare, Activate, Focus, Close, Reflect. The system you take from this studio is the library inside that loop.",
		"landing.faq.q6": "Can I try the app without installing anything?",
		"landing.faq.a6": "Yes. Open the web app in your browser. On Android you can also get it from Google Play. On iPhone, use Safari and Add to Home Screen.",
		"landing.cta.title": "Start with a system, not a blank page.",
		"landing.cta.body": "Browse a published library or write your own. When you are ready to sit down and work, open Fitraat Focus.",
		"landing.cta.web": "Web app",
		"landing.cta.play": "Google Play",
		"landing.cta.iphone": "iPhone",
		"landing.footer.product": "Studio",
		"landing.footer.getApp": "Get the app",
		"landing.footer.legal": "Legal and support",
		"landing.footer.privacy": "Privacy",
		"landing.footer.terms": "Terms",
		"landing.footer.donate": "Donate",
		"landing.footer.blurb": "A studio for purpose-driven systems. Run the work in the Fitraat Focus app."
	},
	bn: {
		"nav.studio": "স্টুডিও",
		"nav.newSystem": "নতুন সিস্টেম",
		"nav.systems": "আমার সিস্টেম",
		"nav.profile": "প্রোফাইল",
		"nav.catalog": "ক্যাটালগ দেখুন",
		"nav.logOut": "লগ আউট",
		"nav.language": "ভাষা",
		"search.label": "খুঁজুন",
		"search.placeholder": "সিস্টেম খুঁজুন…",
		"search.empty": "কোনো ফলাফল নেই।",
		"search.titlePlaceholder": "শিরোনাম দিয়ে খুঁজুন…",
		"search.category": "বিভাগ",
		"search.categoryAll": "সব বিভাগ",
		"search.statusAll": "সব স্ট্যাটাস",
		"common.tryAgain": "আবার চেষ্টা করুন",
		"common.cancel": "বাতিল",
		"common.add": "যোগ করুন",
		"common.edit": "সম্পাদনা",
		"common.delete": "মুছুন",
		"common.save": "সংরক্ষণ হচ্ছে…",
		"common.saveChanges": "সংরক্ষণ",
		"common.moveUp": "উপরে নিন",
		"common.moveDown": "নিচে নিন",
		"common.by": "{name} লিখেছেন",
		"common.byPrefix": "লিখেছেন",
		"common.loading": "লোড হচ্ছে",
		"common.justNow": "এইমাত্র",
		"status.draft": "খসড়া",
		"status.published": "প্রকাশিত",
		"visibility.public": "সবার জন্য",
		"visibility.private": "ব্যক্তিগত",
		"visibility.help": "সবার জন্য হলে ক্যাটালগে দেখাবে। ব্যক্তিগত হলে শুধু আপনার অ্যাকাউন্ট ও Fitraat Focus অ্যাপে থাকবে।",
		"visibility.saved": "দৃশ্যমানতা আপডেট হয়েছে",
		"visibility.savedPublic": "সিস্টেমটি এখন সবার ক্যাটালগে আছে।",
		"visibility.savedPrivate": "শুধু আপনি এটি দেখতে পারবেন, Fitraat Focus অ্যাপেও।",
		"visibility.error": "দৃশ্যমানতা আপডেট করা যায়নি",
		"category.exam": "পরীক্ষা",
		"category.career": "ক্যারিয়ার",
		"category.study": "পড়াশোনা",
		"category.craft": "কারিগরি",
		"category.health": "স্বাস্থ্য",
		"category.other": "অন্যান্য",
		"priority.low": "কম",
		"priority.medium": "মাঝারি",
		"priority.high": "উচ্চ",
		"expertise.exam": "পরীক্ষার প্রস্তুতি",
		"expertise.career": "ক্যারিয়ার",
		"expertise.study": "পড়ার সিস্টেম",
		"expertise.craft": "কারিগরি",
		"expertise.health": "স্বাস্থ্য",
		"expertise.teaching": "শিক্ষকতা",
		"expertise.coaching": "কোচিং",
		"expertise.research": "গবেষণা",
		"auth.checkingSession": "সেশন যাচাই করা হচ্ছে",
		"auth.signIn": "সাইন ইন",
		"auth.signInStudio": "স্টুডিও খুলতে সাইন ইন করুন",
		"auth.signInHelp": "Google দিয়ে চালিয়ে যান। নতুন নির্মাতারা প্রথমবারেই সাইন আপ হন। ক্যাটালগ সবার জন্য খোলা।",
		"auth.continueGoogle": "Google দিয়ে চালিয়ে যান",
		"auth.googleFailed": "Google দিয়ে সাইন ইন করা যায়নি",
		"auth.signOutFailed": "সাইন আউট করা যায়নি",
		"auth.userDisabled": "এই অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে।",
		"auth.popupClosed": "Google সাইন ইন বাতিল করা হয়েছে।",
		"auth.popupBlocked": "ব্রাউজার Google সাইন ইনের পপআপ আটকেছে।",
		"auth.network": "নেটওয়ার্ক সমস্যা। সংযোগ দেখে আবার চেষ্টা করুন।",
		"auth.tooMany": "অনেকবার চেষ্টা হয়েছে। একটু পরে আবার চেষ্টা করুন।",
		"auth.notAllowed": "এই Firebase প্রজেক্টে Google সাইন ইন চালু নেই।",
		"auth.generic": "সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।",
		"auth.firebaseMissing": "Firebase কনফিগার করা নেই",
		"auth.firebaseHelp": ".env.example কপি করে .env তৈরি করুন এবং Fitraat Focus-এর Firebase মানগুলো দিন।",
		"systems.title": "আমার সিস্টেম",
		"systems.lead": "লাইব্রেরি লিখুন। Fitraat Focus অ্যাপের জন্য ব্যক্তিগত রাখুন, অথবা ক্যাটালগে সবার জন্য খুলুন।",
		"systems.loading": "আপনার সিস্টেম লোড হচ্ছে",
		"systems.loadError": "সিস্টেম লোড করা যায়নি",
		"systems.emptyTitle": "একটি উদ্দেশ্য দিয়ে শুরু করুন",
		"systems.emptyBody": "লক্ষ্যের নাম দিন, কেন আপনি এটি শেখাবেন লিখুন, তারপর কাজের লাইব্রেরি তৈরি করুন।",
		"systems.create": "সিস্টেম তৈরি করুন",
		"systems.countOne": "{count}টি সিস্টেম",
		"systems.countMany": "{count}টি সিস্টেম",
		"systems.publishedCount": "{count}টি প্রকাশিত",
		"systems.draftCount": "{count}টি খসড়া",
		"systems.downloadCount": "{count}টি ডাউনলোড",
		"systems.untitled": "শিরোনামহীন সিস্টেম",
		"systems.noPurpose": "এখনো কোনো উদ্দেশ্য লেখা হয়নি।",
		"systems.libraryMeta": "{sections}টি বিভাগ · {tasks}টি কাজ",
		"systems.sectionsCount": "{count}টি বিভাগ",
		"systems.tasksCount": "{count}টি কাজ",
		"newSystem.title": "নতুন সিস্টেম",
		"newSystem.lead": "উদ্দেশ্য ও গল্প দিয়ে শুরু করুন। বিভাগ ও কাজ পরে আসবে।",
		"newSystem.titleLabel": "শিরোনাম",
		"newSystem.titlePlaceholder": "গাওকাও প্রথম স্থানের পড়ার সিস্টেম",
		"newSystem.titleHelp": "মানুষ এই লাইব্রেরি বেছে নেওয়ার সময় এই নাম দেখবে।",
		"newSystem.titleError": "সিস্টেমের একটি নাম দিন।",
		"newSystem.category": "বিভাগ",
		"newSystem.categoryPlaceholder": "একটি বিভাগ বেছে নিন",
		"newSystem.categoryError": "একটি বিভাগ বেছে নিন।",
		"newSystem.purpose": "উদ্দেশ্য",
		"newSystem.purposePlaceholder": "এই সিস্টেম কীসের জন্য, সহজ ভাষায়।",
		"newSystem.purposeHelp": "একটি স্পষ্ট ফলাফল। ফিচারের তালিকা নয়।",
		"newSystem.purposeError": "এক বা দুই বাক্যে উদ্দেশ্য লিখুন।",
		"newSystem.story": "গল্প",
		"newSystem.storyPlaceholder": "কেন আপনি এটি লিখছেন। আপনি কী সম্পন্ন করেছেন।",
		"newSystem.storyHelp": "বিশ্বাসযোগ্যতা, জীবনী নয়।",
		"newSystem.storyError": "এই সিস্টেম কেন বিশ্বাসযোগ্য তা বলুন।",
		"newSystem.inside": "ভিতরে কী আছে",
		"newSystem.insidePlaceholder": "লাইব্রেরির আকার: ধাপ, বিষয়, বা কাজের ধরন।",
		"newSystem.insideError": "লাইব্রেরির একটি সংক্ষিপ্ত বর্ণনা দিন।",
		"newSystem.creating": "তৈরি হচ্ছে…",
		"newSystem.continue": "লাইব্রেরিতে যান",
		"newSystem.createError": "সিস্টেম তৈরি করা যায়নি",
		"newSystem.createMissing": "সিস্টেম তৈরি করা যায়নি।",
		"cover.label": "কভার ছবি",
		"cover.help": "ক্যাটালগ ও Fitraat Focus অ্যাপে দেখাবে। JPEG, PNG বা WebP, সর্বোচ্চ ১০ MB।",
		"cover.alt": "সিস্টেম কভার",
		"cover.add": "ছবি যোগ করুন",
		"cover.replace": "ছবি বদলান",
		"cover.remove": "ছবি সরান",
		"cover.uploading": "আপলোড হচ্ছে…",
		"cover.typeError": "JPEG, PNG বা WebP ছবি বেছে নিন।",
		"cover.sizeError": "ছবি ১০ MB-এর নিচে রাখুন।",
		"cover.uploadError": "ছবি আপলোড করা যায়নি",
		"cover.removeError": "ছবি সরানো যায়নি",
		"editor.loading": "সিস্টেম লোড হচ্ছে",
		"editor.loadError": "এই সিস্টেম লোড করা যায়নি",
		"editor.notFound": "সিস্টেম পাওয়া যায়নি।",
		"editor.back": "সিস্টেমে ফিরুন",
		"editor.addPurpose": "বিস্তারিত ট্যাবে একটি উদ্দেশ্য যোগ করুন।",
		"editor.publish": "প্রকাশ করুন",
		"editor.publishing": "প্রকাশ হচ্ছে…",
		"editor.published": "প্রকাশিত",
		"editor.publishedToast": "সিস্টেমটি এখন সবার ক্যাটালগে আছে।",
		"editor.publishedPrivateToast": "সিস্টেমটি Fitraat Focus অ্যাপে ব্যবহারের জন্য তৈরি। ব্যক্তিগত থাকলে ক্যাটালগে দেখাবে না।",
		"editor.publishError": "প্রকাশ করা যায়নি",
		"editor.visibility": "কে দেখতে পারবে",
		"editor.library": "লাইব্রেরি",
		"editor.libraryLead": "বিভাগ ও কাজ, যে ক্রমে মানুষ অনুসরণ করবে।",
		"editor.details": "বিস্তারিত",
		"editor.overview": "সারসংক্ষেপ",
		"editor.purposeStory": "উদ্দেশ্য ও গল্প",
		"editor.purposeStoryHelp": "লাইব্রেরি নেওয়ার আগে মানুষ এটি পড়ে।",
		"editor.outcomeHelp": "এই লাইব্রেরি যে ফলাফলের জন্য।",
		"editor.saveDetails": "বিস্তারিত সংরক্ষণ করুন",
		"editor.identity": "নাম ও কভার",
		"editor.identityHelp": "ক্যাটালগ এবং Fitraat Focus-এ এই সিস্টেম যেভাবে দেখাবে।",
		"editor.saveOverview": "সারসংক্ষেপ সংরক্ষণ করুন",
		"editor.saved": "সংরক্ষিত",
		"editor.savedBody": "সিস্টেমের বিস্তারিত আপডেট হয়েছে।",
		"editor.savedOverviewBody": "নাম ও কভার আপডেট হয়েছে।",
		"editor.saveError": "সংরক্ষণ করা যায়নি",
		"editor.noStory": "এখনো কোনো গল্প লেখা হয়নি।",
		"editor.noDescription": "এখনো কোনো বর্ণনা লেখা হয়নি।",
		"insights.downloads": "ডাউনলোড",
		"insights.downloadsHint": "যারা একটি কপি নিয়েছে",
		"insights.unique": "আলাদা মানুষ",
		"insights.uniqueHint": "প্রতি অ্যাকাউন্টে একবার",
		"insights.library": "লাইব্রেরি",
		"insights.libraryHint": "বিভাগ ও কাজ",
		"insights.updated": "আপডেট",
		"insights.live": "ক্যাটালগে লাইভ",
		"insights.privateLive": "অ্যাপে তৈরি, ক্যাটালগে নয়",
		"insights.draft": "এখনো খসড়া",
		"insights.libraryValue": "{sections} / {tasks}",
		"sections.title": "বিভাগ",
		"sections.nameError": "বিভাগের নাম দিন।",
		"sections.sectionTitle": "বিভাগের শিরোনাম",
		"sections.placeholder": "গণিতের ভিত্তি",
		"sections.description": "বর্ণনা",
		"sections.optional": "ঐচ্ছিক",
		"sections.adding": "যোগ হচ্ছে…",
		"sections.add": "বিভাগ যোগ করুন",
		"sections.emptyTitle": "এখনো কোনো বিভাগ নেই",
		"sections.emptyEdit": "কাজ যোগ করার আগে গ্রুপ করুন।",
		"sections.emptyView": "এই লাইব্রেরিতে এখনো কোনো বিভাগ নেই।",
		"sections.addError": "বিভাগ যোগ করা যায়নি",
		"sections.deleteError": "বিভাগ মুছে ফেলা যায়নি",
		"sections.deleteAria": "{title} মুছুন",
		"sections.editAria": "{title} সম্পাদনা করুন",
		"sections.editError": "বিভাগ আপডেট করা যায়নি",
		"sections.reorderError": "বিভাগ সাজানো যায়নি",
		"sections.saving": "সংরক্ষণ হচ্ছে…",
		"sections.deleteConfirmTitle": "এই বিভাগ মুছবেন?",
		"sections.deleteConfirmBody": "{title}-এর সব কাজও মুছে যাবে। যারা আগে কপি নিয়েছেন, তাদের কপি থাকবে।",
		"tasks.title": "কাজ",
		"tasks.nameError": "কাজের নাম দিন।",
		"tasks.add": "কাজ যোগ করুন",
		"tasks.selectTitle": "একটি বিভাগ বেছে নিন",
		"tasks.selectBody": "কাজগুলো লাইব্রেরির একটি বিভাগের ভিতরে থাকে।",
		"tasks.task": "কাজ",
		"tasks.taskPlaceholder": "একটি সময়সীমাসহ মক পেপার শেষ করুন",
		"tasks.how": "কীভাবে করবেন",
		"tasks.howPlaceholder": "পদ্ধতি, শুধু শিরোনাম নয়।",
		"tasks.priority": "অগ্রাধিকার",
		"tasks.tags": "ট্যাগ",
		"tasks.tagsPlaceholder": "গণিত, মক",
		"tasks.minutes": "মিনিট",
		"tasks.adding": "যোগ হচ্ছে…",
		"tasks.addLibrary": "লাইব্রেরিতে যোগ করুন",
		"tasks.emptyTitle": "এই বিভাগে কোনো কাজ নেই",
		"tasks.emptyEdit": "কেউ একদিনে যে কাজ বেছে নেবে তা যোগ করুন।",
		"tasks.emptyView": "এই বিভাগে এখনো কোনো কাজ নেই।",
		"tasks.addError": "কাজ যোগ করা যায়নি",
		"tasks.deleteError": "কাজ মুছে ফেলা যায়নি",
		"tasks.deleteAria": "{title} মুছুন",
		"tasks.editAria": "{title} সম্পাদনা করুন",
		"tasks.editError": "কাজ আপডেট করা যায়নি",
		"tasks.reorderError": "কাজ সাজানো যায়নি",
		"tasks.saving": "সংরক্ষণ হচ্ছে…",
		"tasks.section": "বিভাগ",
		"tasks.deleteConfirmTitle": "এই কাজ মুছবেন?",
		"tasks.deleteConfirmBody": "লাইব্রেরি থেকে {title} সরানো হবে। যারা আগে কপি নিয়েছেন, তাদের কপি থাকবে।",
		"tasks.minutesValue": "{count} মিনিট",
		"profile.title": "প্রোফাইল",
		"profile.lead": "পাবলিক ক্যাটালগে মানুষ এটি দেখবে।",
		"profile.viewPublic": "পাবলিক পেজ দেখুন",
		"profile.loading": "প্রোফাইল লোড হচ্ছে",
		"profile.loadError": "প্রোফাইল লোড করা যায়নি",
		"profile.credibility": "বিশ্বাসযোগ্যতা",
		"profile.credibilityHelp": "আপনার প্রকাশিত প্রতিটি সিস্টেমে দেখানো হয়, যাতে মানুষ জানে কে লাইব্রেরি লিখেছে।",
		"profile.name": "নাম",
		"profile.namePlaceholder": "আপনার নাম",
		"profile.nameError": "মানুষের বিশ্বাস করার মতো একটি নাম দরকার।",
		"profile.headline": "হেডলাইন",
		"profile.headlinePlaceholder": "পরীক্ষা কোচ। ৮ বছর। একটি পদ্ধতি।",
		"profile.headlineHelp": "এক লাইন। কেন কেউ এই লাইব্রেরি বিশ্বাস করবে।",
		"profile.headlineError": "কেন আপনি বিশ্বাসযোগ্য, এক লাইনে লিখুন।",
		"profile.expertise": "দক্ষতা",
		"profile.expertiseError": "অন্তত একটি ক্ষেত্র বেছে নিন।",
		"profile.bio": "পরিচিতি",
		"profile.bioPlaceholder": "কয়েক বাক্যে আপনি কে।",
		"profile.bioError": "একটি সংক্ষিপ্ত পরিচিতি লিখুন।",
		"profile.proof": "প্রমাণ",
		"profile.proofPlaceholder": "আপনি কী সম্পন্ন করেছেন। একটি ফলাফল, একটি ভূমিকা, বা শিক্ষাদানের বছর।",
		"profile.proofHelp": "নির্দিষ্ট। স্লোগান নয়।",
		"profile.proofError": "আপনি আসলে কী শেষ করেছেন তা বলুন।",
		"profile.location": "অবস্থান",
		"profile.website": "ওয়েবসাইট",
		"profile.saving": "সংরক্ষণ হচ্ছে…",
		"profile.save": "প্রোফাইল সংরক্ষণ করুন",
		"profile.saved": "প্রোফাইল সংরক্ষিত",
		"profile.savedBody": "আপনার সিস্টেমে মানুষ এটিই দেখবে।",
		"profile.saveError": "প্রোফাইল সংরক্ষণ করা যায়নি",
		"landing.nav.how": "কীভাবে কাজ করে",
		"landing.nav.systems": "সিস্টেম",
		"landing.nav.faq": "প্রশ্নোত্তর",
		"landing.nav.browse": "দেখুন",
		"landing.nav.signIn": "সাইন ইন",
		"landing.nav.create": "সিস্টেম তৈরি করুন",
		"landing.nav.dashboard": "ড্যাশবোর্ড",
		"landing.nav.openApp": "অ্যাপ খুলুন",
		"landing.nav.app": "অ্যাপ",
		"landing.nav.studio": "ক্রিয়েটর স্টুডিও",
		"landing.hero.kicker": "Purpose System Studio · Fitraat Focus-এর জন্য",
		"landing.hero.title": "যারা ইতিমধ্যে কাজ করেছেন, তাদের লেখা লাইব্রেরি।",
		"landing.hero.titleAccent": "আরেকটি খালি টু-ডু তালিকা নয়।",
		"landing.hero.body": "এই স্টুডিওতে উদ্দেশ্যভিত্তিক সিস্টেম প্রকাশ হয়: একটি নামকরণ করা ফলাফল, একটি গল্প, আর সেকশন ও টাস্কের লাইব্রেরি। খুলুন, কে লিখেছে দেখুন, তারপর Fitraat Focus অ্যাপে একটি কপি নিন।",
		"landing.hero.openApp": "অ্যাপ খুলুন",
		"landing.hero.browse": "সিস্টেম দেখুন",
		"landing.hero.create": "সিস্টেম তৈরি করুন",
		"landing.preview.live": "সিস্টেমের আকার",
		"landing.catalog.kicker": "ক্যাটালগ",
		"landing.stat.purpose": "আগে উদ্দেশ্য",
		"landing.stat.purposeDetail": "কোনো টাস্কের আগে শিরোনাম, উদ্দেশ্য ও গল্প।",
		"landing.stat.library": "সাজানো লাইব্রেরি",
		"landing.stat.libraryDetail": "সেকশন এবং শেষ করা যায় এমন টাস্ক, ক্রমানুসারে।",
		"landing.stat.creators": "নামধারী ক্রিয়েটর",
		"landing.stat.creatorsDetail": "প্রকাশিত প্রতিটি সিস্টেমে প্রোফাইল ও প্রমাণ।",
		"landing.stat.copy": "কপি নিন",
		"landing.stat.copyDetail": "কাজ চালাতে Fitraat Focus অ্যাপে ব্যবহার করুন।",
		"landing.problem.kicker": "কেন একটি সিস্টেম",
		"landing.problem.title": "তালিকা কোনো পদ্ধতি নয়।",
		"landing.problem.titleAccent": "সিস্টেমই পদ্ধতি।",
		"landing.problem.body": "অধিকাংশ মানুষ টাস্ক জমা করে। একটি উদ্দেশ্যভিত্তিক সিস্টেম ফলাফল বলে, কেন এই লাইব্রেরি কাজ করে তা ব্যাখ্যা করে, আর কাজ ক্রমানুসারে দেয় — কেউ ইতিমধ্যে যা চালিয়েছেন।",
		"landing.problem.1.title": "শেষরেখা ছাড়া টাস্ক",
		"landing.problem.1.body": "উদ্দেশ্যহীন টু-ডুতে done কেমন দেখায় তা বোঝা যায় না।",
		"landing.problem.2.title": "পিছনে কেউ নেই",
		"landing.problem.2.body": "বেনামি টেমপ্লেট বিশ্বাস করা কঠিন। এখানে প্রকাশিত প্রতিটি সিস্টেমে লেখক দেখা যায়।",
		"landing.problem.3.title": "পুনর্ব্যবহারযোগ্য কাঠামো নেই",
		"landing.problem.3.body": "কাজ সেকশনে সাজানো থাকে, যাতে ধাপে ধাপে এগোতে পারেন — একটি অন্তহীন তালিকা নয়।",
		"landing.problem.4.title": "একই প্ল্যান আবার তৈরি",
		"landing.problem.4.body": "শূন্য থেকে শুরু না করে, কেউ ইতিমধ্যে যে কাজ করেছেন তার লাইব্রেরি নিন।",
		"landing.system.kicker": "একটি সিস্টেম কীভাবে গড়া",
		"landing.system.title": "আগে উদ্দেশ্য, তারপর লাইব্রেরি।",
		"landing.system.body": "প্রকাশিত প্রতিটি সিস্টেমের আকার এক, যাতে দ্রুত বিচার করতে পারেন, কে দাঁড়িয়ে আছে দেখতে পারেন, এবং একটি কপি নিতে পারেন।",
		"landing.system.1.title": "উদ্দেশ্য",
		"landing.system.1.body": "এই লাইব্রেরি কোন ফলাফলের জন্য — পরীক্ষা, ক্যারিয়ার, পড়াশোনা, ক্রাফট, স্বাস্থ্য, বা অন্য কিছু।",
		"landing.system.2.title": "গল্প ও প্রমাণ",
		"landing.system.2.body": "কেন এই ক্রিয়েটর এটি লেখার মানুষ, আর একটি পাবলিক প্রোফাইল যা খোলা যায়।",
		"landing.system.3.title": "সেকশন",
		"landing.system.3.body": "কাজের ধাপ, ক্রমানুসারে, যাতে লাইব্রেরির শুরু, মাঝ ও শেষ থাকে।",
		"landing.system.4.title": "টাস্ক",
		"landing.system.4.body": "নোট, অগ্রাধিকার, ট্যাগ ও আনুমানিক মিনিটসহ শেষ করা যায় এমন কাজ — স্লোগান নয়।",
		"landing.loop.kicker": "কাজ কোথায় চালান",
		"landing.loop.title": "অ্যাপ সেশন ধরে। সিস্টেম কাজ ধরে।",
		"landing.loop.body": "Fitraat Focus হলো ৫-ধাপের ডিপ-ওয়ার্ক লুপ। এই স্টুডিওর সিস্টেম সেই লুপের ভিতরের লাইব্রেরি।",
		"landing.loop.prepare": "প্রস্তুতি",
		"landing.loop.prepareBody": "শুরুর আগে Block Time, Block Space, Energy, Resources এবং Intention সেট করুন।",
		"landing.loop.activate": "অ্যাক্টিভেট",
		"landing.loop.activateBody": "একটি ছোট রীতি চালান যা প্রতিরোধ কমায় এবং ব্রাউজিং মোড থেকে বের করে।",
		"landing.loop.focus": "ফোকাস",
		"landing.loop.focusBody": "ব্রেক গার্ড ও সেশন-সাপোর্টসহ পোমোডোরো বা আলট্রাডিয়ান সাইকেল ব্যবহার করুন।",
		"landing.loop.close": "ক্লোজ",
		"landing.loop.closeBody": "একটি সংক্ষিপ্ত ক্লোজিং রীতিতে শেষ করুন, যাতে কাজ দিনের বাকি অংশে না যায়।",
		"landing.loop.reflect": "রিফ্লেক্ট",
		"landing.loop.reflectBody": "ফোকাস, শক্তি ও সন্তুষ্টি স্কোর করুন, যাতে পরের সেশন আরও ভালো হয়।",
		"landing.showcase.title": "প্রকাশিত সিস্টেম কেমন দেখায়",
		"landing.showcase.body": "উদ্দেশ্য, নামধারী ক্রিয়েটর, সেকশন, আর শেষ করা যায় এমন টাস্ক। এই কার্ডগুলো ক্যাটালগের আকার দেখায়। লাইভ সিস্টেম খুলতে ও কপি নিতে ব্রাউজ করুন।",
		"landing.sample.1.title": "বোর্ড পরীক্ষায় নব্বই দিন",
		"landing.sample.1.purpose": "কাছের পরীক্ষার লাইব্রেরি: কী পড়বেন, কী বাদ দেবেন, আর প্রতি সপ্তাহ কীভাবে শেষ করবেন — প্ল্যান আবার না গড়ে।",
		"landing.sample.1.creator": "এন. রহমান",
		"landing.sample.1.role": "পরীক্ষা কোচ",
		"landing.sample.2.title": "আগে পোর্টফোলিও, তারপর সাক্ষাৎকার",
		"landing.sample.2.purpose": "যে কাজের পেছনে দাঁড়াতে পারেন তা শেষ করুন, তারপর সাক্ষাৎকারে যান একটি ক্রম নিয়ে — তাড়াহুড়ো নয়।",
		"landing.sample.2.creator": "এ. করিম",
		"landing.sample.2.role": "ক্যারিয়ার মেন্টর",
		"landing.sample.3.title": "স্তূপ নয়, শেষ করে পড়ুন",
		"landing.sample.3.purpose": "বই শেষ করার পড়ার পদ্ধতি: ধরে রাখা, রিভিউ, আর সাপ্তাহিক ক্লোজ — যাতে না-পড়া স্তূপ না বাড়ে।",
		"landing.sample.3.creator": "এস. আহমেদ",
		"landing.sample.3.role": "অধ্যয়ন পদ্ধতি",
		"landing.catalog.title": "প্রকাশিত সিস্টেম",
		"landing.catalog.body": "একটি লাইব্রেরি খুলুন, উদ্দেশ্য পড়ুন, কে লিখেছে দেখুন। কপি নিতে বা নিজেরটি প্রকাশ করতেই সাইন ইন লাগে।",
		"landing.catalog.loading": "সিস্টেম লোড হচ্ছে",
		"landing.catalog.error": "সিস্টেম লোড করা যায়নি",
		"landing.catalog.emptyTitle": "এখনো কোনো প্রকাশিত সিস্টেম নেই",
		"landing.catalog.emptyBody": "কোনো ক্রিয়েটর লাইব্রেরি প্রকাশ করলে এখানে দেখা যাবে।",
		"catalog.back": "সব সিস্টেম",
		"gif.library": "বিভাগগুলো একটি স্থির লাইব্রেরিতে জড়ো হচ্ছে",
		"gif.plan": "একটি কাজ একটি দিনে স্থির হচ্ছে",
		"gif.complete": "মনযোগের স্থির শিখা সম্পূর্ণতার চিহ্ন হয়ে উঠছে",
		"landing.faq.kicker": "প্রশ্নোত্তর",
		"landing.faq.title": "শুরুর আগে কিছু প্রশ্ন",
		"landing.faq.q1": "উদ্দেশ্যভিত্তিক সিস্টেম কী?",
		"landing.faq.a1": "এটি একটি লাইব্রেরি: নামকরণ করা ফলাফল, গল্প, সেকশন ও টাস্ক। এটি পদ্ধতি, খালি তালিকা নয়।",
		"landing.faq.q2": "এই স্টুডিও কীসের জন্য?",
		"landing.faq.a2": "ক্রিয়েটররা এখানে সিস্টেম প্রকাশ করেন, যাতে অন্যরা দেখতে পারে কে লিখেছে এবং একটি কপি নিতে পারে। পড়া যায় পাবলিকভাবে। লাইব্রেরি লিখতে বা ডাউনলোড করতে সাইন ইন লাগে।",
		"landing.faq.q3": "টু-ডু অ্যাপ থেকে এটি কীভাবে আলাদা?",
		"landing.faq.a3": "টু-ডু অ্যাপ আপনার টাস্ক রাখে। এই স্টুডিও উদ্দেশ্য, কাঠামো ও নামধারী লেখকসহ পুনর্ব্যবহারযোগ্য সিস্টেম প্রকাশ করে। কাজ Fitraat Focus-এ চালান।",
		"landing.faq.q4": "সিস্টেম পড়তে কি সাইন ইন লাগে?",
		"landing.faq.a4": "না। যে কেউ প্রকাশিত সিস্টেম ও ক্রিয়েটরের পাবলিক পেজ খুলতে পারে। তৈরি, সম্পাদনা বা কপি নিতেই সাইন ইন লাগে।",
		"landing.faq.q5": "কাজ আসলে কোথায় করব?",
		"landing.faq.a5": "Fitraat Focus অ্যাপে: প্রস্তুতি, অ্যাক্টিভেট, ফোকাস, ক্লোজ, রিফ্লেক্ট। এই স্টুডিও থেকে নেওয়া সিস্টেম সেই লুপের লাইব্রেরি।",
		"landing.faq.q6": "ইনস্টল ছাড়া কি অ্যাপ চেষ্টা করা যায়?",
		"landing.faq.a6": "হ্যাঁ। ব্রাউজারে ওয়েব অ্যাপ খুলুন। অ্যান্ড্রয়েডে Google Play থেকেও নিতে পারেন। আইফোনে Safari ব্যবহার করে Add to Home Screen করুন।",
		"landing.cta.title": "খালি পাতা নয়, একটি সিস্টেম দিয়ে শুরু করুন।",
		"landing.cta.body": "প্রকাশিত লাইব্রেরি দেখুন বা নিজেরটি লিখুন। বসে কাজ করার সময় Fitraat Focus খুলুন।",
		"landing.cta.web": "ওয়েব অ্যাপ",
		"landing.cta.play": "Google Play",
		"landing.cta.iphone": "আইফোন",
		"landing.footer.product": "স্টুডিও",
		"landing.footer.getApp": "অ্যাপ নিন",
		"landing.footer.legal": "আইনি ও সাপোর্ট",
		"landing.footer.privacy": "প্রাইভেসি",
		"landing.footer.terms": "শর্তাবলি",
		"landing.footer.donate": "ডোনেশন",
		"landing.footer.blurb": "উদ্দেশ্যভিত্তিক সিস্টেমের স্টুডিও। কাজ Fitraat Focus অ্যাপে চালান।"
	}
};
function translate(locale, key, vars) {
	const template = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (_, name) => {
		const value = vars[name];
		return value === void 0 ? `{${name}}` : String(value);
	});
}
var I18nContext = (0, import_react.createContext)(null);
function persistLocale(locale) {
	try {
		window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	} catch {}
	setClientCookie(LOCALE_STORAGE_KEY, locale, 365);
	document.documentElement.lang = LOCALE_META[locale].htmlLang;
}
function I18nProvider({ children, initialLocale = "en" }) {
	const [locale, setLocaleState] = (0, import_react.useState)(isAppLocale(initialLocale) ? initialLocale : "en");
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = LOCALE_META[locale].htmlLang;
	}, [locale]);
	const setLocale = (0, import_react.useCallback)((next) => {
		setLocaleState(next);
		persistLocale(next);
	}, []);
	const t = (0, import_react.useCallback)((key, vars) => translate(locale, key, vars), [locale]);
	const value = (0, import_react.useMemo)(() => ({
		locale,
		setLocale,
		t
	}), [
		locale,
		setLocale,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value,
		children
	});
}
var fallbackI18n = {
	locale: "en",
	setLocale: () => void 0,
	t: (key, vars) => translate("en", key, vars)
};
function useI18n() {
	return (0, import_react.useContext)(I18nContext) ?? fallbackI18n;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DTVZZ-r0.js
var FunctionsApiError = class extends Error {
	status;
	code;
	constructor(message, status, code) {
		super(message);
		this.name = "FunctionsApiError";
		this.status = status;
		this.code = code;
	}
};
function getFunctionsErrorMessage(error) {
	if (error instanceof FunctionsApiError) return error.message;
	if (error instanceof Error && error.message) return error.message;
	return "The request failed. Try again.";
}
function shouldRetryFunctionsError(error) {
	if (!(error instanceof FunctionsApiError)) return true;
	return error.status >= 500;
}
function readErrorMessage(payload, fallback) {
	if (typeof payload === "string" && payload.trim()) return payload;
	if (payload && typeof payload === "object") {
		const record = payload;
		if (typeof record.message === "string" && record.message.trim()) return record.message;
		if (typeof record.error === "string" && record.error.trim()) return record.error;
	}
	return fallback;
}
function toFunctionsApiError(payload, status, fallback) {
	const record = payload && typeof payload === "object" ? payload : null;
	const code = typeof record?.code === "string" ? record.code : void 0;
	return new FunctionsApiError(readErrorMessage(payload, fallback), status, code);
}
var QUERY_STALE_TIME_MS = 3e4;
var QUERY_GC_TIME_MS = 3e5;
function createQueryClient() {
	return new QueryClient({ defaultOptions: {
		queries: {
			staleTime: QUERY_STALE_TIME_MS,
			gcTime: QUERY_GC_TIME_MS,
			retry: (failureCount, error) => shouldRetryFunctionsError(error) && failureCount < 1,
			refetchOnWindowFocus: false
		},
		mutations: { retry: 0 }
	} });
}
var toast = createToastManager();
function ToastProvider({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider$1, { ...props });
}
function ToastPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal$1, {
		"data-slot": "toast-portal",
		...props
	});
}
function ToastViewport({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport$1, {
		"data-slot": "toast-viewport",
		className: cn("pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full", className),
		...props
	});
}
function Toast$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastRoot, {
		"data-slot": "toast",
		className: cn("group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]", "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]", "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']", "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]", "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]", "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]", "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", className),
		...props
	});
}
function ToastContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContent$1, {
		"data-slot": "toast-content",
		className: cn("flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100", className),
		...props
	});
}
function ToastTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle$1, {
		"data-slot": "toast-title",
		className: cn("text-sm font-medium", className),
		...props
	});
}
function ToastDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription$1, {
		"data-slot": "toast-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function ToastAction({ className, render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
	variant: "outline",
	size: "sm"
}), ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction$1, {
		"data-slot": "toast-action",
		render,
		className: cn("shrink-0", className),
		...props
	});
}
function ToastClose({ className, children, render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
	variant: "ghost",
	size: "icon-sm"
}), ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose$1, {
		"data-slot": "toast-close",
		"aria-label": "Close toast",
		render,
		className: cn("relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground", className),
		...props,
		children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
	});
}
function ToastIcon({ type }) {
	let icon = null;
	if (type === "success") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { "aria-hidden": "true" });
	if (type === "info") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { "aria-hidden": "true" });
	if (type === "warning") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { "aria-hidden": "true" });
	if (type === "error") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonX, {
		className: "text-destructive",
		"aria-hidden": "true"
	});
	if (type === "loading") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "animate-spin",
		"aria-hidden": "true"
	});
	if (!icon) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "toast-icon",
		className: "shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
		children: icon
	});
}
function ToastList() {
	const { toasts } = useToastManager();
	return toasts.map((toastItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast$1, {
		toast: toastItem,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastIcon, { type: toastItem.type }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose, {})
		] })
	}, toastItem.id));
}
function Toaster({ children, toastManager = toast, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastProvider, {
		toastManager,
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastList, {}) }) })]
	});
}
function TooltipProvider({ delay = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider$1, {
		"data-slot": "tooltip-provider",
		delay,
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipRoot, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger$1, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipPopup, {
			"data-slot": "tooltip-content",
			className: cn("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipArrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
		})
	}) });
}
var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
var APP_LINKS = {
	site: "https://fitraatfocus.fitraat.com/",
	studio: "https://studio.fitraatfocus.fitraat.com",
	webApp: "https://fitraat-focus.web.app",
	playStore: "https://play.google.com/store/apps/details?id=com.fitraatfocus",
	iPhoneGuide: "https://fitraatfocus.fitraat.com/#iphone",
	privacy: "https://fitraatfocus.fitraat.com/privacy",
	terms: "https://fitraatfocus.fitraat.com/terms",
	donate: "https://fitraatfocus.fitraat.com/donate"
};
var APP_CONFIG = {
	name: "Fitraat Focus",
	version: "1.0.0",
	copyright: `© ${currentYear}, Fitraat Focus. Built for consistency, clarity, and meaningful work.`,
	meta: {
		title: "Fitraat Focus — Purpose System Studio",
		description: "Browse purpose-driven systems written by named creators. Take a copy into the Fitraat Focus app when you are ready to run the work."
	}
};
var AuthContext = (0, import_react.createContext)(null);
async function loadAuth() {
	const [{ getFirebaseAuth, getGoogleAuthProvider }, firebaseAuth] = await Promise.all([import("./client-HlrB73sm.mjs").then((n) => n.t).then((n) => n.t), import("../_libs/firebase.mjs").then((n) => n.t)]);
	return {
		getFirebaseAuth,
		getGoogleAuthProvider,
		firebaseAuth
	};
}
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isReady, setIsReady] = (0, import_react.useState)(false);
	const isConfigured = isFirebaseConfigured();
	(0, import_react.useEffect)(() => {
		if (!isConfigured) {
			setIsReady(true);
			return;
		}
		let unsubscribe = () => void 0;
		let cancelled = false;
		loadAuth().then(({ getFirebaseAuth, firebaseAuth }) => {
			if (cancelled) return;
			unsubscribe = firebaseAuth.onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
				setUser(nextUser);
				setIsReady(true);
			});
		}).catch(() => {
			if (!cancelled) setIsReady(true);
		});
		return () => {
			cancelled = true;
			unsubscribe();
		};
	}, [isConfigured]);
	const signInWithGoogle = (0, import_react.useCallback)(async () => {
		const { getFirebaseAuth, getGoogleAuthProvider, firebaseAuth } = await loadAuth();
		await firebaseAuth.signInWithPopup(getFirebaseAuth(), getGoogleAuthProvider());
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		const { getFirebaseAuth, firebaseAuth } = await loadAuth();
		await firebaseAuth.signOut(getFirebaseAuth());
	}, []);
	const getIdToken = (0, import_react.useCallback)(async () => {
		const { getFirebaseAuth } = await loadAuth();
		const currentUser = getFirebaseAuth().currentUser;
		if (!currentUser) throw new Error("You need to sign in first.");
		return currentUser.getIdToken();
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		isReady,
		isConfigured,
		signInWithGoogle,
		signOut,
		getIdToken
	}), [
		user,
		isReady,
		isConfigured,
		signInWithGoogle,
		signOut,
		getIdToken
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext, {
		value,
		children
	});
}
function useAuth() {
	const context = (0, import_react.use)(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider.");
	return context;
}
/**
* Sets html lang from the stored locale before hydration so the document language
* matches the user's last choice without waiting for React.
*/
function LocaleBootScript() {
	const code = `
    (function () {
      try {
        var key = ${JSON.stringify(LOCALE_STORAGE_KEY)};
        var value = null;

        try {
          value = window.localStorage.getItem(key);
        } catch (e) {}

        if (!value) {
          var match = document.cookie.split("; ").find(function (row) {
            return row.startsWith(key + "=");
          });
          value = match ? decodeURIComponent(match.split("=")[1]) : null;
        }

        if (value === "en" || value === "bn") {
          document.documentElement.lang = value;
        }
      } catch (e) {}
    })();
  `;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: code } });
}
/**
* Boot script that reads user preference values from cookies or localStorage
* based on the configured persistence mode.
*
* Runs early in <head> to apply the correct data attributes before hydration,
* preventing layout or theme flicker and keeping the root document fully static.
*/
function ThemeBootScript() {
	const code = `
    (function () {
      try {
        var root = document.documentElement;
        var REGISTRY = ${JSON.stringify(PREFERENCE_REGISTRY)};
        var FONTS = ${JSON.stringify(fontBootRegistry)};

        function readCookie(name) {
          var match = document.cookie.split("; ").find(function(c) {
            return c.startsWith(name + "=");
          });
          return match ? decodeURIComponent(match.split("=")[1]) : null;
        }

        function readLocal(name) {
          try {
            return window.localStorage.getItem(name);
          } catch (e) {
            return null;
          }
        }

        function readPreference(key, definition) {
          var mode = definition.persistence;
          var value = null;

          if (mode === "localStorage") {
            value = readLocal(key);
          }

          if (!value && (mode === "client-cookie" || mode === "server-cookie")) {
            value = readCookie(key);
          }

          return definition.values.indexOf(value) >= 0 ? value : definition.defaultValue;
        }

        var preferences = {};

        Object.keys(REGISTRY).forEach(function(key) {
          var definition = REGISTRY[key];
          var value = readPreference(key, definition);

          preferences[key] = value;
          root.setAttribute(definition.attribute, value);
        });

        var mode = preferences.theme_mode;
        var resolvedMode =
          mode === "system" && window.matchMedia
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : mode === "dark"
              ? "dark"
              : "light";

        root.classList.toggle("dark", resolvedMode === "dark");
        root.style.colorScheme = resolvedMode;

        function fontCssFamily(font) {
          var names = [font.family].concat(font.companions || []);
          return names.map(function (name) {
            return '"' + name + '"';
          }).join(", ") + ", " + font.fallback;
        }

        function applyFont(font) {
          root.style.setProperty("--app-font-sans", fontCssFamily(font));
          root.style.setProperty("--app-font-variation-settings", font.variationSettings || "normal");
        }

        function loadFont(key, font, onLoaded) {
          var id = "app-font-stylesheet-" + key;
          var existingStylesheet = document.getElementById(id);

          if (existingStylesheet) {
            onLoaded();
            return;
          }

          var stylesheet = document.createElement("link");
          stylesheet.id = id;
          stylesheet.rel = "stylesheet";
          stylesheet.href = font.stylesheet;
          stylesheet.onerror = onLoaded;
          stylesheet.onload = function() {
            if (!document.fonts || !document.fonts.load) {
              onLoaded();
              return;
            }

            document.fonts.load('400 1rem "' + font.family + '"', "BESbswy").then(onLoaded, onLoaded);
          };
          document.head.appendChild(stylesheet);
        }

        var defaultFontKey = REGISTRY.font.defaultValue;
        var defaultFont = FONTS[defaultFontKey];
        var selectedFontKey = preferences.font;
        var selectedFont = FONTS[selectedFontKey];

        if (defaultFont) {
          applyFont(defaultFont);
        }

        if (selectedFont && selectedFontKey !== defaultFontKey) {
          var selectedFontReady = false;

          function activateSelectedFont() {
            if (selectedFontReady) return;

            selectedFontReady = true;
            applyFont(selectedFont);
          }

          loadFont(selectedFontKey, selectedFont, activateSelectedFont);
          window.setTimeout(activateSelectedFont, 2000);
        }

        function loadFontsInBackground() {
          Object.keys(FONTS).forEach(function(key) {
            if (key === defaultFontKey || key === selectedFontKey) return;

            loadFont(key, FONTS[key], function() {});
          });
        }

        function scheduleBackgroundFontLoading() {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(loadFontsInBackground, { timeout: 2000 });
            return;
          }

          window.setTimeout(loadFontsInBackground, 0);
        }

        if (document.readyState === "complete") {
          scheduleBackgroundFontLoading();
        } else {
          window.addEventListener("load", scheduleBackgroundFontLoading, { once: true });
        }
      } catch (e) {
        console.warn("ThemeBootScript error:", e);
      }
    })();
  `;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: code } });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
createServerFn({ method: "GET" }).validator((key) => key).handler(createSsrRpc("f9d8ae559166898eb614ac265196b64179a739d9e310b9a94fd53b6d1cc3c447"));
var setValueToCookieServer = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0176c172b4f14ca60481e6038161d67997a0758d5fe5197ac516a6cf465e47ca"));
async function setValueToCookie(key, value, options = {}) {
	await setValueToCookieServer({ data: {
		key,
		value,
		options
	} });
}
createServerFn({ method: "GET" }).validator((key) => key).handler(createSsrRpc("2956aca5c7d5dd1cdeb6c495f84aae6dc2a941b9144f2122b7abbca3e8212b4a"));
var getDashboardLayoutServer = createServerFn({ method: "GET" }).handler(createSsrRpc("684f03a5db59fc91a94338b0308aaff88adf242c5ce92d8852cabd8263a72416"));
async function getDashboardLayout() {
	return getDashboardLayoutServer();
}
var getInitialLocaleServer = createServerFn({ method: "GET" }).handler(createSsrRpc("0a3af5262666a3dc61d50514e406ec9690cb780738e76d23848e9c9299e706ca"));
function getInitialLocale() {
	return getInitialLocaleServer();
}
function resolveThemeMode(mode) {
	if (mode === "system") return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
	return mode === "dark" ? "dark" : "light";
}
function applyThemeMode(mode) {
	const resolved = resolveThemeMode(mode);
	const doc = document.documentElement;
	doc.setAttribute("data-theme-mode", mode);
	doc.classList.add("disable-transitions");
	doc.classList.toggle("dark", resolved === "dark");
	doc.style.colorScheme = resolved;
	requestAnimationFrame(() => {
		doc.classList.remove("disable-transitions");
	});
	return resolved;
}
function subscribeToSystemTheme(onChange) {
	if (typeof window === "undefined") return () => void 0;
	const media = window.matchMedia?.("(prefers-color-scheme: dark)");
	if (!media) return () => void 0;
	const listener = (event) => {
		onChange(event.matches ? "dark" : "light");
	};
	media.addEventListener("change", listener);
	return () => {
		media.removeEventListener("change", listener);
	};
}
function applyFont(fontKey) {
	const font = fontRegistry[fontKey];
	const root = document.documentElement;
	root.setAttribute("data-font", fontKey);
	root.style.setProperty("--app-font-sans", fontCssFamily(font));
	root.style.setProperty("--app-font-variation-settings", "variationSettings" in font ? font.variationSettings : "normal");
}
function applyPreference(key, value) {
	if (key === "theme_mode") return applyThemeMode(value);
	if (key === "font") {
		applyFont(value);
		return;
	}
	document.documentElement.setAttribute(PREFERENCE_REGISTRY[key].attribute, value);
}
var setLocalStorageValue = () => {
	throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
async function persistByMode(mode, key, value) {
	switch (mode) {
		case "none": return;
		case "client-cookie":
			setClientCookie(key, value);
			return;
		case "server-cookie":
			await setValueToCookie(key, value);
			return;
		case "localStorage":
			setLocalStorageValue(key, value);
			return;
	}
}
function persistPreference(key, value) {
	return persistByMode(getPreferencePersistence(key), key, value);
}
var createPreferencesStore = (initialValues = {}) => {
	const values = {
		...PREFERENCE_DEFAULTS,
		...initialValues
	};
	return createStore()((set) => ({
		values,
		resolvedThemeMode: values.theme_mode === "dark" ? "dark" : "light",
		isSynced: false,
		setPreference: (key, value) => {
			const resolvedThemeMode = applyPreference(key, value);
			set((state) => ({
				values: {
					...state.values,
					[key]: value
				},
				...resolvedThemeMode ? { resolvedThemeMode } : {}
			}));
			persistPreference(key, value);
		},
		resetPreferences: () => {
			let resolvedThemeMode = "light";
			for (const key of PREFERENCE_KEYS) {
				const value = PREFERENCE_DEFAULTS[key];
				const resolved = applyPreference(key, value);
				if (resolved) resolvedThemeMode = resolved;
				persistPreference(key, value);
			}
			set({
				values: { ...PREFERENCE_DEFAULTS },
				resolvedThemeMode
			});
		}
	}));
};
var PreferencesStoreContext = (0, import_react.createContext)(null);
function readDomPreference(key) {
	const definition = PREFERENCE_REGISTRY[key];
	const rawValue = document.documentElement.getAttribute(definition.attribute);
	return parsePreference(key, rawValue);
}
function readDomPreferences() {
	const values = { ...PREFERENCE_DEFAULTS };
	function assignPreference(key) {
		values[key] = readDomPreference(key);
	}
	for (const key of PREFERENCE_KEYS) assignPreference(key);
	return values;
}
function PreferencesStoreProvider({ children, initialValues }) {
	const [store] = (0, import_react.useState)(() => createPreferencesStore(initialValues));
	(0, import_react.useEffect)(() => {
		store.setState({
			values: readDomPreferences(),
			resolvedThemeMode: document.documentElement.classList.contains("dark") ? "dark" : "light",
			isSynced: true
		});
	}, [store]);
	(0, import_react.useEffect)(() => {
		let unsubscribeMedia;
		const subscribeForMode = (mode) => {
			unsubscribeMedia?.();
			unsubscribeMedia = void 0;
			if (mode === "system") unsubscribeMedia = subscribeToSystemTheme(() => {
				store.setState({ resolvedThemeMode: applyThemeMode("system") });
			});
		};
		subscribeForMode(store.getState().values.theme_mode);
		const unsubscribeStore = store.subscribe((state, previousState) => {
			if (state.values.theme_mode !== previousState.values.theme_mode) subscribeForMode(state.values.theme_mode);
		});
		return () => {
			unsubscribeMedia?.();
			unsubscribeStore();
		};
	}, [store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesStoreContext.Provider, {
		value: store,
		children
	});
}
function usePreferencesStore(selector) {
	const store = (0, import_react.use)(PreferencesStoreContext);
	if (!store) throw new Error("Missing PreferencesStoreProvider");
	return useStore(store, selector);
}
var styles_default = "/assets/styles-jMCepMK_.css";
function FitraatMark({ className, title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: cn("size-4 shrink-0", className),
		"aria-hidden": title ? void 0 : true,
		focusable: "false",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title ?? APP_CONFIG.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				fillRule: "evenodd",
				d: "M12 1.6C7.05 7.45 5.1 11.7 5.1 15.2a6.9 6.9 0 1 0 13.8 0c0-3.5-1.95-7.75-6.9-13.6Zm0 8.55a4.95 4.95 0 1 0 0 9.9 4.95 4.95 0 0 0 0-9.9Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9.55 15.35 11.4 17.2l3.55-3.7",
				stroke: "currentColor",
				strokeWidth: "1.9",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function FitraatBrand({ className, markClassName, nameClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: cn("size-5", markClassName) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-semibold tracking-tight", nameClassName),
			children: APP_CONFIG.name
		})]
	});
}
function FitraatAppIcon({ className, markClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-10 items-center justify-center rounded-[22%] bg-background text-foreground shadow-sm ring-1 ring-foreground/10", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: cn("size-[68%]", markClassName) })
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col items-center justify-center space-y-2 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: "mb-2 size-8 text-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-semibold text-2xl",
				children: "Page not found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "The page you are looking for could not be found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				nativeButton: false,
				variant: "outline",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					replace: true
				}),
				children: "Go back home"
			})
		]
	});
}
function RootError({ error, reset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitraatMark, { className: "size-8 text-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-w-md flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-semibold text-2xl",
						children: "Something went wrong."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "An unexpected error occurred while loading this page. Try again or return home."
					}),
					null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					onClick: reset,
					children: "Try again"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					nativeButton: false,
					variant: "outline",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						replace: true
					}),
					children: "Go home"
				})]
			})
		]
	});
}
var Route$13 = createRootRouteWithContext()({
	loader: () => getInitialLocale(),
	component: RootLayout,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_CONFIG.meta.title },
			{
				name: "description",
				content: APP_CONFIG.meta.description
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: fontRegistry[PREFERENCE_DEFAULTS.font].stylesheet
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "32x32"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			}
		]
	}),
	errorComponent: RootErrorBoundary,
	notFoundComponent: NotFoundBoundary,
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	const { theme_mode, theme_preset, content_layout, navbar_style, sidebar_variant, sidebar_collapsible, font } = PREFERENCE_DEFAULTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-theme-mode": theme_mode,
		"data-theme-preset": theme_preset,
		"data-content-layout": content_layout,
		"data-navbar-style": navbar_style,
		"data-sidebar-variant": sidebar_variant,
		"data-sidebar-collapsible": sidebar_collapsible,
		"data-font": font,
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeBootScript, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleBootScript, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen antialiased",
			children: [
				children,
				null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function AppProviders({ children, locale }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesStoreProvider, {
		initialValues: PREFERENCE_DEFAULTS,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, {
			initialLocale: locale ?? "en",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})] })
		})
	}) });
}
function RootErrorBoundary(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootError, { ...props }) });
}
function NotFoundBoundary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {}) });
}
function RootLayout() {
	const locale = Route$13.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, {
		locale,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$11 = () => import("./route-4oA6WCmY.mjs");
var Route$12 = createFileRoute("/(external)")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./(external)-DmnfHJQB.mjs");
var Route$11 = createFileRoute("/(external)/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./route-BfVqt4s1.mjs");
var Route$10 = createFileRoute("/(main)/dashboard")({
	loader: () => getDashboardLayout(),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_creatorId-CDz8uSfx.mjs");
var Route$9 = createFileRoute("/(external)/creators/$creatorId")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./systems-3HEH6rY7.mjs");
var Route$8 = createFileRoute("/(external)/systems/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("../_templateId-PS0AMS4s.mjs");
var Route$7 = createFileRoute("/(external)/systems/$templateId")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var Route$6 = createFileRoute("/(main)/dashboard/")({ beforeLoad: () => {
	throw redirect({
		href: "/dashboard/systems",
		replace: true
	});
} });
var $$splitComponentImporter$5 = () => import("../_-CJSvIgLj.mjs");
var Route$5 = createFileRoute("/(main)/dashboard/$")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./route-DAiwC-Pb.mjs");
var Route$4 = createFileRoute("/(main)/dashboard/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var DEFAULT_POST_AUTH_PATH = "/dashboard/systems";
var CREATE_SYSTEM_PATH = "/dashboard/systems/new";
function isSafeAppRedirect(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) return false;
	return path.startsWith("/dashboard") || path.startsWith("/systems") || path.startsWith("/creators");
}
function parseAuthRedirectSearch(search) {
	return { redirect: typeof search.redirect === "string" && isSafeAppRedirect(search.redirect) ? search.redirect : void 0 };
}
function getPostAuthPath(search) {
	if (!search || typeof search !== "object") return DEFAULT_POST_AUTH_PATH;
	const redirect = "redirect" in search ? search.redirect : void 0;
	return typeof redirect === "string" && isSafeAppRedirect(redirect) ? redirect : DEFAULT_POST_AUTH_PATH;
}
var $$splitComponentImporter$3 = () => import("./route-LZZWbStq.mjs");
var Route$3 = createFileRoute("/(main)/auth/v1/login")({
	validateSearch: parseAuthRedirectSearch,
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./systems-4GNIyrHl.mjs");
var Route$2 = createFileRoute("/(main)/dashboard/systems/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_templateId-9ligeGri.mjs");
var Route$1 = createFileRoute("/(main)/dashboard/systems/$templateId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./route-CZSJuJzi.mjs");
var Route = createFileRoute("/(main)/dashboard/systems/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var externalRouteRoute = Route$12.update({
	id: "/(external)",
	getParentRoute: () => Route$13
});
var externalIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => externalRouteRoute
});
var mainDashboardRouteRoute = Route$10.update({
	id: "/(main)/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$13
});
var externalCreatorsCreatorIdRoute = Route$9.update({
	id: "/creators/$creatorId",
	path: "/creators/$creatorId",
	getParentRoute: () => externalRouteRoute
});
var externalSystemsIndexRoute = Route$8.update({
	id: "/systems/",
	path: "/systems/",
	getParentRoute: () => externalRouteRoute
});
var externalSystemsTemplateIdRoute = Route$7.update({
	id: "/systems/$templateId",
	path: "/systems/$templateId",
	getParentRoute: () => externalRouteRoute
});
var mainDashboardIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => mainDashboardRouteRoute
});
var mainDashboardSplatRoute = Route$5.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => mainDashboardRouteRoute
});
var mainDashboardProfileRouteRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => mainDashboardRouteRoute
});
var mainAuthV1LoginRouteRoute = Route$3.update({
	id: "/(main)/auth/v1/login",
	path: "/auth/v1/login",
	getParentRoute: () => Route$13
});
var mainDashboardSystemsIndexRoute = Route$2.update({
	id: "/systems/",
	path: "/systems/",
	getParentRoute: () => mainDashboardRouteRoute
});
var mainDashboardSystemsTemplateIdRoute = Route$1.update({
	id: "/systems/$templateId",
	path: "/systems/$templateId",
	getParentRoute: () => mainDashboardRouteRoute
});
var mainDashboardSystemsNewRouteRoute = Route.update({
	id: "/systems/new",
	path: "/systems/new",
	getParentRoute: () => mainDashboardRouteRoute
});
var externalRouteRouteChildren = {
	externalIndexRoute,
	externalCreatorsCreatorIdRoute,
	externalSystemsTemplateIdRoute,
	externalSystemsIndexRoute
};
var externalRouteRouteWithChildren = externalRouteRoute._addFileChildren(externalRouteRouteChildren);
var mainDashboardRouteRouteChildren = {
	mainDashboardProfileRouteRoute,
	mainDashboardSplatRoute,
	mainDashboardIndexRoute,
	mainDashboardSystemsNewRouteRoute,
	mainDashboardSystemsTemplateIdRoute,
	mainDashboardSystemsIndexRoute
};
var rootRouteChildren = {
	externalRouteRoute: externalRouteRouteWithChildren,
	mainDashboardRouteRoute: mainDashboardRouteRoute._addFileChildren(mainDashboardRouteRouteChildren),
	mainAuthV1LoginRouteRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = createQueryClient();
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: false,
		context: { queryClient }
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
}
//#endregion
export { cn as C, useI18n as E, Button$1 as S, translate as T, TooltipTrigger as _, Route$7 as a, getFunctionsErrorMessage as b, FitraatAppIcon as c, usePreferencesStore as d, useAuth as f, TooltipContent as g, Tooltip$1 as h, getPostAuthPath as i, FitraatBrand as l, APP_LINKS as m, Route$1 as n, Route$9 as o, APP_CONFIG as p, CREATE_SYSTEM_PATH as r, Route$10 as s, router_exports as t, FitraatMark as u, toast as v, getInitials as w, toFunctionsApiError as x, FunctionsApiError as y };
