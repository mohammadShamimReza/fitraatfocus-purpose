import { createFileRoute } from "@tanstack/react-router";

import { notFoundPageHead } from "@/lib/seo/head";

import { NotFound } from "./-components/not-found";

export const Route = createFileRoute("/$")({
  head: () => notFoundPageHead(),
  component: NotFound,
});
