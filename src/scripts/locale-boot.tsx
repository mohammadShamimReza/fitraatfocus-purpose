import { LOCALE_STORAGE_KEY } from "@/lib/i18n/config";

/**
 * Sets html lang from the stored locale before hydration so the document language
 * matches the user's last choice without waiting for React.
 */
export function LocaleBootScript() {
  const code = `
    (function () {
      try {
        var key = ${JSON.stringify(LOCALE_STORAGE_KEY)};
        var value = null;

        try {
          value = window.localStorage.getItem(key);
        } catch (e) {}

        if (!value) {
          var match = document.cookie.split("; ").find(function (row) {
            return row.startsWith(key + "=");
          });
          value = match ? decodeURIComponent(match.split("=")[1]) : null;
        }

        if (value === "en" || value === "bn") {
          document.documentElement.lang = value;
        }
      } catch (e) {}
    })();
  `;

  /* biome-ignore lint/security/noDangerouslySetInnerHtml: required for pre-hydration locale boot */
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
