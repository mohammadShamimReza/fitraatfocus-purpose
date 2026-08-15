import { n as TASK_PRIORITY_ITEMS, r as TEMPLATE_CATEGORY_ITEMS, t as EXPERTISE_ITEMS } from "./options-Cl7-Lkhi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/labels-Bo_NEvdS.js
function categoryLabel(t, value) {
	switch (value) {
		case "exam": return t("category.exam");
		case "career": return t("category.career");
		case "study": return t("category.study");
		case "craft": return t("category.craft");
		case "health": return t("category.health");
		case "other": return t("category.other");
		default: return value;
	}
}
function priorityLabel(t, value) {
	switch (value) {
		case "low": return t("priority.low");
		case "medium": return t("priority.medium");
		case "high": return t("priority.high");
		default: return value;
	}
}
function expertiseLabel(t, value) {
	switch (value) {
		case "exam": return t("expertise.exam");
		case "career": return t("expertise.career");
		case "study": return t("expertise.study");
		case "craft": return t("expertise.craft");
		case "health": return t("expertise.health");
		case "teaching": return t("expertise.teaching");
		case "coaching": return t("expertise.coaching");
		case "research": return t("expertise.research");
		default: return value;
	}
}
function statusLabel(t, value) {
	if (value === "published") return t("status.published");
	if (value === "draft") return t("status.draft");
	return value;
}
function visibilityLabel(t, value) {
	if (value === "public") return t("visibility.public");
	return t("visibility.private");
}
function visibilitySelectItems(t) {
	return [{
		value: "private",
		label: visibilityLabel(t, "private")
	}, {
		value: "public",
		label: visibilityLabel(t, "public")
	}];
}
function navItemTitle(t, id, fallback) {
	switch (id) {
		case "systems": return t("nav.systems");
		case "new-system": return t("nav.newSystem");
		case "profile": return t("nav.profile");
		default: return fallback;
	}
}
function categorySelectItems(t) {
	return TEMPLATE_CATEGORY_ITEMS.map((item) => ({
		value: item.value,
		label: categoryLabel(t, item.value)
	}));
}
function prioritySelectItems(t) {
	return TASK_PRIORITY_ITEMS.map((item) => ({
		value: item.value,
		label: priorityLabel(t, item.value)
	}));
}
function expertiseItems(t) {
	return EXPERTISE_ITEMS.map((item) => ({
		value: item.value,
		label: expertiseLabel(t, item.value)
	}));
}
//#endregion
export { priorityLabel as a, visibilityLabel as c, navItemTitle as i, visibilitySelectItems as l, categorySelectItems as n, prioritySelectItems as o, expertiseItems as r, statusLabel as s, categoryLabel as t };
