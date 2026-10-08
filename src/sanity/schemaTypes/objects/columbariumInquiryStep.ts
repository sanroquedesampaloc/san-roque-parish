import {defineField, defineType} from 'sanity'

export const columbariumInquiryStep = defineType({
  name: 'columbariumInquiryStep',
  title: 'Inquiry Step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Step Title',
      description: 'e.g. "Contact the Parish Office". Only add steps that reflect the parish\'s actual, confirmed process.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
