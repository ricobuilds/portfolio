import React from 'react'
import { QueryParams } from 'sanity';
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client';

async function sanityQuery(query: string, params?: QueryParams) {
  return sanityClient.fetch(query, params)
}

const builder = imageUrlBuilder(  sanityClient)

function urlForImage(source: string) {
  return builder.image(source).auto('format').fit('max')
}


export { sanityQuery, urlForImage }