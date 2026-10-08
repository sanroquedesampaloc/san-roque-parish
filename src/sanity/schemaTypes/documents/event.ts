import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The event name as shown to visitors.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the title — this becomes part of the event\'s web address.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster / Featured Image',
      description: 'Shown on the Events page and the event detail page.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Briefly describe the image for screen readers and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'What visitors need to know: what to expect, who it\'s for, what to bring.',
      type: 'blockContent',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      description: 'The date the event begins. Determines whether it shows as upcoming or past.',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      description: 'Leave blank for single-day events.',
      type: 'date',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const doc = context.document as {startDate?: string} | undefined
          if (endDate && doc?.startDate && endDate < doc.startDate) {
            return 'End date must be on or after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., 7:00 AM. Optional.',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g., 9:00 AM. Optional.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Parish Church" or "Parish Hall, 2nd Floor". Keep it short enough to display on one line.',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      description: 'Link to an external registration/sign-up form, if applicable. Leave blank if registration isn\'t required.',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Featured events may be highlighted more prominently on the homepage.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      description: 'Controls how the event is labeled. Cancelled events are kept for record but clearly marked and excluded from the sitemap.',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Start Date (Newest)',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'startDate', media: 'poster'},
  },
})
