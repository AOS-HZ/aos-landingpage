import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    starlight({
      title: "AgentOfShield Docs",
      description: "AOS Desktop 与 AOS CLI 的产品文档中心",
      favicon: "/favicon.svg",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AOS-HZ",
        },
      ],
      sidebar: [
        {
          label: "文档首页",
          link: "/docs/",
        },
        {
          label: "AOS Desktop",
          autogenerate: {
            directory: "docs/aos-desktop",
          },
        },
        {
          label: "AOS CLI",
          autogenerate: {
            directory: "docs/aos-cli",
          },
        },
      ],
      customCss: ["/src/styles/starlight.css"],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
