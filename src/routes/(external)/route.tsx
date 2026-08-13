import { createFileRoute, Outlet } from "@tanstack/react-router";

import { LandingFooter } from "./-components/landing-footer";
import { LandingHeader } from "./-components/landing-header";

export const Route = createFileRoute("/(external)")({
  component: LandingLayout,
});

function LandingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
