import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { SECTIONS, type SectionKey } from './registry';
import { SECTION_DATA } from './data';
import { slugOf } from './schema';
import { localePaths } from '../paths';

/** SERVER ONLY — reaches SECTION_DATA. */

export function sectionIndexStaticProps(key: SectionKey): GetStaticProps {
	return async ({ locale }) => ({
		props: {
			...(await serverSideTranslations(locale as string, [
				...SECTIONS[key].indexNamespaces,
			])),
			items: SECTION_DATA[key],
		},
	});
}

export function sectionDetailStaticPaths(key: SectionKey): GetStaticPaths {
	return async () => ({
		paths: localePaths(SECTION_DATA[key].map(item => ({ slug: slugOf(item) }))),
		fallback: false,
	});
}

export function sectionDetailStaticProps(key: SectionKey): GetStaticProps {
	return async ({ locale, params }) => {
		const slug = String(params?.slug ?? '');
		const item = SECTION_DATA[key].find(candidate => slugOf(candidate) === slug);

		// fallback:false means getStaticPaths already enumerated every slug, so
		// this only fires if data and routes diverge. Returning notFound beats
		// the previous behaviour, where two of the three pages dereferenced the
		// result of .find() with no guard and crashed the build.
		if (!item) return { notFound: true };

		return {
			props: {
				...(await serverSideTranslations(locale as string, [
					...SECTIONS[key].detailNamespaces,
				])),
				item,
			},
		};
	};
}

export interface GalleryParent {
	href: string;
	titleKey: string;
	ns: string;
}

/**
 * A gallery belongs to the service with the same slug; the back link, the
 * title key and the namespace come from that service's section. A gallery
 * with no matching service (sporta-laukumi) falls back to its section index.
 */
export function galleryParent(slug: string): GalleryParent {
	for (const section of Object.values(SECTIONS)) {
		const item = SECTION_DATA[section.key].find(candidate => slugOf(candidate) === slug);
		if (item) {
			return { href: `/${section.prefix}/${slug}`, titleKey: item.title, ns: section.contentNs };
		}
	}
	const activities = SECTIONS.activities;
	return { href: `/${activities.prefix}`, titleKey: activities.headerKeys.title, ns: activities.headerNs };
}
