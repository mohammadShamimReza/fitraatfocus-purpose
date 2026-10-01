import { lazy, type ReactNode, Suspense } from "react";

import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_CONFIG } from "@/config/app-config";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { fontRegistry } from "@/lib/fonts/registry";
import { type AppLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import { ROBOTS_INDEX } from "@/lib/seo/site";
import { LocaleBootScript } from "@/scripts/locale-boot";
import { ThemeBootScript } from "@/scripts/theme-boot";
import { getInitialLocale } from "@/server/server-actions";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";

import appCss from "../styles/styles.css?url";
import { NotFound } from "./-components/not-found";
import { RootError } from "./-components/root-error";

const AppDevtools = import.meta.env.DEV
  ? lazy(() => import("./-components/app-devtools").then((mod) => ({ default: mod.AppDevtools })))
  : () => null;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: () => getInitialLocale(),
  component: RootLayout,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: APP_CONFIG.meta.title,
      },
      {
        name: "description",
        content: APP_CONFIG.meta.description,
      },
      {
        name: "application-name",
        content: APP_CONFIG.name,
      },
      {
        name: "apple-mobile-web-app-title",
        content: APP_CONFIG.name,
      },
      {
        name: "theme-color",
        content: APP_CONFIG.meta.themeColor,
      },
      {
        name: "robots",
        content: ROBOTS_INDEX,
      },
      {
        property: "og:site_name",
        content: APP_CONFIG.name,
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: APP_CONFIG.meta.title,
      },
      {
        property: "og:description",
        content: APP_CONFIG.meta.description,
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:title",
        content: APP_CONFIG.meta.title,
      },
      {
        name: "twitter:description",
        content: APP_CONFIG.meta.description,
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: fontRegistry[PREFERENCE_DEFAULTS.font].stylesheet,
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "sitemap",
        type: "application/xml",
        title: "Sitemap",
        href: "/sitemap.xml",
      },
    ],
  }),
  errorComponent: RootErrorBoundary,
  notFoundComponent: NotFoundBoundary,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { theme_mode, theme_preset, content_layout, navbar_style, sidebar_variant, sidebar_collapsible, font } =
    PREFERENCE_DEFAULTS;

  return (
    <html
      lang="en"
      data-theme-mode={theme_mode}
      data-theme-preset={theme_preset}
      data-content-layout={content_layout}
      data-navbar-style={navbar_style}
      data-sidebar-variant={sidebar_variant}
      data-sidebar-collapsible={sidebar_collapsible}
      data-font={font}
      suppressHydrationWarning
    >
      <head>
        {/* Applies theme and layout preferences on load to avoid flicker and unnecessary server rerenders. */}
        <ThemeBootScript />
        <LocaleBootScript />
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        {import.meta.env.DEV ? (
          <Suspense fallback={null}>
            <AppDevtools />
          </Suspense>
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

function AppProviders({ children, locale }: { children: ReactNode; locale?: AppLocale }) {
  return (
    <TooltipProvider>
      <PreferencesStoreProvider initialValues={PREFERENCE_DEFAULTS}>
        <I18nProvider initialLocale={locale ?? DEFAULT_LOCALE}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </I18nProvider>
      </PreferencesStoreProvider>
    </TooltipProvider>
  );
}

function RootErrorBoundary(props: React.ComponentProps<typeof RootError>) {
  return (
    <AppProviders>
      <RootError {...props} />
    </AppProviders>
  );
}

function NotFoundBoundary() {
  return (
    <AppProviders>
      <NotFound />
    </AppProviders>
  );
}

function RootLayout() {
  const locale = Route.useLoaderData();

  return (
    <AppProviders locale={locale}>
      <Outlet />
    </AppProviders>
  );
}
