export const locales = ['de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh']

export const localeNames = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
}

export type Locales = (typeof locales)[number]
export const defaultLocale = 'en'
