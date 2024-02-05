import Script from "next/script"

export const UmamiScript = () => {
  return (
    <Script
      async
      src={process.env.UMAMI_ANALYTICS_SRC as string}
      data-website-id={process.env.UMAMI_ANALYTICS_WID as string}
    />
  )
}