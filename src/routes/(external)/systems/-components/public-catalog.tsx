import { useMemo, useState } from "react";

import { CircleAlert } from "lucide-react";

import { CatalogGridSkeleton } from "@/components/page-skeletons";
import { StudioGif } from "@/components/studio-gif";
import { TemplateFilters } from "@/components/template-filters";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { matchesTemplateSearch } from "@/lib/templates/filter";
import { usePublicTemplatesQuery } from "@/query/templates";

import { PublicBreadcrumbs } from "../../-components/public-breadcrumbs";
import { TemplateCard } from "../../-components/template-card";
import { UseInAppNote } from "../../-components/use-in-app-note";

export function PublicCatalog() {
  const { t } = useI18n();
  const query = usePublicTemplatesQuery(true);
  const [titleQuery, setTitleQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = useMemo(
    () => (query.data ?? []).filter((item) => matchesTemplateSearch(item, titleQuery, category)),
    [query.data, titleQuery, category],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl space-y-3">
        <PublicBreadcrumbs page="catalog" />
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
          {t("landing.catalog.kicker")}
        </p>
        <h1 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.catalog.title")}</h1>
        <p className="max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          {t("landing.catalog.body")}
        </p>
        <UseInAppNote />
      </div>

      {query.isError ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("landing.catalog.error")}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>{getFunctionsErrorMessage(query.error)}</p>
            <Button variant="outline" size="sm" className="w-fit" onClick={() => void query.refetch()}>
              {t("common.tryAgain")}
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      {query.isSuccess && query.data.length === 0 ? (
        <Empty className="min-h-64 border border-dashed">
          <EmptyHeader>
            <EmptyMedia>
              <StudioGif id="purpose-library" alt={t("gif.library")} size={140} />
            </EmptyMedia>
            <EmptyTitle>{t("landing.catalog.emptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("landing.catalog.emptyBody")}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      {query.isPending || (query.isSuccess && query.data.length > 0) ? (
        <div className="flex flex-col gap-6">
          <TemplateFilters
            query={titleQuery}
            onQueryChange={setTitleQuery}
            category={category}
            onCategoryChange={setCategory}
          />
          {query.isPending ? <CatalogGridSkeleton label={t("landing.catalog.loading")} /> : null}
          {!query.isPending && filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("search.empty")}</p>
          ) : null}
          {!query.isPending && filtered.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
