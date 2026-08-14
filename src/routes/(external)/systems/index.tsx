import { createFileRoute } from "@tanstack/react-router";

import { PublicCatalog } from "./-components/public-catalog";

export const Route = createFileRoute("/(external)/systems/")({
  component: PublicSystemsPage,
});

function PublicSystemsPage() {
  return <PublicCatalog />;
}
