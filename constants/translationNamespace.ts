/**
 * The i18n namespaces that actually exist on disk under public/locales/<locale>/.
 *
 * Kept in sync by hand — if you add a namespace here, add the JSON file for
 * every locale in public/locales/, and vice versa. Anything listed here that
 * has no backing file loads as an empty namespace and silently falls back to
 * `common`, which is how the GALLERY entry went unnoticed.
 *
 * `as const` is load-bearing: it gives each value a literal type, so a
 * section descriptor can be typed as `'sauna_rituals' | 'guesthouse' |
 * 'sport_activities'` rather than widening to `string`. That is what turns a
 * typo like TR_NS.SPORTS_ACTIVITIES into a compile error instead of an
 * `undefined` that quietly resolves against the wrong namespace.
 */
export const TR_NS = {
	COMMON: 'common',
	NAVBAR: 'navbar',

	SAUNA_RITUALS: 'sauna_rituals',
	SAUNA_RITUALS_HEADER: 'sauna_rituals_header',
	GUESTHOUSE: 'guesthouse',
	GUESTHOUSE_HEADER: 'guesthouse_header',
	SPORT_ACTIVITIES: 'sport_activities',
	SPORT_ACTIVITIES_HEADER: 'sport_activities_header',

	SERVICE_DESCRIPTIONS: 'service_descriptions',
	EXPLORE_CARDS: 'explore_cards',
	GIFT_CARDS: 'gift_cards',
	CONTACTS: 'contacts',
	FREQUENT_QUESTIONS: 'frequent_questions',
	EMPLOYEES: 'employees',
	HOW_TO_RESERVE: 'how_to_reserve',
} as const;

export type TranslationNamespace = (typeof TR_NS)[keyof typeof TR_NS];

/** The three per-section content namespaces, as a type. */
export type SectionContentNamespace =
	| typeof TR_NS.SAUNA_RITUALS
	| typeof TR_NS.GUESTHOUSE
	| typeof TR_NS.SPORT_ACTIVITIES;
