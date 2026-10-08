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
    pricingInfo,
    reservationTerms,
    inquirySteps,
    inquiryNote,
    visitingHours,
    accessibilityNotes,
    contactNumbers,
    gallery,
    faqs,
    additionalNotes
  }
`)
