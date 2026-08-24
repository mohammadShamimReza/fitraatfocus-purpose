import { APP_LINKS } from "@/config/app-config";

const ANDROID_PACKAGE = "com.fitraatfocus";

function openUrl(url: string): void {
  if (typeof window === "undefined") return;
  window.location.href = url;
}

function isAndroid(): boolean {
  return typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
}

function isIOS(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/i.test(navigator.userAgent)
  );
}

function androidIntentUrl(templateId: string): string {
  const path = `purpose-catalog/${encodeURIComponent(templateId)}`;
  const fallback = APP_LINKS.appTemplateOpenWeb(templateId);
  return `intent://${path}#Intent;scheme=fitraatfocus;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
}

function openUrlWithFallback(
  primaryUrl: string,
  fallbackUrl: string,
  fallbackDelayMs: number,
): void {
  if (typeof document === "undefined") {
    openUrl(primaryUrl);
    return;
  }

  let switchedToApp = false;
  let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

  const cleanup = () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = undefined;
    }
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      switchedToApp = true;
      cleanup();
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  openUrl(primaryUrl);
  fallbackTimer = setTimeout(() => {
    cleanup();
    if (!switchedToApp) {
      openUrl(fallbackUrl);
    }
  }, fallbackDelayMs);
}

export function openTemplateInAppWithFallback(
  templateId: string,
  options?: { fallbackDelayMs?: number },
): void {
  if (typeof window === "undefined") return;

  const deepLinkUrl = APP_LINKS.appTemplateDeepLink(templateId);
  const webUrl = APP_LINKS.appTemplateOpenWeb(templateId);

  if (isAndroid()) {
    openUrl(androidIntentUrl(templateId));
    return;
  }

  if (isIOS()) {
    openUrlWithFallback(
      deepLinkUrl,
      webUrl,
      options?.fallbackDelayMs ?? 1500,
    );
    return;
  }

  openUrl(webUrl);
}
