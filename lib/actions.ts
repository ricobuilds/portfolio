"use server"

import { revalidatePath } from "next/cache"
import { verifyEmail } from "./shared-utils"
import { siteMetadata } from "./site.metadata"

type State = {
  errors?: {
    value?: string
  } | undefined
  message?: string
}

export async function createSubscriber(prevState: State, formData: FormData) {

  const email = formData.get("email") as string

  if (email == "") return {
    errors: {
      value: "The input field cannot be empty",
    },
    message: "Enter a valid email"
  }

  if (!email.includes("@")) return {
    errors: {
      value: "The input field has invalid content",
    },
    message: "Enter a valid email"
  }

  const isDisposable = verifyEmail(email)

  if (isDisposable) return { errors: {value: "Email domain is disposable. Please enter a different one."}, message: "Disposable emails are not accepted" }

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
      body: JSON.stringify(data),
    }
    )

    const ok = await res.json()
    console.log(ok)
    revalidatePath("/")
    return { message: "Thank you for subscribing!" }
  } catch (error) {
    return { errors: { value: "There's an issue"},  message: `${error}` }
  }
}