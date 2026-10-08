import {defineField, defineType} from 'sanity'

export const liveStream = defineType({
  name: 'liveStream',
  title: 'Live Stream',
  type: 'object',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Enable Live Stream',
      description:
        'Turn this on while the parish Facebook Live stream should appear on the website. Turn it off as soon as Mass ends — the site switches back to the offline message automatically.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Live Stream Title',
      description: 'Example: "Sunday Mass — Live".',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Live URL',
      description: 'Paste the public Facebook Live or video URL.',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'description',
      title: 'Live Stream Description',
      description: 'Optional short message shown with the livestream.',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title', active: 'isActive'},
    prepare({title, active}) {
      return {
        title: title || 'Live Stream',
        subtitle: active ? 'Enabled' : 'Off',
      }
    },
  },
})
