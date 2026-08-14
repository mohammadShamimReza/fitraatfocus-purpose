export function matchesTemplateSearch(
  item: { title?: string; category?: string; status?: string },
  query: string,
  category: string,
  status = "all",
): boolean {
  const needle = query.trim().toLowerCase();
  const title = (item.title ?? "").toLowerCase();
  const titleOk = needle.length === 0 || title.includes(needle);
  const categoryOk = category === "all" || item.category === category;
  const statusOk = status === "all" || item.status === status;
  return titleOk && categoryOk && statusOk;
}
