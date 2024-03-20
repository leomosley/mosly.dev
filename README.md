# My Boring Portfolio
This is just a simple static site porfolio I built with NextJS. The design is heavily influenced Somewhat new to Next but I feel as if im getting a grip of it now. 
This site provides some info on me, showcases some of my projects, and is the platform on which I post my blogs [(here)](https://www.leomosley.com/blog). 

The projects showcased are simply just the GitHub repos which I have given the topic `showcase` - they're fetched using the GitHub api. 

All the blogs are stored in my [blogs repo](https://github.com/leomosley/blogs) and as of now to add a blog I just add a markdown file to the repo and then physically update the `blogs` list in [`blogs/index.ts`](/blogs/index.ts). The content of the blog is fetched using the [this](https://raw.githubusercontent.com/leomosley/leomosley/main/README.md) api.