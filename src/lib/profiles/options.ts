export const EXPERTISE_ITEMS = [
  { value: "exam", label: "Exam prep" },
  { value: "career", label: "Career" },
  { value: "study", label: "Study" },
  { value: "craft", label: "Craft" },
  { value: "health", label: "Health" },
  { value: "teaching", label: "Teaching" },
  { value: "coaching", label: "Coaching" },
  { value: "research", label: "Research" },
] as const;

export function getExpertiseLabel(value: string): string {
  return EXPERTISE_ITEMS.find((item) => item.value === value)?.label ?? value;
}
