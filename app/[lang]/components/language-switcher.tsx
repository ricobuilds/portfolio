'use client'
import { useRouter, usePathname } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/dropdown"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "./ui/button"
import { i18n, Locale, i18nSwitcher as languages } from '@/constants/i18n.config';
import { cn } from '@/lib/shared-utils';

interface Language {
  code: string
  name: string
  flag: string
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

    useEffect(() => {
    const currentLocale = pathname.split('/')[1]
    // @ts-ignore
    setCurrentLanguage(getLanguageName(currentLocale))
  }, [pathname])
  
    const getLanguageName = (locale: string) => {
    switch (locale) {
    case 'en': return languages.find((l) => l.code === locale)
    case 'es': return languages.find((l) => l.code === locale)
    case 'pt': return languages.find((l) => l.code === locale)
      default: return languages.find((l) => l.code === 'en')
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
    setCurrentLanguage(getLanguageName(newLocale))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-tingual-200 outline-none ring-transparent ring-offset-0 ring-offset-transparent justify-center w-[72px] border-2 rounded-none border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center uppercase">
           <Globe className="w-5 h-5 overflow-hidden rounded-full mr-1.5"/>
            {currentLanguage.code}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={6} className="w-[200px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={cn(currentLanguage.code) === language.code ? "bg-tingual-500 text-white focus:text-black" : ''}
            onSelect={() => handleLanguageChange(language.code)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center uppercase">
                <div className="w-5 h-5 mr-2 overflow-hidden">
                  <img
                    src={language.flag}
                    alt={`${language.name} flag`}
                    className="object-cover w-full h-full"
                  />
                </div>
                {language.code}
              </div>
              {currentLanguage.code === language.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// const LanguageSwitcher = () => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [language, setLanguage] = useState(languages[0].name);

//   useEffect(() => {
//     const currentLocale = pathname.split('/')[1]
//     // @ts-ignore
//     setLanguage(getLanguageName(currentLocale))
//   }, [pathname])
  
//   const getLanguageName = (locale: string) => {
//     switch (locale) {
//       case 'en': return languages.find((l) => l.code === locale)?.name
//       case 'es': return languages.find((l) => l.code === locale)?.name
//       case 'pt': return languages.find((l) => l.code === locale)?.name
//       default: return languages[0]?.name
//     }
//   }
  
//   const handleLanguageChange = (newLocale: string) => {
//     const currentLocale = pathname.split('/')[1] as Locale
    
//     if (i18n.locales.includes(currentLocale)) {
//       // If the current path already includes a locale, replace it
//       const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
//       router.push(newPath)
//     } else {
//       // If the current path doesn't include a locale, add the new locale
//       router.push(`/${newLocale}${pathname}`)
//     }
    
//     // @ts-ignore
//     setLanguage(getLanguageName(newLocale))
//   }

//   return (
//     <Select onValueChange={handleLanguageChange}>
//       <SelectTrigger className="w-[120px]" aria-label="Select language">
//         <SelectValue placeholder={language} />
//       </SelectTrigger>
//       <SelectContent>
//         {
//           languages.map((l) => (

//             <SelectItem key={l.code} className="w-full gap-2" value={l.code} onClick={() => setLanguage(l.name)}>
//               {l.name}
//             </SelectItem>
//           ))
//         }
//       </SelectContent>
//     </Select>
//   );
// };

// export default LanguageSwitcher;