# My Boring Portfolio

This is just a simple static site porfolio I built with NextJS. The design is heavily influenced by [nexxel.dev](https://www.nexxel.dev), really a fan of the simple sleek design. Somewhat new to Next but I feel as if im getting a grip of it now.
This site provides some info on me, showcases some of my projects, and is the platform on which I post my blogs [(here)](https://www.leomosley.com/blog).

The projects showcased are simply just the GitHub repos which I have given the topic `showcase` - they're fetched using the GitHub api.

I store my blog pages in the [blog](blog) directory and use [gray-matter](https://www.npmjs.com/package/gray-matter) to parse the content and heading information.

## Configuration

This portfolio is fully configurable through environment variables, making it easy to customize for your own use. All personal information, social links, and site metadata can be configured without touching the codebase.

### Environment Variables

Copy `.env.example` to `.env` and fill in your personal information:

```bash
cp .env.example .env
```

#### Required Variables

- **Site Configuration**
  - `NEXT_PUBLIC_DOMAIN` - Your domain name (e.g., `example.com`)
  - `NEXT_PUBLIC_SITE_DESCRIPTION` - Brief description of your site

- **GitHub Configuration**
  - `NEXT_PUBLIC_GITHUB_USERNAME` - Your GitHub username
  - `NEXT_PUBLIC_REPO_TAG` - GitHub topic tag for featured projects (e.g., `showcase`)

- **Personal Information**
  - `NEXT_PUBLIC_FULL_NAME` - Your full name
  - `NEXT_PUBLIC_FIRST_NAME` - Your first name (used in UI)

- **Social Media**
  - `NEXT_PUBLIC_LINKEDIN_USERNAME` - Your LinkedIn profile slug
  - `NEXT_PUBLIC_TWITTER_HANDLE` - Your Twitter/X handle (without @)

- **Deployment** (Optional)
  - `NEXT_PUBLIC_VERCEL_URL` - Auto-populated by Vercel

### Work Experience

To update your work experience, edit the `WORK` array in `lib/constants.ts`. The array uses environment variables for company information, so you only need to update the position, duration, and description fields.
