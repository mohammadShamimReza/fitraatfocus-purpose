import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";

import { FitraatBrand } from "@/components/brand/fitraat-mark";
import { APP_CONFIG, APP_LINKS } from "@/config/app-config";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function LandingFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-2 lg:col-span-1">
          <FitraatBrand markClassName="size-5" nameClassName="font-semibold text-sm" />
          <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">{t("landing.footer.blurb")}</p>
          <a
            href={APP_LINKS.webApp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit font-medium text-sm transition-colors hover:text-foreground"
          >
            {t("landing.appNoteCta")}
          </a>
        </div>
        <FooterColumn title={t("landing.footer.product")}>
          <Link to="/" hash="how" className="transition-colors hover:text-foreground">
            {t("landing.nav.how")}
          </Link>
          <Link to="/systems" className="transition-colors hover:text-foreground">
            {t("landing.nav.systems")}
          </Link>
          <Link to="/" hash="app" className="transition-colors hover:text-foreground">
            {t("landing.nav.app")}
          </Link>
          <Link to="/" hash="faq" className="transition-colors hover:text-foreground">
            {t("landing.nav.faq")}
          </Link>
          <Link to="/auth/v1/login" className="transition-colors hover:text-foreground">
            {t("landing.nav.studio")}
          </Link>
        </FooterColumn>
        <FooterColumn title={t("landing.footer.getApp")}>
          <a
            href={APP_LINKS.webApp}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.cta.web")}
          </a>
          <a
            href={APP_LINKS.playStore}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.cta.play")}
          </a>
          <a
            href={APP_LINKS.iPhoneGuide}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.cta.iphone")}
          </a>
        </FooterColumn>
        <FooterColumn title={t("landing.footer.legal")}>
          <a
            href={APP_LINKS.privacy}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.footer.privacy")}
          </a>
          <a
            href={APP_LINKS.terms}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.footer.terms")}
          </a>
          <a
            href={APP_LINKS.donate}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("landing.footer.donate")}
          </a>
        </FooterColumn>
      </div>
      <div className="border-t">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-muted-foreground text-xs sm:px-6">
          {APP_CONFIG.copyright}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-foreground text-sm">{title}</p>
      <div className="flex flex-col gap-1.5 text-muted-foreground text-sm">{children}</div>
    </div>
  );
}
