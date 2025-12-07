---
title: "Building This Blog"
pubDate: 2025-12-06
description: "How I rebuilt my personal website with Astro and GitHub Pages"
author: "Gabriel Selzer"
# Thanks WikiMedia!
image:
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Messier83_-_Heic1403a.jpg/1280px-Messier83_-_Heic1403a.jpg'
    alt: 'This new Hubble image shows the scatterings of bright stars and thick dust that make up spiral galaxy Messier 83, otherwise known as the Southern Pinwheel Galaxy. One of the largest and closest barred spirals to us, this galaxy is dramatic and mysterious; it has hosted a large number of supernova explosions, and appears to have a double nucleus lurking at its core.'
tags: ["astro", "meta"]
icon: "post"
---

A few months back I launched this website to document my personal and professional work. It replaced an [older personal page](/archives/old_site) from several years ago—one I'd long outgrown. I wanted something cleaner and more structured, where I could showcase my writings, talks, and other projects in one place.

## Design Goals

When rebuilding, I focused on two main priorities:

- **Low maintenance**: I'm not a frontend developer, and I didn't want to spend time wrestling with deployment pipelines or frequent updates. The site should be easy to extend with minimal overhead.
- **Open source by default**: I stuck with GitHub Pages as I'm comfortable in the GitHub ecosystem, it makes open sourcing effortless, and the deploy flow stays simple. If someone can learn from it or adapt it, that's a bonus.

## Tech Stack

The first tool I tried was [Astro](https://astro.build/), and it seemed to align well enough with my needs so I went ahead with it. Simple deploys and minimal JavaScript fit my skillset and the scope of this site.

My one lingering concern after the docs was deployment. Astro's guides push the [Netlify](https://www.netlify.com/) deployment platform, but I did not want another account, an ugly default URL, or a paid tier just to rename it. I wanted to stay on GitHub Pages, and thankfully Astro has [built-in support](https://docs.astro.build/en/guides/deploy/github/) for that path.

The deployment flow is simple: push to `master`, and GitHub Actions rebuilds the site and deploys the `dist/` folder. No servers, no databases, no configuration drift.

For styling, I leaned on [GitHub Copilot](https://github.com/features/copilot). I'm not a designer, but with Copilot's help I was able to iterate quickly on the layout and get something that looks clean without too much trial and error.

## Check It Out

The source for this site is available [on GitHub](https://github.com/gselzer/gselzer.github.io). Feel free to fork it, adapt it, or just poke around to see how it's structured. If you're building your own blog, I hope it'll give you some ideas.
