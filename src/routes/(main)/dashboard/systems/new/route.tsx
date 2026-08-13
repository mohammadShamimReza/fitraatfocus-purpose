import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { CreateSystemForm } from "../-components/create-system-form";
import { LocalOnlyNote } from "../-components/local-only-note";

export const Route = createFileRoute("/(main)/dashboard/systems/new")({
  component: NewSystemPage,
});

function NewSystemPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-3">
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
        <div className="space-y-1.5">
          <h1 className="text-3xl tracking-tight">{t("newSystem.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("newSystem.lead")}</p>
          <LocalOnlyNote />
        </div>
      </div>
      <CreateSystemForm />
    </div>
  );
}
