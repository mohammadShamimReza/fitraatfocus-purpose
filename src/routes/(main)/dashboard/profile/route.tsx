import { createFileRoute, Link } from "@tanstack/react-router";

import { CircleAlert } from "lucide-react";

import { ProfileFormSkeleton } from "@/components/page-skeletons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { useMyProfileQuery } from "@/query/profiles";

import { CreatorProfileForm } from "./-components/creator-profile-form";

export const Route = createFileRoute("/(main)/dashboard/profile")({
  component: CreatorProfilePage,
});

function CreatorProfilePage() {
  const { isReady } = useAuth();
  const { t } = useI18n();
  const query = useMyProfileQuery(isReady);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl tracking-tight">{t("profile.title")}</h1>
        {query.isSuccess && query.data ? (
          <p className="text-muted-foreground text-sm">
            {t("profile.lead")}{" "}
            <Link
              to="/creators/$creatorId"
              params={{ creatorId: query.data.uid }}
              className="text-foreground underline"
            >
              {t("profile.viewPublic")}
            </Link>
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">{t("profile.lead")}</p>
        )}
      </div>

      {query.isPending ? <ProfileFormSkeleton label={t("profile.loading")} /> : null}

      {query.isError || (!query.isPending && !query.data) ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("profile.loadError")}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>{query.error ? getFunctionsErrorMessage(query.error) : t("common.tryAgain")}</p>
            <Button variant="outline" size="sm" className="w-fit" onClick={() => void query.refetch()}>
              {t("common.tryAgain")}
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      {query.isSuccess && query.data ? <CreatorProfileForm profile={query.data} /> : null}
    </div>
  );
}
