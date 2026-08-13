import { createFileRoute, Link } from "@tanstack/react-router";

import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/auth/auth-provider";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
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

  if (query.isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">{t("profile.loading")}</span>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
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
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl tracking-tight">{t("profile.title")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("profile.lead")}{" "}
          <Link to="/creators/$creatorId" params={{ creatorId: query.data.uid }} className="text-foreground underline">
            {t("profile.viewPublic")}
          </Link>
        </p>
      </div>
      <CreatorProfileForm profile={query.data} />
    </div>
  );
}
