// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],
  googleFonts: {
    families: { 
      'Epilogue': true, 
    }, 
    display: 'swap',
  },
  css: ['~/assets/scss/main.scss'],
  build: { 
    loaders: { 
      scss: { 
        implementation: require('sass'), 
        options: {
          api: 'modern', 
        }, 
      }, 
    }, 
  },
  plugins: [ '~/plugins/useNotify.js' ],
  app: { 
    head: { 
      title: 'Diary', 
      meta: [ { name: 'description', content: 'Diary' } ] 
    } 
  },
  ssr: true,
})
