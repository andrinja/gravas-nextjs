import Layout from '../Layout';
import PageHeaderImage from '../page-header-image/PageHeaderImage';
import PageHeader from '../page-header/PageHeader';
import Cards from '../service-cards/style';
import { ServiceCard } from '../service-card/ServiceCard';
import { useT } from '../../lib/useT';
import type { SectionDescriptor } from '../../lib/sections/registry';
import type { ServiceItem } from '../../lib/sections/schema';

type Props = {
	section: SectionDescriptor;
	items: ServiceItem[];
};

/** The listing page shared by /pirts-rituali, /viesu-maja and /aktiva-atputa. */
export const ServiceIndexPage = ({ section, items }: Props) => {
	const t = useT(section.headerNs);
	const { headerKeys } = section;

	return (
		<Layout title={t(headerKeys.metaTitle)} description={t(headerKeys.metaDescription)}>
			{/* The section title is the page's h1, laid over the hero. These pages
			    previously had no h1 at all (the title was an h2 under the photo). */}
			<PageHeaderImage
				imgsrc={section.indexHero}
				alt={t(headerKeys.alt)}
				title={t(headerKeys.title)}
			/>
			<PageHeader description={t(headerKeys.description)} />
			<Cards>
				{items.map(serviceCard => (
					<ServiceCard
						key={serviceCard.id}
						prefix={section.prefix}
						{...serviceCard}
						translationNamespace={section.contentNs}
					/>
				))}
			</Cards>
		</Layout>
	);
};

export default ServiceIndexPage;
