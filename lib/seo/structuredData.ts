import { SITE_URL } from '../../components/seo/Seo';

/**
 * JSON-LD builders. Pure functions over already-translated strings, so the
 * components call them with their `t` and the result goes into <Seo jsonLd>.
 *
 * What each one buys in search results:
 *   localBusiness  — the knowledge panel (phone, address, map, socials)
 *   serviceProduct — "From 80 €" price snippets on the ritual / guesthouse /
 *                    activity detail pages (Product + AggregateOffer)
 *   faqPage        — expandable Q&A under the contacts page result
 *   breadcrumbs    — the "Gravas › Pirts rituāli › Zāļu pirts rituāls" trail
 */

export const PHONE = '+371 26647133';
export const EMAIL = 'info@gravas.lv';

export function localBusiness() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_URL}/#business`,
		name: 'Gravas',
		url: SITE_URL,
		logo: `${SITE_URL}/static/android-chrome-384x384.png`,
		image: `${SITE_URL}/static/home/gravas-atputa-bauska.jpg`,
		telephone: PHONE,
		email: EMAIL,
		priceRange: '€€',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Likverteni',
			addressLocality: 'Bauskas novads',
			addressCountry: 'LV',
		},
		// The pin from the embedded map on the contacts page.
		geo: { '@type': 'GeoCoordinates', latitude: 56.426, longitude: 24.293 },
		sameAs: [
			'https://www.instagram.com/gravasbauska/',
			'https://www.facebook.com/gravasatputa',
			'https://www.booking.com/hotel/lv/gravas',
		],
	};
}

export interface OfferInput {
	/** Display name, already translated. */
	name: string;
	/** Price in euro. Entries that do not parse to a number are dropped. */
	price: number | string;
}

export interface ServiceProductInput {
	name: string;
	description: string;
	/** Site-relative image path. */
	image: string;
	/** Absolute canonical URL of the detail page. */
	url: string;
	offers: OfferInput[];
}

/** Parse "80 €", "80,50 €" or 80 into a number; NaN when it is not a price. */
export function parsePrice(value: number | string): number {
	if (typeof value === 'number') return value;
	const match = String(value).replace(',', '.').match(/\d+(?:\.\d+)?/);
	return match ? Number(match[0]) : NaN;
}

export function serviceProduct({ name, description, image, url, offers }: ServiceProductInput) {
	const priced = offers
		.map(o => ({ name: o.name, price: parsePrice(o.price) }))
		.filter(o => Number.isFinite(o.price) && o.price > 0);
	if (priced.length === 0) return null;
	const prices = priced.map(o => o.price);

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name,
		description,
		image: [`${SITE_URL}${image}`],
		url,
		brand: { '@type': 'Brand', name: 'Gravas' },
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'EUR',
			lowPrice: Math.min(...prices),
			highPrice: Math.max(...prices),
			offerCount: priced.length,
			url,
			offers: priced.map(o => ({
				'@type': 'Offer',
				name: o.name,
				price: o.price,
				priceCurrency: 'EUR',
				availability: 'https://schema.org/InStock',
				url,
			})),
		},
	};
}

export interface QuestionAnswer {
	question: string;
	answer: string;
}

export function faqPage(items: QuestionAnswer[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map(({ question, answer }) => ({
			'@type': 'Question',
			name: question.trim(),
			acceptedAnswer: { '@type': 'Answer', text: answer.trim() },
		})),
	};
}

export interface Crumb {
	name: string;
	url: string;
}

export function breadcrumbs(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: c.url,
		})),
	};
}
