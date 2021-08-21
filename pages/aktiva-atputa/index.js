import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import SportActivitiesHeaderText from "../../static/data/index-page/sportActivitiesHeader";
import SportsActivitiesDescription from "../../static/data/sport-activities/sportActivities";
import Cards from '../../components/service-cards/style';
import { ServiceCard } from '../../components/service-card/ServiceCard';
import getServerSideTranslations from '../../utils/getServerSideTranslations';
import { TR_NS } from '../../constants/translationNamespace'
import { useTranslation } from 'next-i18next';

const SportActivitiesPage = () => {
	const { t } = useTranslation(TR_NS.SPORTS_ACTIVITIES_HEADER);
  return (
    <Layout
      title={t(SportActivitiesHeaderText.metaTitle)}
      description={t(SportActivitiesHeaderText.metaDescription)}
    >
      <PageHeaderImage
        imgsrc="/static/sport-activities/laukums.jpg?webp?lqip"
        alt={t(SportActivitiesHeaderText.alt)}
      />
      <PageHeader
        title={t(SportActivitiesHeaderText.title)}
        description={t(SportActivitiesHeaderText.description)}
      />
		<Cards>
		{SportsActivitiesDescription.map(serviceCard => (
			<ServiceCard
				key={serviceCard.id}
				translationNamespace={TR_NS.SPORT_ACTIVITIES}
				prefix="aktiva-atputa"
				{...serviceCard}
			/>
		))}
		</Cards>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await getServerSideTranslations(
			locale,
			[TR_NS.SPORT_ACTIVITIES_HEADER, TR_NS.SPORT_ACTIVITIES, TR_NS.NAVBAR, TR_NS.SPORTS_ACTIVITIES_HEADER]
		),
	},
})

export default SportActivitiesPage;
