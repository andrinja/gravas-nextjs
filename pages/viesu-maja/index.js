import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import GuesthouseDescription from "../../static/data/guesthouse/guesthouse";
import GeneralDescription from "../../static/data/index-page/guesthouseHeader";
import { TR_NS } from '../../constants/translationNamespace';
import getServerSideTranslations from '../../utils/getServerSideTranslations';import Cards from '../../components/service-cards/style';
import { ServiceCard } from '../../components/service-card/ServiceCard';
import { useTranslation } from 'next-i18next';

const GuestHouseServicesPage = () => {
	const { t } = useTranslation(TR_NS.GUESTHOUSE_HEADER)
	return (
		<Layout
			title={t(GeneralDescription.metaTitle)}
			description={t(GeneralDescription.metaDescription)}
		>
			<PageHeaderImage
				imgsrc="/static/guesthouse/skats-uz-viesu-maju.jpg?webp?lqip"
				alt={t(GeneralDescription.alt)}
			/>
			<PageHeader
				title={t(GeneralDescription.title)}
				description={t(GeneralDescription.description)}
			/>
			<Cards>
			{GuesthouseDescription.map(serviceCard => (
					<ServiceCard
						key={serviceCard.id}
						prefix="viesu-maja"
						{...serviceCard}
						translationNamespace={TR_NS.GUESTHOUSE}
					/>
				))}
			</Cards>
		</Layout>
	)
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await getServerSideTranslations(locale, [TR_NS.GUESTHOUSE_HEADER, TR_NS.GUESTHOUSE, TR_NS.NAVBAR]),
	},
  })

export default GuestHouseServicesPage;
