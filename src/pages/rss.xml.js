import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Gabriel Selzer\'s Blog',
    description: 'Gabriel Selzer\'s personal website.',
    site: context.site,
    items: posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.id}`,
      })),
    customData: `<language>en-us</language>`,
  });
}