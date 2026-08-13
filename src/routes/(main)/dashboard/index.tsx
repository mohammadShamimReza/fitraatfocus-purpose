import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/dashboard/")({
  beforeLoad: () => {
    throw redirect({ href: "/dashboard/systems", replace: true });
  },
});
