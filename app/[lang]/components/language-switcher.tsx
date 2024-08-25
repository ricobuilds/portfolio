'use client'
import { useRouter, usePathname } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { i18n, Locale } from '@/constants/i18n.config';
import Image from 'next/image';

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const currentLocale = pathname.split('/')[1]
    setLanguage(getLanguageName(currentLocale))
  }, [pathname])

  const getLanguageName = (locale: string) => {
    switch (locale) {
      case 'en': return 'English'
      case 'es': return 'Español'
      case 'pt-BR': return 'Português'
      default: return 'English'
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

    setLanguage(getLanguageName(newLocale))
  }

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[120px]" aria-label="Select language">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="w-full gap-2" value="en" onClick={() => setLanguage("English")}>
          English
        </SelectItem>
        <SelectItem className="flex gap-2" value="es" onClick={() => setLanguage("Español")}>
          Español
        </SelectItem>
        <SelectItem className="flex gap-2" value="pt-BR" onClick={() => setLanguage("Português")}>
          Português
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;