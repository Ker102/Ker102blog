import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// External article link (for Hashnode-synced posts)
			externalUrl: z.string().url().optional(),
			// Source badge label (e.g. "hashnode")
			source: z.string().optional(),
		}),
});

export const collections = { blog };
