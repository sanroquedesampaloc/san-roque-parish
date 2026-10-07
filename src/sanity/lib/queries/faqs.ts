import {defineQuery} from 'next-sanity'

export const FAQS_LIST_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`)
