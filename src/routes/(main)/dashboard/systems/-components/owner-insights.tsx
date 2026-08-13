import { Download, Layers, ListTodo, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCount, formatUpdatedAt } from "@/lib/templates/format";
import type { PurposeTemplateDetail } from "@/types/template";

export function OwnerInsights({ template }: { template: PurposeTemplateDetail }) {
  const { t, locale } = useI18n();
  const uniquePeople = template.downloaderUids.length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <InsightCard
        icon={Download}
        label={t("insights.downloads")}
        value={formatCount(template.downloadCount, locale)}
        hint={t("insights.downloadsHint")}
      />
      <InsightCard
        icon={Users}
        label={t("insights.unique")}
        value={formatCount(uniquePeople, locale)}
        hint={t("insights.uniqueHint")}
      />
      <InsightCard
        icon={Layers}
        label={t("insights.library")}
        value={t("insights.libraryValue", { sections: template.sectionCount, tasks: template.taskCount })}
        hint={t("insights.libraryHint")}
      />
      <InsightCard
        icon={ListTodo}
        label={t("insights.updated")}
        value={formatUpdatedAt(template.updatedAt, locale)}
        hint={template.status === "published" ? t("insights.live") : t("insights.draft")}
      />
    </div>
  );
}

function InsightCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Download;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="font-medium text-muted-foreground text-xs">{label}</CardTitle>
        <Icon className="size-3.5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="font-medium text-lg tracking-tight">{value}</p>
        <p className="text-muted-foreground text-xs">{hint}</p>
      </CardContent>
    </Card>
  );
}
