import { createFileRoute } from "@tanstack/react-router";

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
      <LandingFaq />
      <LandingGetApp />
    </>
  );
}
