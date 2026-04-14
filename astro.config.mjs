import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const desktopLatestProxy = {
  target: "https://api.123offer.cn",
  changeOrigin: true,
};

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api/public/desktop/latest": desktopLatestProxy,
      },
    },
    preview: {
      proxy: {
        "/api/public/desktop/latest": desktopLatestProxy,
      },
    },
  },
});
