import { formatDistanceToNow } from "date-fns";

export function formatUpdatedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return formatDistanceToNow(date, { addSuffix: true });
}
