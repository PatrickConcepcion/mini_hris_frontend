// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    dirs: ['app/stores']
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      ignore: ['**/index.ts']
    }
  ],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost/api/v1'
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})