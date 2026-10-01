/**
 * Screen: STUDIO-01
 * Documentation: docs/screens/STUDIO-01-landing.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { APP_CONFIG } from "@/config/app-config";
import { buildPageHead } from "@/lib/seo/head";
import { landingJsonLd } from "@/lib/seo/structured-data";

import { LandingApp } from "./-components/landing-app";
import { LandingCatalog } from "./-components/landing-catalog";
import { LANDING_FAQS, LandingFaq } from "./-components/landing-faq";
import { LandingGetApp } from "./-components/landing-get-app";
import { LandingHero } from "./-components/landing-hero";
import { LandingLoop } from "./-components/landing-loop";
import { LandingProblem } from "./-components/landing-problem";

export const Route = createFileRoute("/(external)/")({
  head: () =>
    buildPageHead({
      title: APP_CONFIG.meta.title,
      description: APP_CONFIG.meta.description,
      path: "/",
      jsonLd: [landingJsonLd(LANDING_FAQS)],
    }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingProblem />
      <LandingLoop />
      <LandingCatalog />
      <LandingApp />
      <LandingFaq />
      <LandingGetApp />
    </>
  );
}
