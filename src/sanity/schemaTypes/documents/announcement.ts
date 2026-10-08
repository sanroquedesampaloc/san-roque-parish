import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The headline shown on the News page and at the top of the article.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the title — this becomes part of the article\'s web address. Avoid changing it after the article is published and shared.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A short 1–2 sentence summary shown on news cards. Optional but recommended.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'Shown on the News page and at the top of the article. Landscape photos work best.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Briefly describe the image for screen readers and search engines, e.g. "Parishioners gathered for Simbang Gabi."',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'The full announcement text.',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Helps readers filter announcements by type on the News page.',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Liturgical', value: 'liturgical'},
          {title: 'Community', value: 'community'},
          {title: 'Youth', value: 'youth'},
          {title: 'Outreach', value: 'outreach'},
        ],
        layout: 'radio',
      },
      initialValue: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      description: 'Controls the date shown and the article\'s sort order. Defaults to now — adjust if backdating.',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Featured announcements may be highlighted more prominently on the homepage.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      description: 'Archived announcements are removed from the public News page but kept here for record.',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'featuredImage'},
  },
})
