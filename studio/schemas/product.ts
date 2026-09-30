import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Product Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'brand', title: 'Brand', type: 'string' }),
    defineField({ name: 'size', title: 'Size / Volume', type: 'string' }),
    defineField({ name: 'asin', title: 'ASIN', type: 'string' }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'detailedDescription', title: 'Detailed Description', type: 'text', rows: 6 }),
    defineField({
      name: 'keyInfo',
      title: 'Key Information Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'merchantProductUrl', title: 'Merchant / Amazon Product URL (Source)', type: 'url' }),
    defineField({
      name: 'affiliateUrl',
      title: 'Amazon Affiliate URL (Special Link)',
      type: 'url',
      description: 'Populated with your official Amazon Associates tracking link when active.',
    }),
    defineField({ name: 'affiliateLink', title: 'Legacy Affiliate Link (Fallback)', type: 'url' }),
    defineField({ name: 'price', title: 'Reference Price (Optional)', type: 'number' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({ name: 'demo', title: 'Demo / Sample Flag', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      media: 'image',
    },
  },
});
