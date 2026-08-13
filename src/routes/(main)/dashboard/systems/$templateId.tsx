import { createFileRoute } from "@tanstack/react-router";

import { SystemEditor } from "./-components/system-editor";

export const Route = createFileRoute("/(main)/dashboard/systems/$templateId")({
  component: SystemEditorPage,
});

function SystemEditorPage() {
  const { templateId } = Route.useParams();

  return <SystemEditor templateId={templateId} />;
}
