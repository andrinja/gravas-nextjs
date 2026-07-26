import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import HighlightCards from "../../components/highlight-cards/HighlightCards";
import guestHouseServices from "../../static/data/guesthouse/guesthouse";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import Amenities from "../../components/amenities/Amenities";
import ExtraDetails from "../../components/extra-details/ExtraDetails";
import PriceTags from "../../components/price-tags/PriceTags";
import Footer from "../../components/footer/footer";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';
import { getPaths } from '../../utils/getPaths';

const GuesthousePage = () => {
  const router = useRouter();
  const { t } = useTranslation(TR_NS.GUESTHOUSE)
  const { slug } = router.query;
  const title = slug.replace(/-/g, "_");
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
      <HighlightCards highlights={guesthouseService.highlights} translationNamespace={TR_NS.GUESTHOUSE} />
      <Descriptions descriptions={guesthouseService.descriptions} translationNamespace={TR_NS.GUESTHOUSE} />
      <Amenities
        amenities={guesthouseService.amenities}
        title={guesthouseService.whatIsIncludedTitle}
        translationNamespace={TR_NS.GUESTHOUSE}
      />
      <ExtraDetails
        details={guesthouseService.extraDetails}
        title={guesthouseService.considerTitle}
        translationNamespace={TR_NS.GUESTHOUSE}
      />
      <PriceTags
        prices={guesthouseService.allPrices}
        title={guesthouseService.allPriceTitle}
        translationNamespace={TR_NS.GUESTHOUSE}
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
		...await serverSideTranslations(locale, [TR_NS.NAVBAR, TR_NS.GUESTHOUSE, TR_NS.HOW_TO_RESERVE]),
	},
})


export default GuesthousePage;
