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
  copyright: `© ${currentYear} Fitraat Focus.`,
  meta: {
    title: "Fitraat Focus — A target. Then the steps to get there.",
    description:
      "Find a purpose: a target and the steps to reach it. Add it to Fitraat Focus and follow them one by one.",
  },
};
