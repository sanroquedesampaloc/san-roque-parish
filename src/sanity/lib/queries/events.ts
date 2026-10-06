import {defineQuery} from 'next-sanity'

export const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && status in ["upcoming", "ongoing"]]
    | order(startDate asc) {
    _id,
    title,
    "slug": slug.current,
    poster,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    featured,
    status
  }
`)

export const EVENTS_LIST_QUERY = defineQuery(`
  *[_type == "event" && status != "cancelled"] | order(startDate desc) {
    _id,
    title,
    "slug": slug.current,
    poster,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    featured,
    status
  }
`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug && status != "cancelled"][0] {
    _id,
    title,
    "slug": slug.current,
    poster,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    registrationUrl,
    featured,
    status
  }
`)
