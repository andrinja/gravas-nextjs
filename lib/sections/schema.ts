/**
 * Shape of the three service data files, which are byte-for-byte identical in
 * structure: static/data/{sauna-rituals/saunaRituals, guesthouse/guesthouse,
 * sport-activities/sportActivities}.json.
 *
 * Every string below is an i18n KEY, not display copy — the JSON holds keys,
 * slugs and image paths only. The one exception is `img`, a real URL path.
 */

/** An i18n key, resolved against a section's content namespace. */
export type TranslationKey = string;

/**
 * An icon token as it appears in the data. May carry a legacy ".svg" suffix,
 * which is meaningless — these resolve to .js React components.
 * components/icons/Icon.tsx normalises it.
 */
export type IconToken = string;

export interface IconCaptionItem {
	icon: IconToken;
	label: TranslationKey;
	caption: TranslationKey;
}

export interface DescriptionItem {
	id?: string;
	label: TranslationKey;
	text: TranslationKey;
}

export interface ExtraDetailItem {
	title: TranslationKey;
	details: TranslationKey;
}

export interface PriceItem {
	icon: IconToken;
	title: TranslationKey;
	forPerson: TranslationKey;
	/** Present on ritual prices only; absent on 45 of the 63 price entries. */
	additionalPerson?: TranslationKey;
	totalPrice: TranslationKey;
}

export interface ServiceItem {
	id: string;
	/** Doubles as the slug source: underscores become hyphens. */
	title: TranslationKey;
	priceTitle: TranslationKey;
	priceFrom: TranslationKey;
	img: string;
	alt: TranslationKey;
	metaTitle: TranslationKey;
	metaDescription: TranslationKey;
	considerTitle: TranslationKey;
	allPriceTitle: TranslationKey;
	whatIsIncludedTitle: TranslationKey;
	highlights: IconCaptionItem[];
	amenities: IconCaptionItem[];
	descriptions: DescriptionItem[];
	extraDetails: ExtraDetailItem[];
	allPrices: PriceItem[];
}

/**
 * The single definition of the title -> slug rule. It previously existed in
 * four places: utils/getPaths.js, ServiceCard.js, and inverted in each of the
 * three [slug].js pages.
 */
export const slugOf = (item: Pick<ServiceItem, 'title'>): string =>
	item.title.replace(/_/g, '-');

/** Inverse of slugOf, for resolving a route param back to a data record. */
export const titleFromSlug = (slug: string): string => slug.replace(/-/g, '_');
