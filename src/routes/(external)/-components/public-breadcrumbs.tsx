import { Link } from "@tanstack/react-router";

import { APP_CONFIG } from "@/config/app-config";
import { useI18n } from "@/lib/i18n/i18n-provider";

type PublicBreadcrumbsProps = { page: "catalog" } | { page: "detail"; current?: string };

export function PublicBreadcrumbs(props: PublicBreadcrumbsProps) {
  const { t } = useI18n();
  const purposesLabel = t("landing.nav.systems");
  const current = props.page === "detail" ? props.current?.trim() : undefined;
  const purposesIsCurrent = props.page === "catalog";

  return (
    <nav aria-label={t("seo.breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
        <li>
          <Link
            to="/"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {APP_CONFIG.logo}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {purposesIsCurrent ? (
            <span aria-current="page" className="text-foreground">
              {purposesLabel}
            </span>
          ) : (
            <Link
              to="/systems"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {purposesLabel}
            </Link>
          )}
        </li>
        {current ? (
          <>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="max-w-xs truncate text-foreground">
              {current}
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
