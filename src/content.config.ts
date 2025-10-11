// Import the glob loader
import { glob, file } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string().optional(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      icon: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string())
    })
});
const external = defineCollection({
    loader: file('src/content/external.yaml'),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string().optional(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      icon: z.string().optional(),
      tags: z.array(z.string()),
      redirect: z.string()
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog, external};