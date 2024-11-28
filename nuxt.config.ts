// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  googleFonts: {
    families: { 
      'Epilogue': true, 
      'Roboto': true
    }, 
    display: 'swap',
  },
  css: ['~/assets/scss/main.scss'],
  plugins: [ '~/composables/useNotify.js' ],
  app: { 
    head: { 
      title: 'Diary', 
      meta: [ { name: 'description', content: 'Diary' } ] 
    } 
  },
  ssr: true,
  i18n: {
    vueI18n: './i18n.config.ts'
  }
})
