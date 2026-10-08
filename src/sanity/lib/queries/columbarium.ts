import {defineQuery} from 'next-sanity'

export const COLUMBARIUM_PAGE_QUERY = defineQuery(`
  *[_id == "columbariumPage"][0]{
    eyebrow,
    title,
    heroSubtitle,
    heroImage,
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

// Minimal projection for the homepage teaser — only what's needed there,
// not the full document.
export const COLUMBARIUM_TEASER_QUERY = defineQuery(`
  *[_id == "columbariumPage"][0]{
    eyebrow,
    title,
    heroImage,
    "introduction": introduction[0...1],
    locationDescription
  }
`)
