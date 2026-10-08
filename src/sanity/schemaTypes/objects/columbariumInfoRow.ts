import {defineField, defineType} from 'sanity'

export const columbariumInfoRow = defineType({
  name: 'columbariumInfoRow',
  title: 'Info Row',
  type: 'object',
  description: 'A single labeled fact, e.g. "Reservation Fee" / "₱5,000" / "Non-refundable". Used for pricing and reservation terms — present as dignified information, not a price tag.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'e.g. "Starting Price", "Reservation Fee", "Down Payment".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      description: 'e.g. "₱100,000", "30%". Only enter parish-confirmed figures.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      description: 'Optional supporting detail, e.g. "Valid for 45 days. Non-refundable."',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
