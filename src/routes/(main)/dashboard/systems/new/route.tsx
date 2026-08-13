import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateSystemForm } from "../-components/create-system-form";
import { LocalOnlyNote } from "../-components/local-only-note";

export const Route = createFileRoute("/(main)/dashboard/systems/new")({
  component: NewSystemPage,
});

function NewSystemPage() {
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
          My systems
        </Button>
        <div className="space-y-1.5">
          <h1 className="text-3xl tracking-tight">New system</h1>
          <p className="text-muted-foreground text-sm">
            Start with the purpose and the story. Sections and tasks come next.
          </p>
          <LocalOnlyNote />
        </div>
      </div>
      <CreateSystemForm />
    </div>
  );
}
