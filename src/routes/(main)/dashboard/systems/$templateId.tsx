/**
 * Screen: STUDIO-08
 * Documentation: docs/screens/STUDIO-08-editor.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { privatePageHead } from "@/lib/seo/head";

import { SystemEditor } from "./-components/system-editor";

export const Route = createFileRoute("/(main)/dashboard/systems/$templateId")({
  head: () => privatePageHead("Edit purpose"),
  component: SystemEditorPage,
});

function SystemEditorPage() {
  const { templateId } = Route.useParams();

  return <SystemEditor templateId={templateId} />;
}
