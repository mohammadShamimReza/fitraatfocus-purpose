import { type FontKey, fontCssFamily, fontRegistry } from "./registry";

export function applyFont(fontKey: FontKey): void {
  const font = fontRegistry[fontKey];
  const root = document.documentElement;

  root.setAttribute("data-font", fontKey);
  root.style.setProperty("--app-font-sans", fontCssFamily(font));
  root.style.setProperty(
    "--app-font-variation-settings",
    "variationSettings" in font ? font.variationSettings : "normal",
  );
}
