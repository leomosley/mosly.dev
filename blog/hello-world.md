---
title: Hello World
filename: hello-world.md
date: Mar 22, 2024
description: My blog debut! In this I breakdown how I made the website your using now.
---

# Heading 1

## Heading 2

## Heading 3

### Heading 4

Hello, welcome to my blog debut. Now that I have this site I thought it made sense to actually post a blog. As you can probably tell already I'm not exactly a professional writer but I promise I'll try my best. Not sure how frequently I'll be making these - but I thought I'd give it a shot.

Anyway enough waffle - what should I talk about? I guess I could talk about how I made this site. The design for this site is heavily influenced by [nexxel.dev](https://www.nexxel.dev) as I absolutely love the simplicity of the design. However, all the code for the site is my own of course. I built this static site with NextJS using Typescript and Tailwind (the only option).

My main goal of the site was to have some level of automation without the need for a database. I didn't want to be constantly updating the code every time I needed to add/remove/update the projects I had on showcase.

My solution was to just use the [Github API](https://docs.github.com/en/rest) to fetch all my repos and then somehow filter out the ones which I wanted to showcase. I had a few ideas of how I might do this but what I decided on was to just give the repos a topic of 'showcase' if I wanted to display them in the projects section. This works well as I can use the repos description and URL without having to provide it manually. Whenever I update any of the repos or add a new one to be showcased it updates instantly. Overall I'm pretty pleased with my solution for this.

As of now the blog section does not work exactly how I would like it to. I store the blogs as markdown files in a repo and fetch the raw content of the file with an API then parse it through `react-markdown` and use `@tailwindcss/typography` to format and display the content. This I don't have an issue with right now. However whenever I want to post a new blog I have to amend the `blogs` list in [`blogs/index.ts`](https://github.com/leomosley/portfolio/blob/main/blogs/index.ts). This I'm not too happy with and I'm sure at some point I will create a better solution.

I think I've said all I can about this site. So Thanks for reading if you got this far.

Note: Was thinking of possibly creating a template for this website so look out for another blog post in the near future about that.
