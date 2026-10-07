import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ueb7w6y5',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

const result = await client.fetch('*[_type == "product"] | order(_createdAt asc) {_id, title, "categoryTitle": category->title, category}');
console.log(JSON.stringify(result, null, 2));
