const path = require('path')

module.exports = {
	i18n: {
		defaultLocale: 'lv_LV',
		locales: ['ru_RU', 'en_US', 'lv_LV'],
		localeDetection: false,
		localePath: path.resolve('./public/locales'),
	},
};