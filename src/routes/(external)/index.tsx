/**
 * Screen: STUDIO-01
 * Documentation: docs/screens/STUDIO-01-landing.md
 */
import { createFileRoute } from "@tanstack/react-router";

import { LandingApp } from "./-components/landing-app";
import { LandingCatalog } from "./-components/landing-catalog";
import { LandingFaq } from "./-components/landing-faq";
import { LandingGetApp } from "./-components/landing-get-app";
import { LandingHero } from "./-components/landing-hero";
import { LandingLoop } from "./-components/landing-loop";
import { LandingProblem } from "./-components/landing-problem";

export const Route = createFileRoute("/(external)/")({
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
