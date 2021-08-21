import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import ActivityHighlightCards from "../../components/highlight-cards/ActivityHighlightCards";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import ActivityAmenities from "../../components/amenities/ActivityAmenities";
import ActivityExtraDetails from "../../components/extra-details/ActivityExtraDetails";
import ActivityPriceTags from "../../components/pricesTags/ActivityPriceTags";
import sportActivities from "../../static/data/sport-activities/sportActivities";
import Footer from "../../components/footer/footer";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPaths } from '../../utils/getPaths';

const SportActivityPage = () => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
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
      <ActivityHighlightCards highlights={activity.highlights} />
      <Descriptions descriptions={activity.descriptions} translationNamespace={TR_NS.SPORT_ACTIVITIES} />
      <ActivityAmenities
        amenities={activity.amenities}
        title={activity.whatIsIncludedTitle}
      />
      <ActivityExtraDetails
        details={activity.extraDetails}
        title={activity.considerTitle}
      />
      <ActivityPriceTags
        prices={activity.allPrices}
        title={activity.allPriceTitle}
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
