import Layout from "../components/Layout";
import PageHeaderImage from "../components/page-header-image/PageHeaderImage";
import ExploreCards from "../components/explore-cards/ExploreCards";
import { Descriptions } from "../components/page-descriptions/PageDescriptions";
import cards from "../static/data/index-page/exploreCards";
import serviceDescriptions from "../static/data/index-page/serviceDescriptions";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../constants/translationNamespace';

export default function Index() {
  const { t } = useTranslation(TR_NS.PAGES);
  return (
    <Layout
      title={t('home_meta_title')}
      description={t('home_meta_description')}
    >
      <ExploreCards cards={cards} />
      <PageHeaderImage
        imgsrc="/static/home/gravas-atputa-bauska.jpg?webp?lqip"
        alt={t('home_hero_alt')}
      />
      <Descriptions descriptions={serviceDescriptions} translationNamespace={TR_NS.SERVICE_DESCRIPTIONS} />
    </Layout>
  );
}

export async function getServerSideProps({locale}) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				[TR_NS.EXPLORE_CARDS, TR_NS.SERVICE_DESCRIPTIONS, TR_NS.NAVBAR, TR_NS.PAGES]
			))
		},
	}
}
