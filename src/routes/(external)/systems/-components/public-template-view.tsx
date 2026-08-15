import { useEffect, useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import { ArrowLeft, CircleAlert, Download, Layers, ListTodo } from "lucide-react";

import { SystemCover } from "@/components/system-cover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { getExpertiseLabel } from "@/lib/profiles/options";
import { formatCount } from "@/lib/templates/format";
import { getCategoryLabel } from "@/lib/templates/options";
import { getInitials } from "@/lib/utils";
import { useDownloadTemplateMutation, usePublicTemplateQuery } from "@/query/templates";
import { EditorSections } from "@/routes/(main)/dashboard/systems/-components/editor-sections";
import { EditorTasks } from "@/routes/(main)/dashboard/systems/-components/editor-tasks";

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
        title: "Downloaded",
        description: "This system is marked as downloaded for your account.",
      });
    } catch (error) {
      toast.add({
        title: "Could not download",
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  if (query.isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">Loading the system</span>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Could not load this system</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p>{query.error ? getFunctionsErrorMessage(query.error) : "The system was not found."}</p>
          <Button nativeButton={false} variant="ghost" size="sm" render={<Link to="/systems" />}>
            {t("catalog.back")}
          </Button>
        </AlertDescription>
      </Alert>
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
          <Badge variant="outline">{getCategoryLabel(template.category)}</Badge>
          <h1 className="text-3xl tracking-tight sm:text-4xl">{template.title}</h1>
          <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed">{template.purpose}</p>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {template.sectionCount} sections
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ListTodo className="size-3.5" />
              {template.taskCount} tasks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Download className="size-3.5" />
              {formatCount(template.downloadCount)} downloads
            </span>
          </div>
        </div>
        <TemplateAction
          templateId={templateId}
          isOwner={isOwner}
          hasDownloaded={hasDownloaded}
          isReady={isReady}
          isSignedIn={Boolean(user)}
          isPending={download.isPending}
          onDownload={onDownload}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Creator</CardTitle>
          <CardDescription>Why this library is worth trusting.</CardDescription>
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
                      {getExpertiseLabel(item)}
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
  if (isOwner) {
    return (
      <Button nativeButton={false} render={<Link to="/dashboard/systems/$templateId" params={{ templateId }} />}>
        Edit in studio
      </Button>
    );
  }

  if (hasDownloaded) {
    return <Button disabled>Downloaded</Button>;
  }

  if (isReady && isSignedIn) {
    return (
      <Button disabled={isPending} onClick={() => void onDownload()}>
        {isPending ? "Downloading…" : "Download"}
      </Button>
    );
  }

  return (
    <Button nativeButton={false} render={<Link to="/auth/v1/login" search={{ redirect: `/systems/${templateId}` }} />}>
      Sign in to download
    </Button>
  );
}
