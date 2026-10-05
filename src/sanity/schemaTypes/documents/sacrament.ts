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
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'blockContent',
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule / Instructions',
      type: 'array',
      of: [defineArrayMember({type: 'scheduleEntry'})],
    }),
    defineField({
      name: 'contactGuidance',
      title: 'Contact Guidance',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'documents',
      title: 'Downloadable Documents',
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
