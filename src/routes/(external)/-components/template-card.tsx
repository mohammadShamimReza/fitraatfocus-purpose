import { Link } from "@tanstack/react-router";

import { Download, Layers } from "lucide-react";

import { SystemCover } from "@/components/system-cover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, expertiseLabel } from "@/lib/i18n/labels";
import { formatCount } from "@/lib/templates/format";
import { getInitials } from "@/lib/utils";
import type { CatalogTemplate } from "@/types/template";

export function TemplateCard({ template }: { template: CatalogTemplate }) {
  const { t } = useI18n();
  const expertise = template.creator.expertise.slice(0, 2);

  return (
    <Card className="h-full overflow-hidden shadow-none transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-sm">
      <SystemCover src={template.imageUrl} alt="" className="rounded-t-xl" />
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
            <Download className="size-3" />
            {formatCount(template.downloadCount)}
          </span>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg">
            <Link
              to="/systems/$templateId"
              params={{ templateId: template.id }}
              className="rounded-sm outline-none transition-colors hover:underline group-hover/card:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {template.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{template.purpose}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 text-muted-foreground text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" />
            {t("systems.libraryMeta", { sections: template.sectionCount, tasks: template.taskCount })}
          </span>
        </div>
        <Link
          to="/creators/$creatorId"
          params={{ creatorId: template.creator.uid }}
          className="flex items-center gap-2 rounded-lg outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-muted font-medium text-[10px]">
            {getInitials(template.creator.displayName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium text-foreground text-sm">{template.creator.displayName}</span>
            <span className="block truncate text-muted-foreground text-xs">
              {template.creator.headline ||
                expertise.map((item) => expertiseLabel(t, item)).join(" · ") ||
                t("common.creator")}
            </span>
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
