const withOptimizedImages = require("next-optimized-images");
const { i18n } = require('./next-i18next.config');

// Next.js only needs these i18n keys; localePath is for next-i18next
const { defaultLocale, locales, localeDetection } = i18n;

// next-offline removed: incompatible with Next.js 13/Webpack 5 (mkdirp API changed)
// For PWA/offline support, consider migrating to Serwist

const nextConfig = {
	i18n: { defaultLocale, locales, localeDetection },
};

module.exports = withOptimizedImages(nextConfig);
