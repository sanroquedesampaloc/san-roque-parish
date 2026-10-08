import {defineField, defineType} from 'sanity'

export const columbariumFaq = defineType({
  name: 'columbariumFaq',
  title: 'Columbarium FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      description:
        'A clear, parish-confirmed answer. Do not guess at prices, eligibility, reservation process, payment schedules, or ownership/transfer rules — leave the question out entirely until the parish has confirmed the answer.',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'question'},
  },
})
