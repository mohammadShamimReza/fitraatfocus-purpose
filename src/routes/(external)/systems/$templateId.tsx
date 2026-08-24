/**
 * Screen: STUDIO-03
 * Documentation: docs/screens/STUDIO-03-public-system.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { APP_CONFIG, APP_LINKS } from "@/config/app-config";
import { publicTemplateQueryOptions } from "@/query/templates/use-public-template";

import { PublicTemplateView } from "./-components/public-template-view";

export const Route = createFileRoute("/(external)/systems/$templateId")({
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.ensureQueryData(
        publicTemplateQueryOptions(params.templateId),
      );
    } catch {
      return null;
    }
  },
  head: ({ loaderData, params }) => {
    const canonicalUrl = `${APP_LINKS.studio}/systems/${params.templateId}`;
    const title = loaderData?.title
      ? `${loaderData.title} | ${APP_CONFIG.name}`
      : APP_CONFIG.meta.title;
    const description =
      loaderData?.purpose?.trim() || APP_CONFIG.meta.description;
    const imageUrl = loaderData?.imageUrl;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: APP_CONFIG.name },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        ...(imageUrl ? [{ property: "og:image", content: imageUrl }] : []),
        { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(imageUrl ? [{ name: "twitter:image", content: imageUrl }] : []),
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
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
