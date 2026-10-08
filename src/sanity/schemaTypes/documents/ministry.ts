import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The ministry or organization\'s name.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the name — this becomes part of the ministry\'s web address.',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Shown alongside the ministry\'s description. Optional.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'What this ministry does and who can join.',
      type: 'blockContent',
    }),
    defineField({
      name: 'coordinator',
      title: 'Coordinator',
      description: 'Name of the ministry\'s lead/coordinator. Optional — leave blank if not applicable.',
      type: 'string',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'string',
      description: 'Phone number, email, or other contact details',
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Meeting Schedule',
      type: 'string',
      description: 'e.g., "Every Sunday after 9:00 AM Mass"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the order ministries are listed in. Lower numbers appear first.',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'coordinator', media: 'image'},
  },
})
