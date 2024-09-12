import "../../globals.css"
import { GeistSans } from "geist/font/sans"
import React from 'react'
import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site.metadata";
import { cn } from "@/lib/shared-utils";
import { Navbar } from "@/components/navbar";
import { UmamiScript } from "@/components/umami-script";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Locale, i18n } from "@/constants/i18n.config";
import { getTranslations } from "../dictionaries";
import { FooterMarquee } from "@/components/footer-marquee";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.default,
    template: `%s | ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywword,
  alternates: {
    canonical: siteMetadata.siteUrl
  },
  openGraph: {
    title: siteMetadata.default,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: 'en_GB',
    type: 'website',
    images: siteMetadata.baseUrlImage,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.default,
    description: siteMetadata.description,
    creator: '@ricobuilds',
    site: "@ricobuilds",
    images: siteMetadata.baseUrlImage,
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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale }
}>) {
  const tl = await getTranslations(params.lang)
  return (
    <html lang={params.lang}>
      <body suppressHydrationWarning className={cn(GeistSans.className, "min-h-screen flex flex-col")}>
        <Navbar tl={tl["navbar"]} />
        {children}
        <Footer tl={tl["footer"]} lang={params.lang} />
        <FooterMarquee />
        <UmamiScript />
      </body>
    </html>
  );
}
