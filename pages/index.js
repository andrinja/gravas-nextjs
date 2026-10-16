import Layout from "../components/Layout";
import PageHeaderImage from "../components/page-header-image/PageHeaderImage";
import ExploreCards from "../components/explore-cards/ExploreCards";
import { Descriptions } from "../components/page-descriptions/PageDescriptions";
import cards from "../static/data/index-page/exploreCards";
import serviceDescriptions from "../static/data/index-page/serviceDescriptions";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
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
        imgsrc="/static/home/gravas-atputa-bauska.jpg"
        alt={t('home_hero_alt')}
      />
      <Descriptions descriptions={serviceDescriptions} translationNamespace={TR_NS.SERVICE_DESCRIPTIONS} />
    </Layout>
  );
}

// Was getServerSideProps, which rendered the home page on every request for
// content that only changes at build time. Static now, like every other page.
export async function getStaticProps({locale}) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				[TR_NS.EXPLORE_CARDS, TR_NS.SERVICE_DESCRIPTIONS, TR_NS.NAVBAR, TR_NS.PAGES]
			))
		},
	}
}
