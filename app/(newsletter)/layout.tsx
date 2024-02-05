import { siteMetadata } from "@/lib/site.metadata"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import "../globals.css";
import { UmamiScript } from "../components/umami-script";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.default,
    template: `%s - ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  alternates: {
    canonical: siteMetadata.siteUrl
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: 'en_GB',
    type: 'website',
    images: `/base-og-image.png`,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: '@ricobuilds',
    site: siteMetadata.siteUrl,
    images: `/base-og-image.png`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
         {children}
         <UmamiScript />
      </body>
    </html>
  )
}
