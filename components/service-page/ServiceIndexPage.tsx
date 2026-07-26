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
			<PageHeaderImage imgsrc={section.indexHero} alt={t(headerKeys.alt)} />
			<PageHeader title={t(headerKeys.title)} description={t(headerKeys.description)} />
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
