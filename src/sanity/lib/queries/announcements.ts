import {defineQuery} from 'next-sanity'

export const FEATURED_ANNOUNCEMENT_QUERY = defineQuery(`
  *[_type == "announcement" && featured == true && status == "active"]
    | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`)

export const ANNOUNCEMENTS_LIST_QUERY = defineQuery(`
  *[_type == "announcement" && status == "active"]
    | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    category,
    publishedAt,
    featured
  }
`)

export const ANNOUNCEMENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "announcement" && slug.current == $slug && status == "active"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    body,
    category,
    publishedAt,
    featured,
    status
  }
`)
