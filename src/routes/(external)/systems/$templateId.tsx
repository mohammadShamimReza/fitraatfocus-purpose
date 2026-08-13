import { createFileRoute } from "@tanstack/react-router";

import { PublicTemplateView } from "./-components/public-template-view";

export const Route = createFileRoute("/(external)/systems/$templateId")({
  component: PublicTemplatePage,
});

function PublicTemplatePage() {
  const { templateId } = Route.useParams();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <PublicTemplateView templateId={templateId} />
    </div>
  );
}
