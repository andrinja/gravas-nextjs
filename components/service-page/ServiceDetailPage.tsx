import { useRouter } from 'next/router';
import Layout from '../Layout';
import PageHeaderImage from '../page-header-image/PageHeaderImage';
import ServiceHeader from '../service-header/ServiceHeader';
import HighlightCards from '../highlight-cards/HighlightCards';
import { Descriptions } from '../page-descriptions/PageDescriptions';
import Amenities from '../amenities/Amenities';
import Employee from '../employee/Employee';
import ExtraDetails from '../extra-details/ExtraDetails';
import PriceTags from '../price-tags/PriceTags';
import ReservationBand from '../reservation-band/ReservationBand';
import EmployeeDetails from '../../static/data/employees/employees.json';
import { useT } from '../../lib/useT';
import { localeUrl } from '../seo/Seo';
import { serviceProduct, breadcrumbs } from '../../lib/seo/structuredData';
import { slugOf } from '../../lib/sections/schema';
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
	const tHeader = useT(section.headerNs);
	const locale = useRouter().locale || 'lv';

	const url = localeUrl(`/${section.prefix}/${slugOf(item)}`, locale);

	// Price snippets in search results. `totalPrice` in the data is a literal
	// like "80 €" rather than a key, so it is locale-independent; the offer
	// name is the translated card title plus its "per person" line.
	const product = serviceProduct({
		name: t(item.title),
		description: t(item.metaDescription),
		image: item.img,
		url,
		offers: item.allPrices.map(price => ({
			name: [t(price.title), t(price.forPerson)].filter(Boolean).join(' · '),
			price: price.totalPrice,
		})),
	});

	const trail = breadcrumbs([
		{ name: 'Gravas', url: localeUrl('/', locale) },
		{ name: tHeader(section.headerKeys.title), url: localeUrl(`/${section.prefix}`, locale) },
		{ name: t(item.title), url },
	]);

	return (
		<Layout
			title={t(item.metaTitle)}
			description={t(item.metaDescription)}
			// og:image was the same home photo on all 15 detail pages; use the
			// service's own.
			image={item.img}
			jsonLd={[product, trail]}
		>
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
			{/* Was a fixed bottom bar with a modal; now an in-flow band. */}
			<ReservationBand />
		</Layout>
	);
};

export default ServiceDetailPage;
