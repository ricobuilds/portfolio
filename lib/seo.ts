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
    title,
    description: description || siteMetadata.description,
    alternates: {
      canonical: './'
    },
    openGraph: {
      title: siteMetadata.default,
      description: siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      locale: 'en_GB',
      type: 'website',
      images: image ? [image] : siteMetadata.baseUrlImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteMetadata.title}`,
      description: description,
      creator: '@ricobuilds',
      site: "@ricobuilds",
      images: image ? [image] : siteMetadata.baseUrlImage,
    },
    ...rest
  }
}