export const TEMPLATE_CATEGORY_ITEMS = [
  { value: "exam", label: "Exam" },
  { value: "career", label: "Career" },
  { value: "study", label: "Study" },
  { value: "craft", label: "Craft" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
] as const;

export const TASK_PRIORITY_ITEMS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export function getCategoryLabel(value: string): string {
  return TEMPLATE_CATEGORY_ITEMS.find((item) => item.value === value)?.label ?? value;
}

export function getPriorityLabel(value: string): string {
  return TASK_PRIORITY_ITEMS.find((item) => item.value === value)?.label ?? value;
}
