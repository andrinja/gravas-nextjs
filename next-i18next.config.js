const path = require('path')

module.exports = {
	i18n: {
		defaultLocale: 'lv',
		locales: ['ru', 'en', 'lv'],
		localeDetection: false,
		localePath: path.resolve('./public/locales')
	},
};