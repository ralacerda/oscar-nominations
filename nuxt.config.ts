// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@nuxt/fonts",
  ],
  devtools: { enabled: true },

  runtimeConfig: {
    tmdbAccessToken: "",
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
});