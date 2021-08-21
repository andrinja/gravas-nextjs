import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import GuesthouseHighlightCards from "../../components/highlight-cards/GuesthouseHighlightCards";
import guestHouseServices from "../../static/data/guesthouse/guesthouse";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import GuesthouseAmenities from "../../components/amenities/GuesthouseAmenities";
import GuesthouseExtraDetails from "../../components/extra-details/GuesthouseExtraDetails";
import GuesthousePriceTags from "../../components/pricesTags/GuesthousePriceTags";
import Footer from "../../components/footer/footer";
import getServerSideTranslations from '../../utils/getServerSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';
import { getPaths } from '../../utils/getPaths';

const GuesthousePage = () => {
  const router = useRouter();
  const { t } = useTranslation(TR_NS.GUESTHOUSE)
  const { slug } = router.query;
  const title = slug.replace(/\-/g, "_");
  const guesthouseService = guestHouseServices.find(
    guesthouse => guesthouse.title === title
  );

  return (
    <Layout
      title={t(guesthouseService.metaTitle)}
      description={t(guesthouseService.metaDescription)}
    >
      <PageHeaderImage
        imgsrc={guesthouseService.img}
        alt={t(guesthouseService.alt)}
      />
      <ServiceHeader title={t(guesthouseService.title)} />
      <GuesthouseHighlightCards highlights={guesthouseService.highlights} />
      <Descriptions descriptions={guesthouseService.descriptions} translationNamespace={TR_NS.GUESTHOUSE} />
      <GuesthouseAmenities
        amenities={guesthouseService.amenities}
        title={guesthouseService.whatIsIncludedTitle}
      />
      <GuesthouseExtraDetails
        details={guesthouseService.extraDetails}
        title={guesthouseService.considerTitle}
      />
      <GuesthousePriceTags
        prices={guesthouseService.allPrices}
        title={guesthouseService.allPriceTitle}
      />
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {

	return {
	   paths: getPaths(guestHouseServices, 'viesu-maja'),
	  fallback: false,
	}
  }


export const getStaticProps = async ({ locale }) => ({
	props: {
		...await getServerSideTranslations(locale, [TR_NS.NAVBAR, TR_NS.GUESTHOUSE, TR_NS.HOW_TO_RESERVE]),
	},
})


export default GuesthousePage;
