import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categorySelectItems, statusLabel } from "@/lib/i18n/labels";

export function TemplateFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status?: string;
  onStatusChange?: (value: string) => void;
}) {
  const { t } = useI18n();
  const categoryItems = [
    { value: "all", label: t("search.categoryAll") },
    ...categorySelectItems(t),
  ];
  const statusItems = onStatusChange
    ? [
        { value: "all", label: t("search.statusAll") },
        { value: "published", label: statusLabel(t, "published") },
        { value: "draft", label: statusLabel(t, "draft") },
      ]
    : [];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="template-search">
        {t("search.label")}
      </label>
      <Input
        id="template-search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t("search.titlePlaceholder")}
        className="h-9 sm:max-w-xs"
      />
      <Select
        value={category}
        onValueChange={(value) => {
          if (typeof value === "string") onCategoryChange(value);
        }}
        items={categoryItems}
      >
        <SelectTrigger className="w-full sm:w-44" aria-label={t("search.category")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {onStatusChange ? (
        <Select
          value={status ?? "all"}
          onValueChange={(value) => {
            if (typeof value === "string") onStatusChange(value);
          }}
          items={statusItems}
        >
          <SelectTrigger className="w-full sm:w-40" aria-label={t("search.statusAll")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}
