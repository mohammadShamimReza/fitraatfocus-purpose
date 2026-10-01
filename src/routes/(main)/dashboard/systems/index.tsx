/**
 * Screen: STUDIO-06
 * Documentation: docs/screens/STUDIO-06-my-systems.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { en } from "@/lib/i18n/messages/en";
import { privatePageHead } from "@/lib/seo/head";

import { SystemsList } from "./-components/systems-list";

export const Route = createFileRoute("/(main)/dashboard/systems/")({
  head: () => privatePageHead(en["systems.title"]),
  component: SystemsPage,
});

function SystemsPage() {
  return <SystemsList />;
}
