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
      description:
        'Only identify the row when it says something the section heading doesn\'t already — e.g. "Monday – Friday" or "First Friday" under a Weekday Mass section. If a row is just the ordinary Mass for that section, leave the label as-is or match the section name; it will be hidden automatically on the public site so it doesn\'t repeat the heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description:
        'The actual recurring time(s) for this Mass or service, e.g. "7:00 AM, 9:00 AM, 5:00 PM". This should be a time that repeats every week — not a one-time date.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description:
        'Optional supporting detail about this recurring Mass, e.g. "Sacred Heart Devotion after Mass", "Filipino Mass", "Benediction follows". Do NOT use this field for one-time dates or feasts (e.g. "Easter Sunday", "Christmas Day") — a note here repeats every week, so a one-time occasion entered here will display permanently. One-time schedules belong on the Events page instead.',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'time'},
  },
})
