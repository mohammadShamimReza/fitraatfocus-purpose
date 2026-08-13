import { EXPERTISE_ITEMS } from "@/lib/profiles/options";
import { TASK_PRIORITY_ITEMS, TEMPLATE_CATEGORY_ITEMS } from "@/lib/templates/options";

import type { TranslateFn } from "./translate";

export function categoryLabel(t: TranslateFn, value: string): string {
  switch (value) {
    case "exam":
      return t("category.exam");
    case "career":
      return t("category.career");
    case "study":
      return t("category.study");
    case "craft":
      return t("category.craft");
    case "health":
      return t("category.health");
    case "other":
      return t("category.other");
    default:
      return value;
  }
}

export function priorityLabel(t: TranslateFn, value: string): string {
  switch (value) {
    case "low":
      return t("priority.low");
    case "medium":
      return t("priority.medium");
    case "high":
      return t("priority.high");
    default:
      return value;
  }
}

export function expertiseLabel(t: TranslateFn, value: string): string {
  switch (value) {
    case "exam":
      return t("expertise.exam");
    case "career":
      return t("expertise.career");
    case "study":
      return t("expertise.study");
    case "craft":
      return t("expertise.craft");
    case "health":
      return t("expertise.health");
    case "teaching":
      return t("expertise.teaching");
    case "coaching":
      return t("expertise.coaching");
    case "research":
      return t("expertise.research");
    default:
      return value;
  }
}

export function statusLabel(t: TranslateFn, value: string): string {
  if (value === "published") {
    return t("status.published");
  }

  if (value === "draft") {
    return t("status.draft");
  }

  return value;
}

export function navItemTitle(t: TranslateFn, id: string, fallback: string): string {
  switch (id) {
    case "systems":
      return t("nav.systems");
    case "new-system":
      return t("nav.newSystem");
    case "profile":
      return t("nav.profile");
    default:
      return fallback;
  }
}

export function categorySelectItems(t: TranslateFn) {
  return TEMPLATE_CATEGORY_ITEMS.map((item) => ({
    value: item.value,
    label: categoryLabel(t, item.value),
  }));
}

export function prioritySelectItems(t: TranslateFn) {
  return TASK_PRIORITY_ITEMS.map((item) => ({
    value: item.value,
    label: priorityLabel(t, item.value),
  }));
}

export function expertiseItems(t: TranslateFn) {
  return EXPERTISE_ITEMS.map((item) => ({
    value: item.value,
    label: expertiseLabel(t, item.value),
  }));
}
