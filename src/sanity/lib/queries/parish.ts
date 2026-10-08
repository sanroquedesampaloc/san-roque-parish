import {defineQuery} from 'next-sanity'

export const PARISH_SETTINGS_QUERY = defineQuery(`
  *[_id == "parishSettings"][0]{
    parishName,
    shortDescription,
    address,
    phone,
    email,
    officeHours,
    sundayMassSchedule,
    weekdayMassSchedule,
    saturdayMassSchedule,
    confessionSchedule,
    liveStream,
    facebookUrl,
    youtubeUrl,
    messengerUrl,
    googleMapsUrl,
    googleMapsEmbedUrl,
    givingInfo,
    footerInfo
  }
`)

// Deliberately minimal — fetched on its own short-revalidate path (see
// src/lib/liveStreamFetch.ts) so the Live Mass feature stays fresh without
// making the rest of the homepage/parishSettings data dynamic too.
export const LIVE_STREAM_QUERY = defineQuery(`
  *[_id == "parishSettings"][0]{
    liveStream,
    facebookUrl
  }
`)

export const CLERGY_LIST_QUERY = defineQuery(`
  *[_type == "clergy"] | order(order asc) {
    _id,
    name,
    position,
    photo,
    biography,
    order
  }
`)

export const MINISTRIES_LIST_QUERY = defineQuery(`
  *[_type == "ministry"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    image,
    description,
    coordinator,
    contactInfo,
    meetingSchedule,
    order
  }
`)

export const SACRAMENTS_LIST_QUERY = defineQuery(`
  *[_type == "sacrament"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    introduction,
    requirements,
    schedule,
    contactGuidance,
    documents,
    order
  }
`)
