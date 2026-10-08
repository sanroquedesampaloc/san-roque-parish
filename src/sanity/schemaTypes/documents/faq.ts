import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      description: 'The question as a visitor would phrase it, e.g. "What do I need to bring for a Baptism?"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      description: 'A clear, parish-confirmed answer.',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the order FAQs are listed in. Lower numbers appear first.',
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
    select: {title: 'question'},
  },
})
