import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import RitualHighlightCards from "../../components/highlight-cards/RitualHighlightCards";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import RitualAmenities from "../../components/amenities/RitualAmenities";
import Employee from "../../components/employee/Employee";
import RitualExtraDetails from "../../components/extra-details/RitualExtraDetails";
import RitualPriceTags from "../../components/pricesTags/RitualPriceTags";
import Footer from "../../components/footer/footer";
import EmployeeDetails from "../../static/data/employees/employees";
import saunaRituals from "../../static/data/sauna-rituals/saunaRituals";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';
import { getPaths } from '../../utils/getPaths';

const translationNamespaces = [TR_NS.SAUNA_RITUALS, TR_NS.SAUNA_RITUALS_HEADER, TR_NS.NAVBAR, TR_NS.EMPLOYEES, TR_NS.HOW_TO_RESERVE]
const SaunaRitualPage = () => {

  const {t} = useTranslation(TR_NS.SAUNA_RITUALS);
  const router = useRouter();
  const { slug } = router.query;
  const title = slug.replace(/-/g, "_");
  const saunaRitual = saunaRituals.find(ritual => ritual.title === title);

  if (!saunaRitual) {
		return null;
  }

  return (
    <Layout
      title={t(saunaRitual.metaTitle)}
      description={t(saunaRitual.metaDescription)}
    >
      <PageHeaderImage imgsrc={saunaRitual.img} alt={t(saunaRitual.alt)} />
      <ServiceHeader title={t(saunaRitual.title)} />
      <RitualHighlightCards highlights={saunaRitual.highlights} />
      <Descriptions descriptions={saunaRitual.descriptions} translationNamespace="sauna_rituals" />
      <RitualAmenities
        amenities={saunaRitual.amenities}
        title={saunaRitual.whatIsIncludedTitle}
      />
      <Employee employee={EmployeeDetails} />
      <RitualExtraDetails
        details={saunaRitual.extraDetails}
        title={saunaRitual.considerTitle}
      />
      <RitualPriceTags
        prices={saunaRitual.allPrices}
        title={saunaRitual.allPriceTitle}
      />
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {

	return {
		paths: getPaths(saunaRituals, 'pirts-rituali'),
		fallback: false,
	}
  }

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, translationNamespaces),
	},
})

export default SaunaRitualPage;
