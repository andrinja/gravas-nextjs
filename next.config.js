const { i18n } = require('./next-i18next.config');
const legacyRedirects = require('./redirects');

// Next.js only needs these i18n keys; localePath is for next-i18next
const { defaultLocale, locales, localeDetection } = i18n;

// Removed in the P1 cleanup:
//   next-offline          — incompatible with Next 13 / webpack 5 (mkdirp API changed).
//                           The orphaned public/service-worker.js is dealt with in P10.
//   next-optimized-images — unmaintained since 2020 and inert here: it only transformed
//                           webpack-imported images, and this codebase has none. Its
//                           `?webp?lqip` URL suffixes lingered in static/data/** until
//                           the Next 16 upgrade, when next/image began rejecting query
//                           strings on local images (images.localPatterns).

module.exports = {
	// Pin the workspace root: a stray package-lock.json in $HOME otherwise makes
	// Turbopack guess the root one directory too high and warn on every build.
	turbopack: { root: __dirname },

	i18n: { defaultLocale, locales, localeDetection },

	images: {
		// AVIF first, WebP for browsers without it. Photos go through
		// /_next/image, so the originals under public/static are only ever
		// fetched by the optimizer.
		formats: ['image/avif', 'image/webp'],
		// How long optimized variants stay in the image cache (and the
		// Cache-Control max-age they are served with). The source photos
		// change a few times a year at most.
		minimumCacheTTL: 60 * 60 * 24 * 31,
	},

	async redirects() {
		return legacyRedirects.map(({ from, to }) => ({
			source: from,
			destination: to,

			// No `locale: false` here. With i18n configured, Next matches each
			// source under every locale and carries the locale into the
			// destination, so one unprefixed rule covers /x.php, /en/x.php and
			// /ru/x.php. Setting locale:false makes Next compare against the
			// internally locale-prefixed path instead, which silently breaks
			// every unprefixed source — verified: the seven default-locale rules
			// 404'd while the hand-written /en and /ru ones passed.

			// Deliberately 307, not 308. These have never worked, so nothing
			// depends on them yet; a wrong permanent redirect is cached by
			// browsers essentially forever and cannot be retracted. Verify the
			// full set against production, then flip to permanent: true.
			permanent: false,
		}));
	},

	async headers() {
		return [
			{
				// Photos, icons and favicons under public/static. Next serves
				// public/ with max-age=0 by default, which made every image a
				// revalidation on every visit. These files are not
				// content-hashed, so this is a month, not a year: replacing a
				// photo under the same name takes effect within 31 days.
				source: '/static/:file(.*\\.(?:jpg|jpeg|png|webp|avif|svg|ico))',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=2678400, stale-while-revalidate=604800' },
				],
			},
			{
				// Keep the service-worker tombstone (P10) from being cached, so
				// browsers that still have the old worker installed pick up the
				// unregistering one promptly.
				source: '/service-worker.js',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
					{ key: 'Service-Worker-Allowed', value: '/' },
				],
			},
		];
	},
};
