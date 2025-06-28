// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
  ],
  devtools: { enabled: true },

  runtimeConfig: {
    tmdbAccessToken: "",
  },

  app: {
    head: {
      titleTemplate: "%s | Nomeações Oscar",
      htmlAttrs: {
        lang: "pt",
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  $production: {
    scripts: {
      registry: {
        plausibleAnalytics: {
          domain: "oscar.ralacerda.dev",
          scriptInput: {
            src: "https://plausible.ralacerda.dev/js/script.js",
          },
        },
      },
    },
  },
});
