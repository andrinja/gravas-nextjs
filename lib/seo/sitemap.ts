import { i18n } from '../../next-i18next.config';
import { SECTION_LIST } from '../sections/registry';
import { SECTION_DATA } from '../sections/data';
import { slugOf } from '../sections/schema';
import { SITE_URL, localeUrl } from '../../components/seo/Seo';

/** SERVER ONLY — reaches SECTION_DATA. */

const LOCALES = i18n.locales as string[];
const DEFAULT_LOCALE = i18n.defaultLocale as string;

/** Every indexable path, locale-independent. */
export function sitemapPaths(): string[] {
	const staticPaths = ['/', '/atsauksmes', '/kontakti', '/davanu-karte'];
	const sectionIndexes = SECTION_LIST.map(s => `/${s.prefix}`);
	const details = SECTION_LIST.flatMap(s =>
		SECTION_DATA[s.key].map(item => `/${s.prefix}/${slugOf(item)}`)
	);

	// /galerijas/* is deliberately excluded: those are lightbox views of images
	// already on the parent service page, with no title, no h1 and no Layout.
	// Adding 45 thin near-duplicates would dilute rather than help.
	return [...staticPaths, ...sectionIndexes, ...details];
}

export function buildSitemap(lastmod: string): string {
	const urls = sitemapPaths().flatMap(path =>
		LOCALES.map(locale => {
			// The alternates set is derived from the same i18n.locales that
			// components/seo/Seo.tsx uses, so the sitemap and the pages cannot
			// disagree — Search Console flags both when they do.
			const alternates = [
				...LOCALES.map(
					l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(path, l)}"/>`
				),
				`    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(path, DEFAULT_LOCALE)}"/>`,
			].join('\n');

			return [
				'  <url>',
				`    <loc>${localeUrl(path, locale)}</loc>`,
				alternates,
				`    <lastmod>${lastmod}</lastmod>`,
				'  </url>',
			].join('\n');
		})
	);

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		'</urlset>',
		'',
	].join('\n');
}

export { SITE_URL };
