import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/auth/v2/login")({
  beforeLoad: () => {
    throw redirect({ to: "/auth/v1/login", replace: true });
  },
});
