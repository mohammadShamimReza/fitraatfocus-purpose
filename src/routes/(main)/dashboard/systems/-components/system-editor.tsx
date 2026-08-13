import { useEffect, useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import { ArrowLeft, CircleAlert, Layers, ListTodo } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/lib/auth/auth-provider";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, statusLabel } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { usePublishTemplateMutation, useTemplateQuery } from "@/query/templates";
import type { TemplateStatus } from "@/types/template";

import { EditorMetadataForm } from "./editor-metadata-form";
import { EditorSections } from "./editor-sections";
import { EditorTasks } from "./editor-tasks";
import { LocalOnlyNote } from "./local-only-note";
import { OwnerInsights } from "./owner-insights";

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
      await publish.mutateAsync();
      toast.add({
        title: t("editor.published"),
        description: t("editor.publishedToast"),
      });
    } catch (error) {
      toast.add({
        title: t("editor.publishError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  if (query.isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">{t("editor.loading")}</span>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>{t("editor.loadError")}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p>{query.error ? getFunctionsErrorMessage(query.error) : t("editor.notFound")}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
              {t("common.tryAgain")}
            </Button>
            <Button nativeButton={false} variant="ghost" size="sm" render={<Link to="/dashboard/systems" />}>
              {t("editor.back")}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  const template = query.data;
  const canEdit = Boolean(user && user.uid === template.creatorUid);
  const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;
  const sectionTasks = selectedSection ? tasks.filter((task) => task.sectionId === selectedSection.id) : [];

  return (
    <div className="flex flex-col gap-6">
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
              <Badge variant={template.status === "published" ? "default" : "secondary"}>
                {statusLabel(t, template.status)}
              </Badge>
            </div>
            <h1 className="text-3xl tracking-tight">{template.title || t("systems.untitled")}</h1>
            <p className="max-w-2xl text-muted-foreground text-sm">
              {template.purpose || (canEdit ? t("editor.addPurpose") : t("systems.noPurpose"))}
            </p>
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
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="size-3.5" />
                {t("systems.sectionsCount", { count: template.sectionCount })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ListTodo className="size-3.5" />
                {t("systems.tasksCount", { count: template.taskCount })}
              </span>
              <LocalOnlyNote />
            </div>
          </div>
          {canEdit ? (
            <Button
              disabled={template.status === "published" || publish.isPending}
              onClick={() => {
                void onPublish();
              }}
            >
              {getPublishLabel(template.status, publish.isPending, t)}
            </Button>
          ) : null}
        </div>
      </div>

      {canEdit ? <OwnerInsights template={template} /> : null}

      <Tabs defaultValue="library" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="library">{t("editor.library")}</TabsTrigger>
          <TabsTrigger value="details">{t("editor.details")}</TabsTrigger>
        </TabsList>
        <TabsContent value="library" className="flex flex-col gap-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
            <EditorSections
              templateId={templateId}
              sections={sections}
              tasks={tasks}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
              canEdit={canEdit}
            />
            <EditorTasks templateId={templateId} section={selectedSection} tasks={sectionTasks} canEdit={canEdit} />
          </div>
        </TabsContent>
        <TabsContent value="details">
          <EditorMetadataForm template={template} canEdit={canEdit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
