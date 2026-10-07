import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const parishSettings = defineType({
  name: 'parishSettings',
  title: 'Parish Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'schedules', title: 'Schedules'},
    {name: 'social', title: 'Social & Links'},
    {name: 'other', title: 'Other'},
  ],
  fields: [
    // General
    defineField({
      name: 'parishName',
      title: 'Parish Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),

    // Contact
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'contact',
    }),

    // Schedules
    defineField({
      name: 'sundayMassSchedule',
      title: 'Sunday Mass Schedule',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),
    defineField({
      name: 'weekdayMassSchedule',
      title: 'Weekday Mass Schedule',
      description: 'Monday–Friday Masses only. Use Saturday Mass Schedule below for Saturday.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),
    defineField({
      name: 'saturdayMassSchedule',
      title: 'Saturday Mass Schedule',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),
    defineField({
      name: 'confessionSchedule',
      title: 'Confession Schedule',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),

    // Social & Links
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'messengerUrl',
      title: 'Messenger URL',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      description: 'Link to the parish on Google Maps (used for "Get Directions")',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      description: 'Embed URL from Google Maps (Share → Embed a map → copy the src attribute)',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),

    // Other
    defineField({
      name: 'givingInfo',
      title: 'Giving Information',
      type: 'blockContent',
      group: 'other',
    }),
    defineField({
      name: 'footerInfo',
      title: 'Footer Information',
      type: 'blockContent',
      group: 'other',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Parish Settings'}
    },
  },
})
