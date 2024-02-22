import { SanityClient } from '@sanity/client'
import { createClient } from 'next-sanity'
import { config } from './config'
import { QueryParams } from 'sanity';

const sanityClient: SanityClient = createClient(config);

export async function sanityQuery(query: string, params?: QueryParams) {
  return sanityClient.fetch(query, params)
}