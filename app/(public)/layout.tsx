import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { siteMetadata } from "@/lib/site.metadata";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Navbar />
        {children}
        <UmamiScript />
        <Footer />
      </body>
    </html>
  );
}
