import { Ct as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { E as useI18n } from "./router-DTVZZ-r0.mjs";
import { n as categorySelectItems, s as statusLabel } from "./labels-Bo_NEvdS.mjs";
import { t as Input$1 } from "./input-COujH7Qi.mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./select-BvtYNnZ7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/filter-Dn6jVz9F.js
var import_jsx_runtime = require_jsx_runtime();
function TemplateFilters({ query, onQueryChange, category, onCategoryChange, status, onStatusChange }) {
	const { t } = useI18n();
	const categoryItems = [{
		value: "all",
		label: t("search.categoryAll")
	}, ...categorySelectItems(t)];
	const statusItems = onStatusChange ? [
		{
			value: "all",
			label: t("search.statusAll")
		},
		{
			value: "published",
			label: statusLabel(t, "published")
		},
		{
			value: "draft",
			label: statusLabel(t, "draft")
		}
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 sm:flex-row sm:items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "template-search",
				children: t("search.label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				id: "template-search",
				value: query,
				onChange: (event) => onQueryChange(event.target.value),
				placeholder: t("search.titlePlaceholder"),
				className: "h-9 sm:max-w-xs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
				value: category,
				onValueChange: (value) => {
					if (typeof value === "string") onCategoryChange(value);
				},
				items: categoryItems,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full sm:w-44",
					"aria-label": t("search.category"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: categoryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: item.value,
					children: item.label
				}, item.value)) }) })]
			}),
			onStatusChange ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
				value: status ?? "all",
				onValueChange: (value) => {
					if (typeof value === "string") onStatusChange(value);
				},
				items: statusItems,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full sm:w-40",
					"aria-label": t("search.statusAll"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: statusItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: item.value,
					children: item.label
				}, item.value)) }) })]
			}) : null
		]
	});
}
function matchesTemplateSearch(item, query, category, status = "all") {
	const needle = query.trim().toLowerCase();
	const title = (item.title ?? "").toLowerCase();
	const titleOk = needle.length === 0 || title.includes(needle);
	const categoryOk = category === "all" || item.category === category;
	const statusOk = status === "all" || item.status === status;
	return titleOk && categoryOk && statusOk;
}
//#endregion
export { matchesTemplateSearch as n, TemplateFilters as t };
