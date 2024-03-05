import { groq } from "next-sanity";
import { sanityQuery } from "./utils";

// # Article Queries
export const fetchLatestArticles = async () => {
  const res = await sanityQuery(groq`*[_type == "article"] | order(_createdAt desc)[0..2]{
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
  }
  `)

  return res
}

export const fetchArticleBySlug = async (slug: string) => {
  const res = await sanityQuery(groq`*[_type == "article" && slug.current == "${slug}"][0]{
    title,
    description,
    content,
    _updatedAt,
    publishedAt,
    "topic": topic->{title, "slug": slug.current},
    "author": author->{name},
    }`)

  return res
}

export const getPrevArticle = async (order: string) => {
  const res = await sanityQuery(groq`*[_type == "article" && publishedAt < "${order}"] | order(publishedAt desc)[0]{
  "slug": slug.current
}`)

  return res
}

export const getNextArticle = async (order: string) => {
  const res = await sanityQuery(groq`*[_type == "article" && publishedAt > "${order}"] | order(publishedAt asc)[0]{
  "slug": slug.current
}`)

  return res
}

export const fetchAllArticles = async () => {
  const res = await sanityQuery(groq`*[_type == "article"] | order(publishedAt desc){
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
  }`)

  return res
}

export const fetchSixArticles = async () => {
  const res = await sanityQuery(groq`*[_type == "article"] | order(publishedAt desc)[0..4]{
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
  }`)

  return res
}

export const fetchArticleSitemap = async () => {
  const res = await sanityQuery(groq`*[_type == "article"]{
    "slug": slug.current,
    _createdAt,
    _updatedAt
  }`)
  return res
}

// # Tag Queries
// export const fetchTopics = groq`*[_type == "tag" && count(*[_type=="article" && references(^._id)]) > 0]{
export const fetchTopics = async () => {
  const res = await sanityQuery(groq`*[_type == "topic"]{
        _id,
        title,
        description,
        "slug": slug.current
      }`)

  return res
}

export const fetchTopic = async (slug: string) => {
  const res = await sanityQuery(groq`*[_type == "topic" && slug.current == "${slug}"][0]{
    title,
    description,
    "slug": slug.current,
    "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc) [0...10]{_id, title, publishedAt, description, "slug": slug.current}
  }`)

  return res
}

export const fetchTopicSitemap = async () => {
  const res = await sanityQuery(groq`*[_type == "topic"]{
    "slug": slug.current,
    _createdAt,
    _updatedtAt,
  }`)

  return res
}

// # Term Queries
export const fetchTerms = async () => {
  const res = await sanityQuery(groq`*[_type == "term"]{
    _id,
    title,
    description,
    "slug": slug.current
  }`)
  return res
}

export const fetchTermByID = async (ref: string) => {
  const res = await sanityQuery(groq`*[_type == "term" && _id == "${ref}"][0]{
    title,
    "slug": slug.current
  }`)
  return res
}

export const fetchTermBySlug = async (slug: string) => {
  const res = await sanityQuery(groq`*[_type == "term" && slug.current == "${slug}"][0]{
    title,
    description,
    content
  }`)
  return res
}

export const fetchTermSitemap = async () => {
  const res = await sanityQuery(groq`*[_type == "term"]{
    "slug": slug.current,
    _created,
    _updatedAt
  }`)
  return res
}