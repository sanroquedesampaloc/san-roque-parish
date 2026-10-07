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
    confessionSchedule,
    facebookUrl,
    youtubeUrl,
    messengerUrl,
    googleMapsUrl,
    googleMapsEmbedUrl,
    givingInfo,
    footerInfo
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
