// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",

  runtimeConfig: {
    tmdbAccessToken: "",
  },

  nitro: {
    experimental: {
      tasks: true,
    },
  },
});
