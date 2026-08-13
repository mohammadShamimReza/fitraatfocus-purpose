import { Link } from "@tanstack/react-router";

import { ArrowLeft, CircleAlert, Globe, MapPin } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { getExpertiseLabel } from "@/lib/profiles/options";
import { getInitials } from "@/lib/utils";
import { useProfileQuery } from "@/query/profiles";
import { useCreatorTemplatesQuery } from "@/query/templates";

import { TemplateCard } from "../../-components/template-card";

export function PublicCreatorView({ creatorId }: { creatorId: string }) {
  const profileQuery = useProfileQuery(creatorId, true);
  const templatesQuery = useCreatorTemplatesQuery(creatorId, true);

  if (profileQuery.isPending || templatesQuery.isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">Loading creator</span>
      </div>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Could not load this creator</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p>{profileQuery.error ? getFunctionsErrorMessage(profileQuery.error) : "Creator not found."}</p>
          <Button nativeButton={false} variant="ghost" size="sm" render={<Link to="/" />}>
            Back to systems
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const profile = profileQuery.data;
  const templates = templatesQuery.data ?? [];

  return (
    <div className="flex flex-col gap-8">
      <Button nativeButton={false} variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link to="/" />}>
        <ArrowLeft data-icon="inline-start" />
        All systems
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-lg">
          {getInitials(profile.displayName)}
        </span>
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl tracking-tight">{profile.displayName}</h1>
            {profile.headline ? <p className="text-muted-foreground text-sm">{profile.headline}</p> : null}
          </div>
          {profile.bio ? <p className="max-w-2xl text-sm leading-relaxed">{profile.bio}</p> : null}
          {profile.proof ? (
            <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed">{profile.proof}</p>
          ) : null}
          {profile.expertise.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {profile.expertise.map((item) => (
                <Badge key={item} variant="secondary">
                  {getExpertiseLabel(item)}
                </Badge>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3 text-muted-foreground text-xs">
            {profile.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
            ) : null}
            {profile.website ? (
              <a
                href={profile.website}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                rel="noreferrer"
                target="_blank"
              >
                <Globe className="size-3.5" />
                Website
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl tracking-tight">Published systems</h2>
        {templates.length === 0 ? (
          <Empty className="min-h-48 border border-dashed">
            <EmptyHeader>
              <EmptyTitle>No published systems</EmptyTitle>
              <EmptyDescription>This creator has not published a library yet.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
