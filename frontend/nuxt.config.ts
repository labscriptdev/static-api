// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: { baseURL: '/static-api/' },
  css: ['@/app.scss'],
});
