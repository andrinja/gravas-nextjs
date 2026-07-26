import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import HighlightCards from "../../components/highlight-cards/HighlightCards";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import Amenities from "../../components/amenities/Amenities";
import ExtraDetails from "../../components/extra-details/ExtraDetails";
import PriceTags from "../../components/price-tags/PriceTags";
import sportActivities from "../../static/data/sport-activities/sportActivities";
import Footer from "../../components/footer/footer";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPaths } from '../../utils/getPaths';

const SportActivityPage = () => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
  const router = useRouter();
  const { slug } = router.query;
  const title = slug.replace(/-/g, "_");
  const activity = sportActivities.find(
    sportActivity => sportActivity.title === title
  );

  return (
    <Layout
      title={t(activity.metaTitle)}
      description={t(activity.metaDescription)}
    >
      <PageHeaderImage imgsrc={activity.img} alt={t(activity.alt)} />
      <ServiceHeader title={t(activity.title)} />
      <HighlightCards highlights={activity.highlights} translationNamespace={TR_NS.SPORT_ACTIVITIES} />
      <Descriptions descriptions={activity.descriptions} translationNamespace={TR_NS.SPORT_ACTIVITIES} />
      <Amenities
        amenities={activity.amenities}
        title={activity.whatIsIncludedTitle}
        translationNamespace={TR_NS.SPORT_ACTIVITIES}
      />
      <ExtraDetails
        details={activity.extraDetails}
        title={activity.considerTitle}
        translationNamespace={TR_NS.SPORT_ACTIVITIES}
      />
      <PriceTags
        prices={activity.allPrices}
        title={activity.allPriceTitle}
        translationNamespace={TR_NS.SPORT_ACTIVITIES}
      />
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {
	return {
		paths: getPaths(sportActivities, 'aktiva-atputa'),
		fallback: false,
	}
  }

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, [TR_NS.NAVBAR, TR_NS.SPORT_ACTIVITIES]),
	},
})


export default SportActivityPage;
