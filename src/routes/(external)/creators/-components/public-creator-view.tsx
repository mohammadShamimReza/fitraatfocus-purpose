import { Link } from "@tanstack/react-router";

import { ArrowLeft, CircleAlert, Globe, MapPin } from "lucide-react";

import { CreatorPageSkeleton, CreatorSystemsSkeleton } from "@/components/page-skeletons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { expertiseLabel } from "@/lib/i18n/labels";
import { getInitials } from "@/lib/utils";
import { useProfileQuery } from "@/query/profiles";
import { useCreatorTemplatesQuery } from "@/query/templates";
import type { CreatorProfile } from "@/types/profile";

import { TemplateCard } from "../../-components/template-card";

function CatalogBackLink({ label }: { label: string }) {
  return (
    <Button nativeButton={false} variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link to="/systems" />}>
      <ArrowLeft data-icon="inline-start" />
      {label}
    </Button>
  );
}

export function PublicCreatorView({ creatorId }: { creatorId: string }) {
  const { t } = useI18n();
  const profileQuery = useProfileQuery(creatorId, true);
  const templatesQuery = useCreatorTemplatesQuery(creatorId, true);

  if (profileQuery.isPending) {
    return (
      <div className="flex flex-col gap-8">
        <CatalogBackLink label={t("catalog.back")} />
        <CreatorPageSkeleton label={t("loading.creator")} />
      </div>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <div className="flex flex-col gap-8">
        <CatalogBackLink label={t("catalog.back")} />
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("creator.loadError")}</AlertTitle>
          <AlertDescription>
            {profileQuery.error ? getFunctionsErrorMessage(profileQuery.error) : t("creator.notFound")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <CatalogBackLink label={t("catalog.back")} />
      <CreatorHeader profile={profileQuery.data} />
      <div className="space-y-4">
        <h2 className="text-xl tracking-tight">{t("landing.catalog.title")}</h2>
        {templatesQuery.isPending ? <CreatorSystemsSkeleton label={t("loading.creatorSystems")} /> : null}
        {templatesQuery.isError ? (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>{t("landing.catalog.error")}</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <p>{getFunctionsErrorMessage(templatesQuery.error)}</p>
              <Button variant="outline" size="sm" className="w-fit" onClick={() => void templatesQuery.refetch()}>
                {t("common.tryAgain")}
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}
        {templatesQuery.isSuccess && templatesQuery.data.length === 0 ? (
          <Empty className="min-h-48 border border-dashed">
            <EmptyHeader>
              <EmptyTitle>{t("landing.catalog.emptyTitle")}</EmptyTitle>
              <EmptyDescription>{t("creator.emptySystems")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}
        {templatesQuery.isSuccess && templatesQuery.data.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {templatesQuery.data.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CreatorHeader({ profile }: { profile: CreatorProfile }) {
  const { t } = useI18n();

  return (
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
                {expertiseLabel(t, item)}
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
              {t("common.website")}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
