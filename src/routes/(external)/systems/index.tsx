/**
 * Screen: STUDIO-02
 * Documentation: docs/screens/STUDIO-02-public-catalog.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { APP_CONFIG } from "@/config/app-config";
import { en } from "@/lib/i18n/messages/en";
import { buildPageHead } from "@/lib/seo/head";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/structured-data";
import { publicTemplatesQueryOptions } from "@/query/templates/use-public-templates";

import { PublicCatalog } from "./-components/public-catalog";

export const Route = createFileRoute("/(external)/systems/")({
  loader: async ({ context }) => {
    try {
      return await context.queryClient.ensureQueryData(publicTemplatesQueryOptions());
    } catch {
      return [];
    }
  },
  head: ({ loaderData }) =>
    buildPageHead({
      title: en["landing.catalog.title"],
      description: en["landing.catalog.body"],
      path: "/systems",
      jsonLd: [
        collectionPageJsonLd(loaderData ?? []),
        breadcrumbJsonLd([
          { name: APP_CONFIG.logo, path: "/" },
          { name: en["landing.nav.systems"], path: "/systems" },
        ]),
      ],
    }),
  component: PublicSystemsPage,
});

function PublicSystemsPage() {
  return <PublicCatalog />;
}
