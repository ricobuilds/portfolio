'use client'
import { useRouter, usePathname } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { i18n, Locale, i18nSwitcher as languages } from '@/constants/i18n.config';

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState(languages[0].name);

  useEffect(() => {
    const currentLocale = pathname.split('/')[1]
    // @ts-ignore
    setLanguage(getLanguageName(currentLocale))
  }, [pathname])
  
  const getLanguageName = (locale: string) => {
    switch (locale) {
      case 'en': return languages.find((l) => l.code === locale)?.name
      case 'es': return languages.find((l) => l.code === locale)?.name
      case 'pt': return languages.find((l) => l.code === locale)?.name
      default: return languages[0]?.name
    }
  }
  
  const handleLanguageChange = (newLocale: string) => {
    const currentLocale = pathname.split('/')[1] as Locale
    
    if (i18n.locales.includes(currentLocale)) {
      // If the current path already includes a locale, replace it
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
      router.push(newPath)
    } else {
      // If the current path doesn't include a locale, add the new locale
      router.push(`/${newLocale}${pathname}`)
    }
    
    // @ts-ignore
    setLanguage(getLanguageName(newLocale))
  }

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[120px]" aria-label="Select language">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        {
          languages.map((l) => (

            <SelectItem key={l.code} className="w-full gap-2" value={l.code} onClick={() => setLanguage(l.name)}>
              {l.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;