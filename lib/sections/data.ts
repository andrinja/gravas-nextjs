import saunaRituals from '../../static/data/sauna-rituals/saunaRituals.json';
import guesthouse from '../../static/data/guesthouse/guesthouse.json';
import sportActivities from '../../static/data/sport-activities/sportActivities.json';
import type { SectionKey } from './registry';
import type { ServiceItem } from './schema';

/**
 * SERVER ONLY. Import this from getStaticProps / getStaticPaths and nowhere
 * else — never from a component. Keeping the JSON out of the module graph that
 * the page component reaches is what lets Next's next_ssg transform strip it
 * from the client bundle.
 */
export const SECTION_DATA: Record<SectionKey, ServiceItem[]> = {
	rituals: saunaRituals as ServiceItem[],
	guesthouse: guesthouse as ServiceItem[],
	activities: sportActivities as ServiceItem[],
};
