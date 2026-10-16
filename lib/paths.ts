import { i18n } from '../next-i18next.config';

/**
 * Build the { params, locale } entries getStaticPaths wants, one per locale.
 *
 * Replaces utils/getPaths.js, which hardcoded ['', 'en', 'ru'] — duplicating
 * the locale list in next-i18next.config.js and silently omitting any locale
 * added there. It also emitted legacy locale-prefixed strings ('/en/foo');
 * Next normalises those, but the { params, locale } form is the documented one.
 */
export function localePaths<P extends Record<string, string>>(
	paramsList: P[]
): { params: P; locale: string }[] {
	return paramsList.flatMap(params =>
		(i18n.locales as string[]).map(locale => ({ params, locale }))
	);
}
