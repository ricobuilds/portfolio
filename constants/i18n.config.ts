export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'pt']
} as const

export type Locale = typeof i18n['locales'][number]

type Language = {
  code: Locale
  name: string
  flag: string
}

export const i18nSwitcher: Language[] = [
  {
    code: i18n.locales[0],
    name: "English (UK)",
    flag: `/images/flags/flag-${i18n.locales[0]}.png`
  },
  {
    code: i18n.locales[1],
    name: "Español",
    flag: `/images/flags/flag-${i18n.locales[1]}.png`
  },
  {
    code: i18n.locales[2],
    name: "Português (BR)",
    flag: `/images/flags/flag-pt-BR.png`
  },
]