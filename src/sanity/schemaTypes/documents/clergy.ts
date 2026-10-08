import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const clergy = defineType({
  name: 'clergy',
  title: 'Clergy',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Full name as it should appear publicly, e.g. "Rev. Fr. Juan Dela Cruz".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position / Title',
      description: 'e.g., "Parish Priest", "Parochial Vicar", "Deacon".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      description: 'A professional headshot works best. Optional — a neutral placeholder is shown automatically if left blank.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      description: 'A short, parish-approved biography. Leave blank until the parish has confirmed the exact wording — do not write or guess this on their behalf.',
      type: 'blockContent',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the order clergy are listed in (e.g. Parish Priest first). Lower numbers appear first.',
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
    select: {title: 'name', subtitle: 'position', media: 'photo'},
  },
})
