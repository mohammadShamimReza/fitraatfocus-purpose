import { useEffect, useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import { ArrowLeft, CircleAlert } from "lucide-react";

import { EditorSkeleton } from "@/components/page-skeletons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, statusLabel, visibilityLabel } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { usePublishTemplateMutation, useTemplateQuery } from "@/query/templates";
import type { TemplateStatus } from "@/types/template";

import { DeleteSystemButton } from "./delete-system-button";
import { EditorMetadataForm } from "./editor-metadata-form";
import { EditorOverview } from "./editor-overview";
import { EditorSections } from "./editor-sections";
import { EditorTasks } from "./editor-tasks";

function getPublishLabel(status: TemplateStatus, isPending: boolean, t: TranslateFn): string {
  if (status === "published") {
    return t("editor.published");
  }

  if (isPending) {
    return t("editor.publishing");
  }

  return t("editor.publish");
}

export function SystemEditor({ templateId }: { templateId: string }) {
  const { user, isReady } = useAuth();
  const { t } = useI18n();
  const query = useTemplateQuery(templateId, isReady);
  const publish = usePublishTemplateMutation(templateId);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const sections = useMemo(() => {
    return [...(query.data?.sections ?? [])].sort((left, right) => left.order - right.order);
  }, [query.data?.sections]);

  const tasks = useMemo(() => {
    return [...(query.data?.tasks ?? [])].sort((left, right) => left.order - right.order);
  }, [query.data?.tasks]);

  useEffect(() => {
    if (sections.length === 0) {
      setSelectedSectionId(null);
      return;
    }

    setSelectedSectionId((current) => {
      if (current && sections.some((section) => section.id === current)) {
        return current;
      }

      return sections[0]?.id ?? null;
    });
  }, [sections]);

  const onPublish = async () => {
    try {
      const next = await publish.mutateAsync();
      toast.add({
        title: t("editor.published"),
        description: next.visibility === "public" ? t("editor.publishedToast") : t("editor.publishedPrivateToast"),
      });
    } catch (error) {
      toast.add({
        title: t("editor.publishError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const backLink = (
    <Button
      nativeButton={false}
      variant="ghost"
      size="sm"
      className="-ml-2 w-fit"
      render={<Link to="/dashboard/systems" />}
    >
      <ArrowLeft data-icon="inline-start" />
      {t("systems.title")}
    </Button>
  );

  if (query.isPending) {
    return (
      <div className="flex flex-col gap-5">
        {backLink}
        <EditorSkeleton label={t("editor.loading")} />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex flex-col gap-5">
        {backLink}
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("editor.loadError")}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>{query.error ? getFunctionsErrorMessage(query.error) : t("editor.notFound")}</p>
            <Button variant="outline" size="sm" className="w-fit" onClick={() => void query.refetch()}>
              {t("common.tryAgain")}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const template = query.data;
  const canEdit = Boolean(user && user.uid === template.creatorUid);
  const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;
  const sectionTasks = selectedSection ? tasks.filter((task) => task.sectionId === selectedSection.id) : [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Button
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="-ml-2 w-fit"
          render={<Link to="/dashboard/systems" />}
        >
          <ArrowLeft data-icon="inline-start" />
          {t("systems.title")}
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
              <Badge variant={template.status === "published" ? "default" : "secondary"}>
                {statusLabel(t, template.status)}
              </Badge>
              <Badge variant="outline">{visibilityLabel(t, template.visibility)}</Badge>
            </div>
            <h1 className="text-2xl tracking-tight sm:text-3xl">{template.title || t("systems.untitled")}</h1>
            {template.creatorName ? (
              <p className="text-muted-foreground text-sm">
                {t("common.byPrefix")}{" "}
                <Link
                  to="/creators/$creatorId"
                  params={{ creatorId: template.creatorUid }}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {template.creatorName}
                </Link>
              </p>
            ) : null}
          </div>
          {canEdit ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <DeleteSystemButton
                templateId={template.id}
                title={template.title}
                storagePath={template.storagePath}
              />
              <Button
                disabled={template.status === "published" || publish.isPending}
                onClick={() => {
                  void onPublish();
                }}
              >
                {getPublishLabel(template.status, publish.isPending, t)}
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <Tabs defaultValue="library" className="gap-5">
        <TabsList variant="line" className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="library" className="rounded-none px-4 py-2.5">
            {t("editor.library")}
          </TabsTrigger>
          <TabsTrigger value="details" className="rounded-none px-4 py-2.5">
            {t("editor.details")}
          </TabsTrigger>
          <TabsTrigger value="overview" className="rounded-none px-4 py-2.5">
            {t("editor.overview")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="library" className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">{t("editor.libraryLead")}</p>
          <div className="grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
            <EditorSections
              templateId={templateId}
              sections={sections}
              tasks={tasks}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
              canEdit={canEdit}
            />
            <EditorTasks
              templateId={templateId}
              section={selectedSection}
              sections={sections}
              tasks={sectionTasks}
              canEdit={canEdit}
              onSelectSection={setSelectedSectionId}
            />
          </div>
        </TabsContent>
        <TabsContent value="details">
          <EditorMetadataForm template={template} canEdit={canEdit} />
        </TabsContent>
        <TabsContent value="overview">
          <EditorOverview template={template} canEdit={canEdit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
