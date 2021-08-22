import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import SaunaRitualsDescription from "../../static/data/sauna-rituals/saunaRituals";
import SaunaRitualsHeaderText from "../../static/data/index-page/saunaRitualsHeader";
import Cards from '../../components/service-cards/style';
import { TR_NS } from '../../constants/translationNamespace';
import { ServiceCard } from '../../components/service-card/ServiceCard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const translationNamespaces = [TR_NS.SAUNA_RITUALS, TR_NS.SAUNA_RITUALS_HEADER, TR_NS.NAVBAR]

const SaunaRitualsPage = () => {
	const { t } = useTranslation(TR_NS.SAUNA_RITUALS_HEADER)
  return (
    <Layout
      title={t(SaunaRitualsHeaderText.metaTitle)}
      description={t(SaunaRitualsHeaderText.metaDescription)}
    >
      <PageHeaderImage
        imgsrc="/static/sauna-rituals/pirts-rituali-kopa.jpg?webp?lqip"
        alt={t(SaunaRitualsHeaderText.alt)}
      />
      <PageHeader
        title={t(SaunaRitualsHeaderText.title)}
        description={t(SaunaRitualsHeaderText.description)}
      />
	<Cards>
		{SaunaRitualsDescription.map(serviceCard => (
			<ServiceCard
				key={serviceCard.id}
				prefix="pirts-rituali"
				{...serviceCard}
				translationNamespace={TR_NS.SAUNA_RITUALS}/>
		))}
	</Cards>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, translationNamespaces),
	},
})

export default SaunaRitualsPage;
