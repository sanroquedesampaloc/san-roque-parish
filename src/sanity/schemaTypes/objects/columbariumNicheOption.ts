import {defineField, defineType} from 'sanity'

export const columbariumNicheOption = defineType({
  name: 'columbariumNicheOption',
  title: 'Niche / Memorial Option',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'e.g. "Wall Niche", "Family Niche".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'A short, respectful description. Optional.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Upload the corresponding Small or Large Family Niche photograph.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'type',
      title: 'Type / Capacity',
      description: 'e.g. "Individual", "Couple", "Family". Optional.',
      type: 'string',
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Availability Note',
      description:
        'Plain-language availability info, only if the parish office has confirmed it (e.g. "Limited niches remain" or "Please inquire with the parish office"). This is not a live inventory count — do not guess or imply real-time availability.',
      type: 'string',
    }),
    defineField({
      name: 'priceNote',
      title: 'Price Information',
      description:
        'Only enter pricing the parish has explicitly confirmed for public posting. Phrase it as information, not a promotion (e.g. "₱XX,XXX — inquire for current details"), and leave blank rather than guess.',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'type', media: 'image'},
  },
})
