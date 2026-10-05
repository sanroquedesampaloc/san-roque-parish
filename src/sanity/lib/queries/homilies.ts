import {defineQuery} from 'next-sanity'

export const LATEST_HOMILY_QUERY = defineQuery(`
  *[_type == "homily"] | order(date desc) [0] {
    _id,
    title,
    "slug": slug.current,
    date,
    celebrant,
    thumbnail,
    description,
    liturgicalOccasion
  }
`)

export const HOMILIES_LIST_QUERY = defineQuery(`
  *[_type == "homily"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    celebrant,
    thumbnail,
    description,
    liturgicalOccasion
  }
`)

export const HOMILY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "homily" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    celebrant,
    videoUrl,
    thumbnail,
    description,
    liturgicalOccasion
  }
`)
