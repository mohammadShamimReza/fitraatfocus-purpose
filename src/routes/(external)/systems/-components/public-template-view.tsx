import { useEffect, useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Download,
  Layers,
  ListTodo,
  Star,
} from "lucide-react";

import { TemplatePageSkeleton } from "@/components/page-skeletons";
import { SystemCover } from "@/components/system-cover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { APP_LINKS } from "@/config/app-config";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, expertiseLabel } from "@/lib/i18n/labels";
import { formatCount, formatUpdatedAt } from "@/lib/templates/format";
import { getInitials } from "@/lib/utils";
import { useDownloadTemplateMutation, usePublicTemplateQuery } from "@/query/templates";
import { EditorSections } from "@/routes/(main)/dashboard/systems/-components/editor-sections";
import { EditorTasks } from "@/routes/(main)/dashboard/systems/-components/editor-tasks";

import { TemplateShareActions } from "../../-components/template-share-actions";
import { UseInAppNote } from "../../-components/use-in-app-note";

export function PublicTemplateView({ templateId }: { templateId: string }) {
  const { t } = useI18n();
  const { user, isReady } = useAuth();
  const query = usePublicTemplateQuery(templateId, true);
  const download = useDownloadTemplateMutation(templateId);
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

  const onDownload = async () => {
    try {
      await download.mutateAsync();
      toast.add({
        title: t("template.copied"),
        description: t("template.copiedBody"),
      });
    } catch (error) {
      toast.add({
        title: t("template.copyError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  if (query.isPending) {
    return (
      <div className="flex flex-col gap-8">
        <Button nativeButton={false} variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link to="/systems" />}>
          <ArrowLeft data-icon="inline-start" />
          {t("catalog.back")}
        </Button>
        <TemplatePageSkeleton label={t("loading.template")} />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex flex-col gap-8">
        <Button nativeButton={false} variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link to="/systems" />}>
          <ArrowLeft data-icon="inline-start" />
          {t("catalog.back")}
        </Button>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("template.loadError")}</AlertTitle>
          <AlertDescription>
            {query.error ? getFunctionsErrorMessage(query.error) : t("template.notFound")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const template = query.data;
  const isOwner = Boolean(user && user.uid === template.creatorUid);
  const hasDownloaded = Boolean(user && template.downloaderUids.includes(user.uid));
  const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;
  const sectionTasks = selectedSection ? tasks.filter((task) => task.sectionId === selectedSection.id) : [];

  return (
    <div className="flex flex-col gap-8">
      <Button nativeButton={false} variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link to="/systems" />}>
        <ArrowLeft data-icon="inline-start" />
        {t("catalog.back")}
      </Button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <SystemCover src={template.imageUrl} alt={template.title} className="max-w-xl rounded-xl border" />
          <Badge variant="outline">{categoryLabel(t, template.category)}</Badge>
          <h1 className="text-3xl tracking-tight sm:text-4xl">{template.title}</h1>
          <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed">{template.purpose}</p>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {t("common.sectionsCount", { count: template.sectionCount })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ListTodo className="size-3.5" />
              {t("common.tasksCount", { count: template.taskCount })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Download className="size-3.5" />
              {t("common.copiesCount", { count: formatCount(template.downloadCount) })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" />
              {t("common.completedCount", {
                count: formatCount(template.completedCount),
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-3.5" />
              {t("common.ratingSummary", {
                rating: template.completionRatingAverage.toFixed(1),
                count: formatCount(template.completionReviewCount),
              })}
            </span>
          </div>
        </div>
        <div className="flex max-w-xs flex-col gap-3">
          <TemplateAction
            templateId={templateId}
            isOwner={isOwner}
            hasDownloaded={hasDownloaded}
            isReady={isReady}
            isSignedIn={Boolean(user)}
            isPending={download.isPending}
            onDownload={onDownload}
          />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t("template.shareTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateShareActions
                templateId={template.id}
                title={template.title}
                purpose={template.purpose}
              />
            </CardContent>
          </Card>
          {isOwner ? null : <UseInAppNote />}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("common.creator")}</CardTitle>
          <CardDescription>{t("template.creatorHelp")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/creators/$creatorId"
            params={{ creatorId: template.creator.uid }}
            className="flex items-start gap-3 rounded-lg outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="mt-0.5 flex size-10 items-center justify-center rounded-full bg-muted font-medium text-xs">
              {getInitials(template.creator.displayName)}
            </span>
            <span className="min-w-0 space-y-1">
              <span className="block font-medium text-sm">{template.creator.displayName}</span>
              {template.creator.headline ? (
                <span className="block text-muted-foreground text-sm">{template.creator.headline}</span>
              ) : null}
              {template.creator.expertise.length > 0 ? (
                <span className="flex flex-wrap gap-1 pt-1">
                  {template.creator.expertise.map((item) => (
                    <Badge key={item} variant="secondary">
                      {expertiseLabel(t, item)}
                    </Badge>
                  ))}
                </span>
              ) : null}
            </span>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
        <EditorSections
          templateId={templateId}
          sections={sections}
          tasks={tasks}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          canEdit={false}
        />
        <EditorTasks
          templateId={templateId}
          section={selectedSection}
          sections={sections}
          tasks={sectionTasks}
          canEdit={false}
          onSelectSection={setSelectedSectionId}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("template.reviewsTitle")}</CardTitle>
          <CardDescription>{t("template.reviewsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {template.completionReviews.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("template.reviewsEmpty")}
            </p>
          ) : (
            template.completionReviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 font-medium text-sm">
                    <Star className="size-3.5" />
                    {review.rating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatUpdatedAt(review.createdAt)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TemplateAction({
  templateId,
  isOwner,
  hasDownloaded,
  isReady,
  isSignedIn,
  isPending,
  onDownload,
}: {
  templateId: string;
  isOwner: boolean;
  hasDownloaded: boolean;
  isReady: boolean;
  isSignedIn: boolean;
  isPending: boolean;
  onDownload: () => Promise<void>;
}) {
  const { t } = useI18n();

  if (isOwner) {
    return (
      <Button nativeButton={false} render={<Link to="/dashboard/systems/$templateId" params={{ templateId }} />}>
        {t("template.editStudio")}
      </Button>
    );
  }

  if (hasDownloaded) {
    return (
      <Button nativeButton={false} render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}>
        {t("landing.appNoteCta")}
      </Button>
    );
  }

  if (isReady && isSignedIn) {
    return (
      <Button disabled={isPending} onClick={() => void onDownload()}>
        {isPending ? t("template.copying") : t("landing.play.takeCopy")}
      </Button>
    );
  }

  return (
    <Button nativeButton={false} render={<Link to="/auth/v1/login" search={{ redirect: `/systems/${templateId}` }} />}>
      {t("template.signInToCopy")}
    </Button>
  );
}
