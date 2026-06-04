import { defineNuxtConfig } from "nuxt/config";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const { version } = JSON.parse(
  readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../package.json"), "utf-8"),
);

export default defineNuxtConfig({
  compatibilityDate: "2026-06-03",
  modules: ["../src/module", "nuxt-og-image"],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://qrcode-nuxt.vercel.app",
      version,
    },
  },
  devtools: { enabled: true },
  ignore: ["../dist/**", "../node_modules/**", "../.git/**"],
  css: ["~/assets/css/docs.css"],
  ogImage: {
    zeroRuntime: false,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      titleTemplate: "%s | qrcode-nuxt",
      script: [
        {
          // Runs synchronously before first paint to prevent theme FOUC
          innerHTML: `(function(){try{var t=localStorage.getItem('qrcode-nuxt-theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
      },
    },
  },
});
