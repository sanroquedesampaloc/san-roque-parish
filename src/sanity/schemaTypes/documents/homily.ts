import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const homily = defineType({
  name: 'homily',
  title: 'Homily',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The homily title, e.g. the Sunday or feast it was given for.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the title — this becomes part of the homily\'s web address.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'The date the homily was given. Determines sort order and the date shown to visitors.',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'celebrant',
      title: 'Celebrant',
      description: 'Name of the priest who gave the homily, if known. Optional.',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'A YouTube or Facebook video link, if a recording is available. Leave blank if there\'s no video — the homily can still be listed with text only.',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'Shown on the Homilies list. Optional — a neutral placeholder is shown automatically if left blank.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'A short summary or key takeaway. Optional.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'liturgicalOccasion',
      title: 'Liturgical Occasion',
      description: 'e.g., "Third Sunday of Advent", "Solemnity of All Saints". Optional.',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'thumbnail'},
  },
})
