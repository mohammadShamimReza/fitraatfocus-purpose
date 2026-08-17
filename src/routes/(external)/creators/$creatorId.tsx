/**
 * Screen: STUDIO-04
 * Documentation: docs/screens/STUDIO-04-public-creator.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { PublicCreatorView } from "./-components/public-creator-view";

export const Route = createFileRoute("/(external)/creators/$creatorId")({
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
