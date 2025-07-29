/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '0clhhm0umusm8qjw.public.blob.vercel-storage.com',
        port: '',
        pathname: '/cards/**',
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'countryflagsapi.com',
      },
      {
        protocol: 'https',
        hostname: 'restcountries.com',
      },
      {
        protocol: 'https',
        hostname: 'flagpedia.net',
      },
      {
        protocol: 'https',
        hostname: 'www.countryflags.io',
      },
      {
        protocol: 'https',
        hostname: 'www.worldatlas.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bing.com',
      },
      {
        protocol: 'https',
        hostname: 'www.yahoo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.duckduckgo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ecosia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'www.startpage.com',
      },
      {
        protocol: 'https',
        hostname: 'www.qwant.com',
      },
      {
        protocol: 'https',
        hostname: 'www.searchencrypt.com',
      },
      {
        protocol: 'https',
        hostname: 'www.swisscows.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gibiru.com',
      },
      {
        protocol: 'https',
        hostname: 'www.metager.org',
      },
      {
        protocol: 'https',
        hostname: 'www.mojeek.com',
      },
      {
        protocol: 'https',
        hostname: 'www.yandex.com',
      },
      {
        protocol: 'https',
        hostname: 'www.baidu.com',
      },
      {
        protocol: 'https',
        hostname: 'www.naver.com',
      },
      {
        protocol: 'https',
        hostname: 'www.daum.net',
      },
      {
        protocol: 'https',
        hostname: 'www.seznam.cz',
      },
      {
        protocol: 'https',
        hostname: 'www.onet.pl',
      },
      {
        protocol: 'https',
        hostname: 'www.wp.pl',
      },
      {
        protocol: 'https',
        hostname: 'www.gazeta.pl',
      },
      {
        protocol: 'https',
        hostname: 'www.interia.pl',
      },
      {
        protocol: 'https',
        hostname: 'www.sapo.pt',
      },
      {
        protocol: 'https',
        hostname: 'www.uol.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.terra.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.globo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rediff.com',
      },
      {
        protocol: 'https',
        hostname: 'www.indiatimes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.timesofindia.indiatimes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hindustantimes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thehindu.com',
      },
      {
        protocol: 'https',
        hostname: 'www.dnaindia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.zeenews.india.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ndtv.com',
      },
      {
        protocol: 'https',
        hostname: 'www.news18.com',
      },
      {
        protocol: 'https',
        hostname: 'www.abplive.com',
      },
      {
        protocol: 'https',
        hostname: 'www.india.com',
      },
      {
        protocol: 'https',
        hostname: 'www.firstpost.com',
      },
      {
        protocol: 'https',
        hostname: 'www.moneycontrol.com',
      },
      {
        protocol: 'https',
        hostname: 'www.businesstoday.in',
      },
      {
        protocol: 'https',
        hostname: 'www.livemint.com',
      },
      {
        protocol: 'https',
        hostname: 'www.financialexpress.com',
      },
      {
        protocol: 'https',
        hostname: 'www.business-standard.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thequint.com',
      },
      {
        protocol: 'https',
        hostname: 'www.scroll.in',
      },
      {
        protocol: 'https',
        hostname: 'www.thewire.in',
      },
      {
        protocol: 'https',
        hostname: 'www.newslaundry.com',
      },
      {
        protocol: 'https',
        hostname: 'www.opindia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.swarajyamag.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mygov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.data.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.indiaimage.nic.in',
      },
      {
        protocol: 'https',
        hostname: 'www.incredibleindia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.makeinindia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.digitalindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.startupindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.investindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.skillindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.cleanindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.pmindia.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.mea.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.nic.in',
      },
      {
        protocol: 'https',
        hostname: 'www.india.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*.numo.oracle.com"],
    },
  },
};

export default nextConfig;
