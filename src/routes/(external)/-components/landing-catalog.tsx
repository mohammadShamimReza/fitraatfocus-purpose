import { CircleAlert, ListTodo } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { usePublicTemplatesQuery } from "@/query/templates";

import { TemplateCard } from "./template-card";

export function LandingCatalog() {
  const { t } = useI18n();
  const query = usePublicTemplatesQuery(true);

  return (
    <section id="systems" className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-6 px-4 pb-8 sm:px-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl tracking-tight">{t("landing.catalog.title")}</h2>
        <p className="max-w-xl text-muted-foreground text-sm">{t("landing.catalog.body")}</p>
      </div>

      {query.isPending ? (
        <div className="flex min-h-64 items-center justify-center">
          <Spinner className="size-6" />
          <span className="sr-only">{t("landing.catalog.loading")}</span>
        </div>
      ) : null}

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
            <EmptyMedia variant="icon">
              <ListTodo />
            </EmptyMedia>
            <EmptyTitle>{t("landing.catalog.emptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("landing.catalog.emptyBody")}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      {query.isSuccess && query.data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {query.data.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
