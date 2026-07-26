const { i18n } = require('./next-i18next.config');
const legacyRedirects = require('./redirects');

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
