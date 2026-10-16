import Layout from "../components/Layout";
import Hero from "../components/hero/Hero";
import ExploreCards from "../components/explore-cards/ExploreCards";
import ServiceRows from "../components/service-rows/ServiceRows";
import ReservationBand from "../components/reservation-band/ReservationBand";
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
      <Hero
        imgsrc="/static/home/gravas-atputa-bauska.jpg"
        alt={t('home_hero_alt')}
        eyebrow={t('home_hero_eyebrow')}
        title={t('home_hero_title')}
        titleEm={t('home_hero_title_em')}
        lede={t('home_hero_lede')}
        primary={{ href: "/kontakti", label: t('home_hero_cta_reserve') }}
        secondary={{ href: "/pirts-rituali", label: t('home_hero_cta_rituals') }}
      />
      <ExploreCards
        cards={cards}
        title={t('home_explore_title')}
        allLabel={t('home_explore_all')}
        allHref="/pirts-rituali"
      />
      <ServiceRows rows={serviceDescriptions} translationNamespace={TR_NS.SERVICE_DESCRIPTIONS} />
      <ReservationBand />
    </Layout>
  );
}

// Static, like every other page; this used to be getServerSideProps.
export async function getStaticProps({locale}) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				[TR_NS.EXPLORE_CARDS, TR_NS.SERVICE_DESCRIPTIONS, TR_NS.NAVBAR, TR_NS.PAGES, TR_NS.HOW_TO_RESERVE]
			))
		},
	}
}
