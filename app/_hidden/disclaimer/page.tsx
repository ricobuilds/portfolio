import { getTranslations } from "@/app/[lang]/dictionaries"
import { Locale } from "@/constants/i18n.config"

export default async function Disclaimer({ params }: { params: { lang: Locale } }) {

  const tl = await getTranslations(params.lang)
  return (
    <div>
      <h1>Hello from Disclaimer</h1>
    </div>
  )
}