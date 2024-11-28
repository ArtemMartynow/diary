import en from './locales/en.json'
import ua from './locales/ua.json'

export default defineI18nConfig(() => ({
  strategy: 'prefix',
  legacy: false,
  locale: 'en',
  defaultLocale: 'en',
  langDir: './locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'en',
  },
  messages: {
    en,
    ua
  }
}))
