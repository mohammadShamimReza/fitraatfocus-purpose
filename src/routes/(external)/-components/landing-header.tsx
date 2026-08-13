import { Link } from "@tanstack/react-router";

import { ArrowUpRight } from "lucide-react";

import { FitraatBrand } from "@/components/brand/fitraat-mark";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/config/app-config";
import { useAuth } from "@/lib/auth/auth-provider";
import { CREATE_SYSTEM_PATH } from "@/lib/auth/post-auth-path";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { ThemeSwitcher } from "@/routes/(main)/dashboard/-components/header/theme-switcher";

export function LandingHeader() {
  const { t } = useI18n();
  const { user, isReady } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="text-foreground">
          <FitraatBrand markClassName="size-5" nameClassName="font-semibold text-sm" />
        </Link>
        <nav className="flex items-center gap-2">
          <Button
            nativeButton={false}
            size="sm"
            variant="ghost"
            className="hidden md:inline-flex"
            render={<Link to="/" hash="how" />}
          >
            {t("landing.nav.how")}
          </Button>
          <Button nativeButton={false} size="sm" variant="ghost" render={<Link to="/" hash="systems" />}>
            {t("landing.nav.browse")}
          </Button>
          <Button
            nativeButton={false}
            size="sm"
            variant="ghost"
            className="hidden md:inline-flex"
            render={<Link to="/" hash="faq" />}
          >
            {t("landing.nav.faq")}
          </Button>
          <LocaleSwitcher />
          <ThemeSwitcher />
          <Button
            nativeButton={false}
            size="sm"
            variant="ghost"
            className="hidden sm:inline-flex"
            render={<a href={APP_LINKS.webApp} target="_blank" rel="noreferrer" />}
          >
            {t("landing.nav.openApp")}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          {isReady && user ? (
            <Button nativeButton={false} size="sm" render={<Link to="/dashboard/systems" />}>
              {t("landing.nav.dashboard")}
            </Button>
          ) : (
            <>
              <Button nativeButton={false} size="sm" variant="ghost" render={<Link to="/auth/v1/login" />}>
                {t("landing.nav.signIn")}
              </Button>
              <Button
                nativeButton={false}
                size="sm"
                className="hidden sm:inline-flex"
                render={<Link to="/auth/v1/login" search={{ redirect: CREATE_SYSTEM_PATH }} />}
              >
                {t("landing.nav.create")}
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
