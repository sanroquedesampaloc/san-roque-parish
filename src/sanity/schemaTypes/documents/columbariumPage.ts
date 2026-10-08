import {defineArrayMember, defineField, defineType} from 'sanity'
import {ArchiveIcon} from '@sanity/icons'

export const columbariumPage = defineType({
  name: 'columbariumPage',
  title: 'Columbarium Page',
  type: 'document',
  icon: ArchiveIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Information'},
    {name: 'niches', title: 'Niche Options'},
    {name: 'inquiry', title: 'Inquiry'},
    {name: 'visiting', title: 'Visiting'},
    {name: 'gallery', title: 'Gallery'},
    {name: 'faqs', title: 'FAQs'},
  ],
  fields: [
    // Hero
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Columbarium',
      group: 'hero',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'If left blank, "A Sacred Place of Remembrance" is used.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      description:
        'A short, neutral line beneath the title. If left blank, a general default is used.',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),

    // Information
    defineField({
      name: 'introduction',
      title: 'Introduction',
      description:
        'An editorial statement on the purpose of the Columbarium. Leave blank to hide this section entirely rather than publish an unconfirmed claim about the facility.',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'introductionImage',
      title: 'Introduction Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
      group: 'content',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Within the Parish',
      description: 'e.g. "Behind the main church, beside the garden." Optional.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'generalInformation',
      title: 'General Information & Guidelines',
      description:
        'Parish-confirmed facts and guidelines about the Columbarium. Omit anything not yet confirmed rather than writing "to be confirmed" placeholder text.',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'availabilityNote',
      title: 'General Availability Note',
      description:
        'A general, parish-confirmed note on availability, if the parish wants one shown. Not a live inventory count.',
      type: 'text',
      rows: 2,
      group: 'content',
    }),

    // Niche Options
    defineField({
      name: 'nicheOptions',
      title: 'Niche / Memorial Options',
      description:
        'Presented as respectful information, not as products for sale. Leave empty to hide this section.',
      type: 'array',
      of: [defineArrayMember({type: 'columbariumNicheOption'})],
      group: 'niches',
    }),

    // Inquiry
    defineField({
      name: 'inquirySteps',
      title: 'Inquiry Steps',
      description:
        'Only add steps that reflect the parish\'s actual, confirmed process for inquiries. Leave empty to show a simple "Inquire with the Parish" call to action instead of a step list.',
      type: 'array',
      of: [defineArrayMember({type: 'columbariumInquiryStep'})],
      group: 'inquiry',
    }),
    defineField({
      name: 'inquiryNote',
      title: 'Inquiry Note',
      description: 'Optional short note shown above the inquiry call to action.',
      type: 'text',
      rows: 2,
      group: 'inquiry',
    }),

    // Visiting
    defineField({
      name: 'visitingHours',
      title: 'Visiting Hours',
      description:
        'Columbarium-specific visiting hours, if they differ from general parish office hours. Leave empty to omit this row rather than invent hours.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'visiting',
    }),
    defineField({
      name: 'accessibilityNotes',
      title: 'Accessibility Notes',
      description: 'e.g. step-free access, parking guidance. Optional.',
      type: 'text',
      rows: 2,
      group: 'visiting',
    }),

    // Gallery
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Real photographs of the Columbarium only. Leave empty to hide this section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      group: 'gallery',
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Columbarium-specific questions and parish-confirmed answers. Leave empty to hide this section.',
      type: 'array',
      of: [defineArrayMember({type: 'columbariumFaq'})],
      group: 'faqs',
    }),

    defineField({
      name: 'additionalNotes',
      title: 'Additional Notes',
      description: 'Anything else the parish wants shown near the closing call to action. Optional.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Columbarium Page'}
    },
  },
})
