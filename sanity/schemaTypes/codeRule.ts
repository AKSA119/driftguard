import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'codeRule',
  title: 'Code Rule',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'technology',
      title: 'Technology',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Current', value: 'current'},
          {title: 'Deprecated', value: 'deprecated'},
        ],
      },
    }),

    defineField({
      name: 'oldApi',
      title: 'Old API / Code',
      type: 'text',
    }),

    defineField({
      name: 'replacement',
      title: 'Replacement',
      type: 'text',
    }),

    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'text',
    }),

    defineField({
      name: 'sourceUrl',
      title: 'Official Source URL',
      type: 'url',
    }),

    defineField({
      name: 'lastVerified',
      title: 'Last Verified',
      type: 'datetime',
    }),
  ],
})