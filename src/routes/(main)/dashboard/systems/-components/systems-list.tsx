import { useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import { CircleAlert, Download, Layers, Plus } from "lucide-react";

import { StudioGif } from "@/components/studio-gif";
import { SystemCover } from "@/components/system-cover";
import { TemplateFilters } from "@/components/template-filters";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, statusLabel, visibilityLabel } from "@/lib/i18n/labels";
import { matchesTemplateSearch } from "@/lib/templates/filter";
import { formatCount, formatUpdatedAt } from "@/lib/templates/format";
import { useMyTemplatesQuery } from "@/query/templates";
import type { PurposeTemplate } from "@/types/template";

export function SystemsList() {
  const { user, isReady } = useAuth();
  const { t, locale } = useI18n();
  const query = useMyTemplatesQuery(isReady && Boolean(user));
  const [titleQuery, setTitleQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const drafts = query.data?.filter((item) => item.status === "draft").length ?? 0;
  const published = query.data?.filter((item) => item.status === "published").length ?? 0;
  const downloads = query.data?.reduce((sum, item) => sum + item.downloadCount, 0) ?? 0;
  const filtered = useMemo(
    () => (query.data ?? []).filter((item) => matchesTemplateSearch(item, titleQuery, category, status)),
    [query.data, titleQuery, category, status],
  );

  return (
    <div className="@container/main flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl tracking-tight">{t("systems.title")}</h1>
          <p className="max-w-xl text-muted-foreground text-sm">{t("systems.lead")}</p>
        </div>
        <Button nativeButton={false} render={<Link to="/dashboard/systems/new" />}>
          <Plus data-icon="inline-start" />
          {t("nav.newSystem")}
        </Button>
      </div>

      {query.isPending ? (
        <div className="flex min-h-72 items-center justify-center">
          <Spinner className="size-6" />
          <span className="sr-only">{t("systems.loading")}</span>
        </div>
      ) : null}

      {query.isError ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("systems.loadError")}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>{getFunctionsErrorMessage(query.error)}</p>
            <Button variant="outline" size="sm" className="w-fit" onClick={() => void query.refetch()}>
              {t("common.tryAgain")}
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      {query.isSuccess && query.data.length === 0 ? (
        <Empty className="min-h-80 border border-dashed">
          <EmptyHeader>
            <EmptyMedia>
              <StudioGif id="purpose-library" alt={t("gif.library")} size={140} />
            </EmptyMedia>
            <EmptyTitle>{t("systems.emptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("systems.emptyBody")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button nativeButton={false} render={<Link to="/dashboard/systems/new" />}>
              {t("systems.create")}
            </Button>
          </EmptyContent>
        </Empty>
      ) : null}

      {query.isSuccess && query.data.length > 0 ? (
        <div className="flex flex-col gap-4">
          <TemplateFilters
            query={titleQuery}
            onQueryChange={setTitleQuery}
            category={category}
            onCategoryChange={setCategory}
            status={status}
            onStatusChange={setStatus}
          />
          <div className="flex flex-wrap gap-2 text-muted-foreground text-xs">
            <span>
              {t(filtered.length === 1 ? "systems.countOne" : "systems.countMany", {
                count: filtered.length,
              })}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.publishedCount", { count: published })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.draftCount", { count: drafts })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.downloadCount", { count: formatCount(downloads, locale) })}</span>
          </div>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("search.empty")}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((template) => (
                <SystemCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SystemCard({ template }: { template: PurposeTemplate }) {
  const { t, locale } = useI18n();

  return (
    <Link
      to="/dashboard/systems/$templateId"
      params={{ templateId: template.id }}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full overflow-hidden transition-colors group-hover:bg-muted/40">
        <SystemCover src={template.imageUrl} alt="" className="rounded-t-xl" />
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
            <div className="flex flex-wrap items-center justify-end gap-1">
              <Badge variant={template.status === "published" ? "default" : "secondary"}>
                {statusLabel(t, template.status)}
              </Badge>
              <Badge variant="outline">{visibilityLabel(t, template.visibility)}</Badge>
            </div>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="line-clamp-2 text-lg">{template.title || t("systems.untitled")}</CardTitle>
            <CardDescription className="line-clamp-2">{template.purpose || t("systems.noPurpose")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3 text-muted-foreground text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" />
            {t("systems.libraryMeta", { sections: template.sectionCount, tasks: template.taskCount })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="size-3" />
            {formatCount(template.downloadCount, locale)}
          </span>
          <span>{formatUpdatedAt(template.updatedAt, locale)}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
