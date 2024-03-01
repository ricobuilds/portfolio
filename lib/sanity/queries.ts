import { groq } from "next-sanity";


// # ARTICLES
// # GLOSSARY
const fetchTerm = groq`*[_type == "term"]`;

export const fetchTermByID = (slug: string) => groq`*[_type == "term" && slug.current == "${slug}"][0]{
  title,
  content
}`

export const fetchTermByRef = (ref:string) => groq`*[_type == "term" && _id == "${ref}"][0]{
  title,
  "slug": slug.current
}`
// # TAGS

// Homepage - Get 3 latest articles
export const getLatestArticles = groq`*[_type == "article"] | order(_createdAt desc)[0..2]{
  _id,
  name,
  snippet,
  publishedAt,
  "slug": slug.current,
}
`

// Get all articles
export const getAllArticles = groq`*[_type == "article"] | order(publishedAt desc){
  _id,
  name,
  snippet,
  publishedAt,
  "slug": slug.current,
}`

// Get 6 latest articles
export const getSixArticles = groq`*[_type == "article"] | order(publishedAt desc)[0..4]{
  _id,
  name,
  snippet,
  publishedAt,
  "slug": slug.current,
}`

// Get all topics
// export const getTopics = groq`*[_type == "tag" && count(*[_type=="article" && references(^._id)]) > 0]{
export const getTopics = groq`*[_type == "tag"]{
    _id,
    title,
    description,
    "slug": slug.current
  }`

// Get a single post by its ID
export const getArticleBySlug = (slug: string) => groq`*[_type == "article" && slug.current == "${slug}"][0]{
  name,
  snippet,
  content,
  _updatedAt,
  publishedAt,
  "tag": tag->{title, "slug": slug.current},
  "author": author->{name},
  }`;

// Get all article by author
const getArticlesByAuthor = (slug: string) => groq`*[_type == "author" && slug.current == "${slug}"][0]{
  _id,
  name,
  "image": image.asset->url,
  _updatedAt,
  bio,
  "articles": *[_type == "article" && references(^._id)]{_id, name, publishedAt, snippet,"slug": slug.current}
}`

// Get all articles by cluster
export const getArticlesByTopic = (slug: string) => groq`*[_type == "tag" && slug.current == "${slug}"][0]{
  title,
  description,
  "slug": slug.current,
  "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc) [0...10]{_id, name, publishedAt, snippet,"slug": slug.current}
}`

// Get the prev article with smaller timestamp
export const getPrevArticle = (order: string) => groq`*[_type == "article" && publishedAt < "${order}"] | order(publishedAt desc)[0]{
  "slug": slug.current
}`

// Get the nex article with bigger timestamp
export const getNextArticle = (order: string) => groq`*[_type == "article" && publishedAt > "${order}"] | order(publishedAt asc)[0]{
  "slug": slug.current
}`