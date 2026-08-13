import { createFileRoute, redirect } from "@tanstack/react-router";

import { parseAuthRedirectSearch } from "@/lib/auth/post-auth-path";

export const Route = createFileRoute("/(main)/auth/v1/register")({
  validateSearch: parseAuthRedirectSearch,
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/auth/v1/login",
      search,
      replace: true,
    });
  },
});
