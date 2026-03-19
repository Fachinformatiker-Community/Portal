import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

export type MessageSchema = typeof en

const savedLocale = localStorage.getItem('locale') ?? 'de'

export const i18n = createI18n<[MessageSchema], 'en' | 'de'>({
  legacy: false,
  locale: savedLocale as 'en' | 'de',
  fallbackLocale: 'en',
  messages: { en, de },
})

export default i18n
