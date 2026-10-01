/**
 * Screen: STUDIO-04
 * Documentation: docs/screens/STUDIO-04-public-creator.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { APP_CONFIG } from "@/config/app-config";
import { isFunctionsApiError } from "@/lib/api/errors";
import { en } from "@/lib/i18n/messages/en";
import { buildPageHead, notFoundPageHead } from "@/lib/seo/head";
import { breadcrumbJsonLd, creatorJsonLd } from "@/lib/seo/structured-data";
import { profileQueryOptions } from "@/query/profiles/use-profile";
import { creatorTemplatesQueryOptions } from "@/query/templates/use-creator-templates";

import { PublicCreatorView } from "./-components/public-creator-view";

export const Route = createFileRoute("/(external)/creators/$creatorId")({
  loader: async ({ context, params }) => {
    const [profileResult, templatesResult] = await Promise.allSettled([
      context.queryClient.ensureQueryData(profileQueryOptions(params.creatorId)),
      context.queryClient.ensureQueryData(creatorTemplatesQueryOptions(params.creatorId)),
    ]);

    return {
      profile: profileResult.status === "fulfilled" ? profileResult.value : null,
      templates: templatesResult.status === "fulfilled" ? templatesResult.value : [],
      missing:
        profileResult.status === "rejected" &&
        isFunctionsApiError(profileResult.reason) &&
        profileResult.reason.status === 404,
    };
  },
  head: ({ loaderData, params }) => {
    const profile = loaderData?.profile;

    if (!profile) {
      return loaderData?.missing
        ? notFoundPageHead()
        : buildPageHead({
            title: en["creator.loadError"],
            path: `/creators/${encodeURIComponent(params.creatorId)}`,
          });
    }

    const path = `/creators/${encodeURIComponent(params.creatorId)}`;

    return buildPageHead({
      title: profile.displayName,
      description: profile.headline || profile.bio || `${profile.displayName} on ${APP_CONFIG.name}.`,
      path,
      imageUrl: profile.avatarUrl,
      imageAlt: profile.displayName,
      type: "profile",
      jsonLd: [
        creatorJsonLd(profile, loaderData?.templates ?? []),
        breadcrumbJsonLd([
          { name: APP_CONFIG.logo, path: "/" },
          { name: en["landing.nav.systems"], path: "/systems" },
          { name: profile.displayName, path },
        ]),
      ],
    });
  },
  component: PublicCreatorPage,
});

function PublicCreatorPage() {
  const { creatorId } = Route.useParams();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <PublicCreatorView creatorId={creatorId} />
    </div>
  );
}
