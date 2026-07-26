const { i18n } = require('./next-i18next.config');

// Next.js only needs these i18n keys; localePath is for next-i18next
const { defaultLocale, locales, localeDetection } = i18n;

// Removed in the P1 cleanup:
//   next-offline          — incompatible with Next 13 / webpack 5 (mkdirp API changed).
//                           The orphaned public/service-worker.js is dealt with in P10.
//   next-optimized-images — unmaintained since 2020 and inert here: it only transforms
//                           webpack-imported images, and this codebase has none. The
//                           `?webp?lqip` suffixes in static/data/** are plain query
//                           strings no loader ever saw; they are left alone on purpose
//                           because they are part of the next/image src URLs.

module.exports = {
	i18n: { defaultLocale, locales, localeDetection },
};
