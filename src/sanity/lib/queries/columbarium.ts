import {defineQuery} from 'next-sanity'

export const COLUMBARIUM_PAGE_QUERY = defineQuery(`
  *[_id == "columbariumPage"][0]{
    eyebrow,
    title,
    heroSubtitle,
    introduction,
    introductionImage,
    locationDescription,
    generalInformation,
    availabilityNote,
    nicheOptions,
    inquirySteps,
    inquiryNote,
    visitingHours,
    accessibilityNotes,
    gallery,
    faqs,
    additionalNotes
  }
`)
