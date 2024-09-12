import 'server-only'
import type { Locale } from '@/constants/i18n.config'

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  'pt-BR': () => import("./dictionaries/pt-BR.json").then((module) => module.default),
}

export const getTranslations = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();