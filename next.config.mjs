/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.facebook.com',
      },
      {
        protocol: 'https',
        hostname: '**.twitter.com',
      },
      {
        protocol: 'https',
        hostname: '**.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.stripe.com',
      },
      {
        protocol: 'https',
        hostname: '**.paypal.com',
      },
      {
        protocol: 'https',
        hostname: '**.google.com',
      },
      {
        protocol: 'https',
        hostname: '**.googletagmanager.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.google-analytics.com',
      },
      {
        protocol: 'https',
        hostname: '**.googlesyndication.com',
      },
      {
        protocol: 'https',
        hostname: '**.doubleclick.net',
      },
      {
        protocol: 'https',
        hostname: '**.googlevideo.com',
      },
      {
        protocol: 'https',
        hostname: '**.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.slack.org',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
        {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.dev.to',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: '**.magentosite.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.strapi.io',
      },
      {
        protocol: 'https',
        hostname: '**.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.directus.io',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlab.com',
      },
      {
        protocol: 'https',
        hostname: '**.gitlabassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.bitbucket.org',
      },
      {
        protocol: 'https',
        hostname: '**.atlassian.net',
      },
      {
        protocol: 'https',
        hostname: '**.jira.com',
      },
      {
        protocol: 'https',
        hostname: '**.jira.org',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.com',
      },
      {
        protocol: 'https',
        hostname: '**.confluence.org',
      },
      {
        protocol: 'https',
        hostname: '**.trello.com',
      },
      {
        protocol: 'https',
        hostname: '**.trello.org',
      },
      {
        protocol: 'https',
        hostname: '**.slack.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.com',
      },
      {
        protocol: 'https',
        hostname: '**.discord.org',
      },
      {
        protocol: 'https',
