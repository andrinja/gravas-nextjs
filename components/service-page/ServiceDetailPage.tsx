import Layout from '../Layout';
import PageHeaderImage from '../page-header-image/PageHeaderImage';
import ServiceHeader from '../service-header/ServiceHeader';
import HighlightCards from '../highlight-cards/HighlightCards';
import { Descriptions } from '../page-descriptions/PageDescriptions';
import Amenities from '../amenities/Amenities';
import Employee from '../employee/Employee';
import ExtraDetails from '../extra-details/ExtraDetails';
import PriceTags from '../price-tags/PriceTags';
import Footer from '../footer/footer';
import EmployeeDetails from '../../static/data/employees/employees.json';
import { useT } from '../../lib/useT';
import type { SectionDescriptor } from '../../lib/sections/registry';
import type { ServiceItem } from '../../lib/sections/schema';

type Props = {
	section: SectionDescriptor;
	item: ServiceItem;
};

/** The detail page shared by all three sections' [slug] routes. */
export const ServiceDetailPage = ({ section, item }: Props) => {
	const ns = section.contentNs;
	const t = useT(ns);

	return (
		<Layout title={t(item.metaTitle)} description={t(item.metaDescription)}>
			<PageHeaderImage imgsrc={item.img} alt={t(item.alt)} />
			<ServiceHeader title={t(item.title)} />
			<HighlightCards highlights={item.highlights} translationNamespace={ns} />
			<Descriptions descriptions={item.descriptions} translationNamespace={ns} />
			<Amenities
				amenities={item.amenities}
				title={item.whatIsIncludedTitle}
				translationNamespace={ns}
			/>
			{section.showsEmployee && <Employee employee={EmployeeDetails} />}
			<ExtraDetails
				details={item.extraDetails}
				title={item.considerTitle}
				translationNamespace={ns}
			/>
			<PriceTags
				prices={item.allPrices}
				title={item.allPriceTitle}
				translationNamespace={ns}
			/>
			<Footer />
		</Layout>
	);
};

export default ServiceDetailPage;
