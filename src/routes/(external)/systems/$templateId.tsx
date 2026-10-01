/**
 * Screen: STUDIO-03
 * Documentation: docs/screens/STUDIO-03-public-system.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { APP_CONFIG } from "@/config/app-config";
import { isFunctionsApiError } from "@/lib/api/errors";
import { en } from "@/lib/i18n/messages/en";
import { buildPageHead, notFoundPageHead } from "@/lib/seo/head";
import { isoDateTime } from "@/lib/seo/site";
import { breadcrumbJsonLd, purposeJsonLd } from "@/lib/seo/structured-data";
import { publicTemplateQueryOptions } from "@/query/templates/use-public-template";

import { PublicTemplateView } from "./-components/public-template-view";

export const Route = createFileRoute("/(external)/systems/$templateId")({
  loader: async ({ context, params }) => {
    try {
      const template = await context.queryClient.ensureQueryData(publicTemplateQueryOptions(params.templateId));
      return { template, missing: false };
    } catch (error) {
      return { template: null, missing: isFunctionsApiError(error) && error.status === 404 };
    }
  },
  head: ({ loaderData, params }) => {
    const path = `/systems/${encodeURIComponent(params.templateId)}`;
    const template = loaderData?.template;

    if (!template) {
      return loaderData?.missing ? notFoundPageHead() : buildPageHead({ title: en["template.loadError"], path });
    }

    return buildPageHead({
      title: template.title,
      description: template.purpose || template.description,
      path,
      imageUrl: template.imageUrl,
      imageAlt: template.title,
      type: "article",
      publishedTime: isoDateTime(template.createdAt),
      modifiedTime: isoDateTime(template.updatedAt),
      jsonLd: [
        purposeJsonLd(template),
        breadcrumbJsonLd([
          { name: APP_CONFIG.logo, path: "/" },
          { name: en["landing.nav.systems"], path: "/systems" },
          { name: template.title, path },
        ]),
      ],
    });
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
