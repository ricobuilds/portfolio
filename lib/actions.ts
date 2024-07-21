"use server"

import { revalidatePath } from "next/cache"
import { verifyEmail } from "./shared-utils"
import { siteMetadata } from "./site.metadata"

export async function createSubscriber(formData: FormData) {

  const email = formData.get("email") as string

  const isDisposable = verifyEmail(email)

  if (isDisposable) return

  try {

    const data = {
      email,
      'send_welcome_email': true,
      "utm_source": "Enric Trillo",
      "utm_campaign": "summer_2024_promotion",
      "utm_medium": "organic",
      "referring_site": siteMetadata.siteUrl
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BH_PUB_ID}/subscriptions`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BH_API_KEY}`,
      },
      body: JSON.stringify({}),
    }
    )

    const ok = await res.json()
    console.log(ok)
    revalidatePath("/")
    return { message: "Thank you for subscribing!" }
  } catch (error) {
    return { message: error}
  }
}