import ServiceIndexPage from '../../components/service-page/ServiceIndexPage';
import { SECTIONS } from '../../lib/sections/registry';
import { sectionIndexStaticProps } from '../../lib/sections/serverProps';

const SECTION = SECTIONS.guesthouse;

export default function Page({ items }) {
	return <ServiceIndexPage section={SECTION} items={items} />;
}

export const getStaticProps = sectionIndexStaticProps(SECTION.key);
