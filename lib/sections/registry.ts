import { TR_NS } from '../../constants/translationNamespace';
import saunaRitualsHeader from '../../static/data/index-page/saunaRitualsHeader.json';
import guesthouseHeader from '../../static/data/index-page/guesthouseHeader.json';
import sportActivitiesHeader from '../../static/data/index-page/sportActivitiesHeader.json';
import type { TranslationKey } from './schema';

/**
 * The three service sections, described as data.
 *
 * This module is CLIENT-SAFE: strings only, no service JSON. The bulk data
 * lives in ./data.ts, which must only ever be imported from getStaticProps /
 * getStaticPaths, so Next's next_ssg transform can drop it from the client
 * bundle. Today the full 24.8 KB saunaRituals.json ships to the browser on
 * every one of the seven ritual detail pages.
 */

export const SECTION_KEYS = ['rituals', 'guesthouse', 'activities'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export interface SectionHeaderKeys {
	title: TranslationKey;
	description: TranslationKey;
	alt: TranslationKey;
	metaTitle: TranslationKey;
	metaDescription: TranslationKey;
}

export interface SectionDescriptor {
	key: SectionKey;
	/**
	 * URL prefix. Latvian and SEO-frozen — NEVER change these. The legacy .php
	 * redirects, the sitemap and every inbound link depend on the exact strings.
	 */
	prefix: 'pirts-rituali' | 'viesu-maja' | 'aktiva-atputa';
	/** Namespace for service content: titles, amenities, prices, extra details. */
	contentNs: typeof TR_NS.SAUNA_RITUALS | typeof TR_NS.GUESTHOUSE | typeof TR_NS.SPORT_ACTIVITIES;
	/** Namespace for the index page's hero copy. */
	headerNs:
		| typeof TR_NS.SAUNA_RITUALS_HEADER
		| typeof TR_NS.GUESTHOUSE_HEADER
		| typeof TR_NS.SPORT_ACTIVITIES_HEADER;
	headerKeys: SectionHeaderKeys;
	indexHero: string;
	/** Only the ritual section renders the pirtniece block. */
	showsEmployee: boolean;
	indexNamespaces: readonly string[];
	detailNamespaces: readonly string[];
}

export const SECTIONS: Record<SectionKey, SectionDescriptor> = {
	rituals: {
		key: 'rituals',
		prefix: 'pirts-rituali',
		contentNs: TR_NS.SAUNA_RITUALS,
		headerNs: TR_NS.SAUNA_RITUALS_HEADER,
		headerKeys: saunaRitualsHeader,
		indexHero: '/static/sauna-rituals/pirts-rituali-kopa.jpg',
		showsEmployee: true,
		indexNamespaces: [TR_NS.SAUNA_RITUALS, TR_NS.SAUNA_RITUALS_HEADER, TR_NS.NAVBAR],
		// SAUNA_RITUALS_HEADER was loaded here too, but the detail page never
		// uses it — dropped.
		// SAUNA_RITUALS_HEADER is back: the breadcrumb JSON-LD names the section.
		// COMMON carries the gallery link label.
		detailNamespaces: [
			TR_NS.SAUNA_RITUALS,
			TR_NS.SAUNA_RITUALS_HEADER,
			TR_NS.NAVBAR,
			TR_NS.EMPLOYEES,
			TR_NS.HOW_TO_RESERVE,
			TR_NS.COMMON,
		],
	},
	guesthouse: {
		key: 'guesthouse',
		prefix: 'viesu-maja',
		contentNs: TR_NS.GUESTHOUSE,
		headerNs: TR_NS.GUESTHOUSE_HEADER,
		headerKeys: guesthouseHeader,
		indexHero: '/static/guesthouse/skats-uz-viesu-maju.jpg',
		showsEmployee: false,
		indexNamespaces: [TR_NS.GUESTHOUSE_HEADER, TR_NS.GUESTHOUSE, TR_NS.NAVBAR],
		detailNamespaces: [TR_NS.NAVBAR, TR_NS.GUESTHOUSE, TR_NS.GUESTHOUSE_HEADER, TR_NS.HOW_TO_RESERVE, TR_NS.COMMON],
	},
	activities: {
		key: 'activities',
		prefix: 'aktiva-atputa',
		contentNs: TR_NS.SPORT_ACTIVITIES,
		headerNs: TR_NS.SPORT_ACTIVITIES_HEADER,
		headerKeys: sportActivitiesHeader,
		indexHero: '/static/sport-activities/laukums.jpg',
		showsEmployee: false,
		indexNamespaces: [TR_NS.SPORT_ACTIVITIES_HEADER, TR_NS.SPORT_ACTIVITIES, TR_NS.NAVBAR],
		// HOW_TO_RESERVE added: this page renders <Footer/>, which translates
		// against it. Its absence made the footer button render the raw key
		// `how_to_reserve_title` after hydration, and threw a hydration error.
		detailNamespaces: [TR_NS.NAVBAR, TR_NS.SPORT_ACTIVITIES, TR_NS.SPORT_ACTIVITIES_HEADER, TR_NS.HOW_TO_RESERVE, TR_NS.COMMON],
	},
};

export const SECTION_LIST: SectionDescriptor[] = SECTION_KEYS.map(k => SECTIONS[k]);
