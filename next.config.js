// for custom advanced behaviour of Next.js

const withOptimizedImages = require("next-optimized-images");
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const withOffline = require("next-offline");

const localeSubpaths = {
  en: 'en',
  ru: 'ru',
}

const nextConfig = {
  workboxOpts: {
    swDest: '../public/service-worker.js',
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};

module.exports = withOffline(withOptimizedImages(nextConfig));
