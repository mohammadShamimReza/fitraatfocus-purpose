const currentYear = new Date().getFullYear();

export const APP_LINKS = {
  site: "https://fitraatfocus.fitraat.com/",
  webApp: "https://fitraat-focus.web.app",
  playStore: "https://play.google.com/store/apps/details?id=com.fitraatfocus",
  iPhoneGuide: "https://fitraatfocus.fitraat.com/#iphone",
  privacy: "https://fitraatfocus.fitraat.com/privacy",
  terms: "https://fitraatfocus.fitraat.com/terms",
  donate: "https://fitraatfocus.fitraat.com/donate",
} as const;

export const APP_CONFIG = {
  name: "Fitraat Focus",
  version: "0.1.0",
  copyright: `© ${currentYear}, Fitraat Focus. Built for consistency, clarity, and meaningful work.`,
  meta: {
    title: "Fitraat Focus — Purpose System Studio",
    description:
      "Browse purpose-driven systems written by named creators. Take a copy into the Fitraat Focus app when you are ready to run the work.",
  },
};
