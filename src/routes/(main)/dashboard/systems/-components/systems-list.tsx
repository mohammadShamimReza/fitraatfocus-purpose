import { Link } from "@tanstack/react-router";

import { CircleAlert, Download, Layers, ListTodo, Plus } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/auth/auth-provider";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, statusLabel } from "@/lib/i18n/labels";
import { formatCount, formatUpdatedAt } from "@/lib/templates/format";
import { useMyTemplatesQuery } from "@/query/templates";
import type { PurposeTemplate } from "@/types/template";

export function SystemsList() {
  const { user, isReady } = useAuth();
  const { t, locale } = useI18n();
  const query = useMyTemplatesQuery(isReady && Boolean(user));
  const drafts = query.data?.filter((item) => item.status === "draft").length ?? 0;
  const published = query.data?.filter((item) => item.status === "published").length ?? 0;
  const downloads = query.data?.reduce((sum, item) => sum + item.downloadCount, 0) ?? 0;

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
            <EmptyMedia variant="icon">
              <ListTodo />
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
          <div className="flex flex-wrap gap-2 text-muted-foreground text-xs">
            <span>
              {t(query.data.length === 1 ? "systems.countOne" : "systems.countMany", { count: query.data.length })}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.publishedCount", { count: published })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.draftCount", { count: drafts })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("systems.downloadCount", { count: formatCount(downloads, locale) })}</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {query.data.map((template) => (
              <SystemCard key={template.id} template={template} />
            ))}
          </div>
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
      <Card className="h-full transition-colors group-hover:bg-muted/40">
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
            <Badge variant={template.status === "published" ? "default" : "secondary"}>
              {statusLabel(t, template.status)}
            </Badge>
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
