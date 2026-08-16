const currentYear = new Date().getFullYear();

export const APP_LINKS = {
  site: "https://fitraatfocus.fitraat.com/",
  studio: "https://studio.fitraatfocus.fitraat.com",
  webApp: "https://app.fitraatfocus.com/welcome",
  playStore: "https://play.google.com/store/apps/details?id=com.fitraatfocus",
  iPhoneGuide: "https://fitraatfocus.fitraat.com/#iphone",
  privacy: "https://fitraatfocus.fitraat.com/privacy",
  terms: "https://fitraatfocus.fitraat.com/terms",
  donate: "https://fitraatfocus.fitraat.com/donate",
} as const;

export const APP_CONFIG = {
  name: "Fitraat Focus",
  version: "1.0.0",
  copyright: `© ${currentYear}, Fitraat Focus. Built for consistency, clarity, and meaningful work.`,
  meta: {
    title: "Fitraat Focus — Know the work. Then sit down and do it.",
    description:
      "Browse purpose systems here. Take a copy, then use them in the original Fitraat Focus app on your phone or on the web.",
  },
};
