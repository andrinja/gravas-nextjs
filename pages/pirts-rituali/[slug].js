import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import ServiceHeader from "../../components/service-header/ServiceHeader";
import HighlightCards from "../../components/highlight-cards/HighlightCards";
import { Descriptions } from "../../components/page-descriptions/PageDescriptions";
import Amenities from "../../components/amenities/Amenities";
import Employee from "../../components/employee/Employee";
import ExtraDetails from "../../components/extra-details/ExtraDetails";
import PriceTags from "../../components/price-tags/PriceTags";
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
      <HighlightCards highlights={saunaRitual.highlights} translationNamespace={TR_NS.SAUNA_RITUALS} />
      <Descriptions descriptions={saunaRitual.descriptions} translationNamespace={TR_NS.SAUNA_RITUALS} />
      <Amenities
        amenities={saunaRitual.amenities}
        title={saunaRitual.whatIsIncludedTitle}
        translationNamespace={TR_NS.SAUNA_RITUALS}
      />
      <Employee employee={EmployeeDetails} />
      <ExtraDetails
        details={saunaRitual.extraDetails}
        title={saunaRitual.considerTitle}
        translationNamespace={TR_NS.SAUNA_RITUALS}
      />
      <PriceTags
        prices={saunaRitual.allPrices}
        title={saunaRitual.allPriceTitle}
        translationNamespace={TR_NS.SAUNA_RITUALS}
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
