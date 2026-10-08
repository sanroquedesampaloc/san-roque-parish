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
    {name: 'livestream', title: 'Live Stream'},
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
      description:
        'A one- or two-sentence introduction shown on the homepage and About page. Keep it short and welcoming.',
      type: 'text',
      rows: 3,
      group: 'general',
    }),

    // Contact
    defineField({
      name: 'address',
      title: 'Address',
      description: 'The parish\'s full mailing/street address, as it should appear publicly.',
      type: 'text',
      rows: 2,
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      description: 'The main parish office phone number, shown in the footer and Contact page.',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      description: 'The main parish office email address. Used for display only — form submissions are configured separately by the developer.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      description:
        'When the parish office is open to visitors/calls. One entry is usually enough (e.g. label "Office Hours", time "Mon–Fri, 8:00 AM – 5:00 PM"); add more rows only if hours differ by day.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'contact',
    }),

    // Schedules
    defineField({
      name: 'sundayMassSchedule',
      title: 'Sunday Mass Schedule',
      description:
        'Every recurring Sunday Mass time. Add one row per Mass time (e.g. 7:00 AM, 9:00 AM). Only use the Note field for details that apply every week — not for a single date like Easter.',
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
      description: 'Recurring Saturday Masses, including Anticipated/Vigil Mass if applicable.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),
    defineField({
      name: 'confessionSchedule',
      title: 'Confession Schedule',
      description: 'When Confession/Reconciliation is regularly available.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
      group: 'schedules',
    }),

    // Live Stream
    defineField({
      name: 'liveStream',
      title: 'Live Stream',
      description:
        'Workflow: start the Facebook Live broadcast, paste its public URL below, enable, and publish. When Mass ends, disable and publish — the website switches back to the offline message automatically.',
      type: 'liveStream',
      group: 'livestream',
    }),

    // Social & Links
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      description: 'Link to the parish\'s official Facebook Page. Leave blank if none.',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      description: 'Link to the parish\'s official YouTube channel, if one exists. Leave blank if none.',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'messengerUrl',
      title: 'Messenger URL',
      description: 'A Facebook Messenger link (e.g. m.me/yourpage) for quick contact, if desired. Leave blank if none.',
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
      description:
        'How parishioners can give (e.g. envelope giving, bank transfer, GCash). Enter only methods and account details the parish has confirmed and approved for public posting — do not guess or add placeholder financial details.',
      type: 'blockContent',
      group: 'other',
    }),
    defineField({
      name: 'footerInfo',
      title: 'Footer Information',
      description: 'Short text shown in the site footer, e.g. a blessing or a one-line parish note.',
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
