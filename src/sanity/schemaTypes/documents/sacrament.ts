import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const sacrament = defineType({
  name: 'sacrament',
  title: 'Sacrament',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The sacrament\'s name, e.g. "Baptism", "Confirmation", "Holy Matrimony".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the name — this becomes part of the page\'s web address.',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      description: 'A brief, welcoming overview of the sacrament.',
      type: 'blockContent',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      description:
        'Enter only requirements the parish office has confirmed as current and accurate. Do not guess, copy from another parish, or leave outdated requirements in place — incorrect requirements can cause real problems for parishioners.',
      type: 'blockContent',
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule / Instructions',
      description: 'Recurring schedule or instructions for this sacrament, e.g. when Baptisms are held or how to request an appointment.',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
    }),
    defineField({
      name: 'contactGuidance',
      title: 'Contact Guidance',
      description: 'Who to contact and how, e.g. "Visit the parish office at least one month in advance."',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'documents',
      title: 'Downloadable Documents',
      description: 'Downloadable forms related to this sacrament, if any.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'file',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Document Title',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the order sacraments are listed in. Lower numbers appear first.',
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
    select: {title: 'name'},
  },
})
