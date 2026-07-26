import ServiceDetailPage from '../../components/service-page/ServiceDetailPage';
import { SECTIONS } from '../../lib/sections/registry';
import {
	sectionDetailStaticPaths,
	sectionDetailStaticProps,
} from '../../lib/sections/serverProps';

const SECTION = SECTIONS.guesthouse;

export default function Page({ item }) {
	return <ServiceDetailPage section={SECTION} item={item} />;
}

export const getStaticPaths = sectionDetailStaticPaths(SECTION.key);
export const getStaticProps = sectionDetailStaticProps(SECTION.key);
