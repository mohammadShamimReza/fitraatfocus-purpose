//#region node_modules/.nitro/vite/services/ssr/assets/options-Cl7-Lkhi.js
var EXPERTISE_ITEMS = [
	{
		value: "exam",
		label: "Exam prep"
	},
	{
		value: "career",
		label: "Career"
	},
	{
		value: "study",
		label: "Study systems"
	},
	{
		value: "craft",
		label: "Craft"
	},
	{
		value: "health",
		label: "Health"
	},
	{
		value: "teaching",
		label: "Teaching"
	},
	{
		value: "coaching",
		label: "Coaching"
	},
	{
		value: "research",
		label: "Research"
	}
];
function getExpertiseLabel(value) {
	return EXPERTISE_ITEMS.find((item) => item.value === value)?.label ?? value;
}
var TEMPLATE_CATEGORY_ITEMS = [
	{
		value: "exam",
		label: "Exam"
	},
	{
		value: "career",
		label: "Career"
	},
	{
		value: "study",
		label: "Study"
	},
	{
		value: "craft",
		label: "Craft"
	},
	{
		value: "health",
		label: "Health"
	},
	{
		value: "other",
		label: "Other"
	}
];
var TASK_PRIORITY_ITEMS = [
	{
		value: "low",
		label: "Low"
	},
	{
		value: "medium",
		label: "Medium"
	},
	{
		value: "high",
		label: "High"
	}
];
function getCategoryLabel(value) {
	return TEMPLATE_CATEGORY_ITEMS.find((item) => item.value === value)?.label ?? value;
}
//#endregion
export { getExpertiseLabel as a, getCategoryLabel as i, TASK_PRIORITY_ITEMS as n, TEMPLATE_CATEGORY_ITEMS as r, EXPERTISE_ITEMS as t };
