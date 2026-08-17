/**
 * Screen: STUDIO-06
 * Documentation: docs/screens/STUDIO-06-my-systems.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { SystemsList } from "./-components/systems-list";

export const Route = createFileRoute("/(main)/dashboard/systems/")({
  component: SystemsPage,
});

function SystemsPage() {
  return <SystemsList />;
}
