const withOptimizedImages = require("next-optimized-images");
const { i18n } = require('./next-i18next.config');

const withOffline = require("next-offline");

const nextConfig = {
	i18n,
	workboxOpts: {
    swDest: '../public/service-worker.js',
  },
};

module.exports = withOffline(withOptimizedImages(nextConfig));
