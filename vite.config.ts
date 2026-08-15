import { fileURLToPath } from "node:url";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const isDev = process.env.NODE_ENV !== "production";
const srcDir = `${fileURLToPath(new URL("./src", import.meta.url))}/`;

const srcAliases = [
  { find: /^@\//, replacement: srcDir },
  { find: /^#\//, replacement: srcDir },
];

const rolldownAliases = {
  "@/": srcDir,
  "#/": srcDir,
};

const config = defineConfig({
  resolve: {
    alias: srcAliases,
  },
  build: {
    rolldownOptions: {
      resolve: {
        alias: rolldownAliases,
      },
    },
  },
  plugins: [
    ...(isDev
      ? [
          devtools({
            injectSource: {
              enabled: true,
              ignore: {
                components: ["FullCalendar"],
              },
            },
          }),
        ]
      : []),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
});

export default config;
