import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const isDev = process.env.NODE_ENV !== "production";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
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
