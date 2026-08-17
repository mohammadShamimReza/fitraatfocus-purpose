/**
 * Screen: STUDIO-02
 * Documentation: docs/screens/STUDIO-02-public-catalog.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { PublicCatalog } from "./-components/public-catalog";

export const Route = createFileRoute("/(external)/systems/")({
  component: PublicSystemsPage,
});

function PublicSystemsPage() {
  return <PublicCatalog />;
}
