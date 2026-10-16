import Head from 'next/head';
import { useRouter } from 'next/router';
import { i18n } from '../../next-i18next.config';

// The apex host is what Vercel serves; www.gravas.lv answers with a redirect
// to it. Canonical and hreflang URLs must name the final host, not the one
// that redirects, or search engines index the redirect target under a
// different canonical than the page declares.
export const SITE_URL = 'https://gravas.lv';

const LOCALES = i18n.locales as string[];
const DEFAULT_LOCALE = i18n.defaultLocale as string;

/** Absolute URL for a path in a given locale. The default locale is unprefixed. */
export function localeUrl(path: string, locale: string): string {
	const clean = path === '/' ? '' : path;
	return locale === DEFAULT_LOCALE
		? `${SITE_URL}${clean}` || `${SITE_URL}/`
		: `${SITE_URL}/${locale}${clean}`;
}

type JsonLd = Record<string, unknown>;

type Props = {
	title: string;
	description?: string;
	/** Page-specific share image path, e.g. a service photo. Defaults to the home hero. */
	image?: string;
	/** Structured data objects, one <script type="application/ld+json"> each. Null entries are skipped. */
	jsonLd?: (JsonLd | null)[];
	/** Keep the page out of search results (thin pages such as gallery lightboxes). */
	noindex?: boolean;
};

/**
 * All head metadata for a page: title, description, canonical, hreflang
 * alternates, Open Graph and JSON-LD.
 *
 * The hreflang set is derived from i18n.locales, the same source the sitemap
 * uses, so the two cannot disagree — Search Console reports errors on both
 * when they do.
 */
export const Seo = ({ title, description, image, jsonLd = [], noindex = false }: Props) => {
	const { asPath, locale } = useRouter();
	// strip query/hash so the canonical is stable
	const path = (asPath || '/').split(/[?#]/)[0];
	const current = locale || DEFAULT_LOCALE;
	const canonical = localeUrl(path, current);
	const shareImage = `${SITE_URL}${image || '/static/home/gravas-atputa-bauska.jpg'}`;

	return (
		<Head>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
			{noindex && <meta name="robots" content="noindex, follow" />}

			<link rel="canonical" href={canonical} />
			{LOCALES.map(l => (
				<link key={l} rel="alternate" hrefLang={l} href={localeUrl(path, l)} />
			))}
			<link rel="alternate" hrefLang="x-default" href={localeUrl(path, DEFAULT_LOCALE)} />

			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="Gravas" />
			<meta property="og:locale" content={current} />
			<meta property="og:title" content={title} />
			{description && <meta property="og:description" content={description} />}
			<meta property="og:url" content={canonical} />
			<meta property="og:image" content={shareImage} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			{description && <meta name="twitter:description" content={description} />}
			<meta name="twitter:image" content={shareImage} />

			{jsonLd.filter(Boolean).map((data, i) => (
				<script
					key={`ld-${i}`}
					type="application/ld+json"
					// JSON.stringify output is safe inside a script element except
					// for "</script>"; the replace guards against that.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
				/>
			))}
		</Head>
	);
};

export default Seo;
