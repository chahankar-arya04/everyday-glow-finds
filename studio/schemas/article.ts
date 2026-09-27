import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'demo', title: 'Demo', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
