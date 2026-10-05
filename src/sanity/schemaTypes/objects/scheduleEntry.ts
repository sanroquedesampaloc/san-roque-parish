import {defineField, defineType} from 'sanity'

export const scheduleEntry = defineType({
  name: 'scheduleEntry',
  title: 'Schedule Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Sunday", "Monday – Friday", "First Friday"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., "7:00 AM, 9:00 AM, 5:00 PM"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'time'},
  },
})
