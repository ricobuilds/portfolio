import { Metadata } from 'next'
import { siteMetadata } from './site.metadata'

interface PageSEOProps extends Metadata {
  title: string
  description?: string
  image?: string
  [key: string]: any
}

export function generateMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
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

    ...rest
  }
}