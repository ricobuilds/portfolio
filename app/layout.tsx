import "./globals.css"
import { GeistSans } from "geist/font/sans"
import React from 'react'
import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site.metadata";
import { cn } from "@/lib/shared-utils";
import { Navbar } from "@/components/navbar";
import { UmamiScript } from "@/components/umami-script";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.default,
    template: `%s - ${siteMetadata.title}`
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

export default function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang}>
      <body suppressHydrationWarning className={cn(GeistSans.className, "min-h-screen flex flex-col")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <UmamiScript />
      </body>
    </html>
  );
}
