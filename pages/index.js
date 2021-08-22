import Layout from "../components/Layout";
import PageHeaderImage from "../components/page-header-image/PageHeaderImage";
import ExploreCards from "../components/explore-cards/ExploreCards";
import { Descriptions } from "../components/page-descriptions/PageDescriptions";
import cards from "../static/data/index-page/exploreCards";
import serviceDescriptions from "../static/data/index-page/serviceDescriptions";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TR_NS } from '../constants/translationNamespace';

export default function Index() {
  return (
    <Layout
      title="Pirts rituāls | Naktsmītnes | Gravas"
      description="Pirts rituāls ir atpūta ķermenim un prātam vairāku stundu garumā. Naktsmītnes pēc pirts rituāla ir pieejamas ikvienam. Viesu māja piedāvā telpas svinībām, kooperatīviem pasākumiem, kāzām vai atpūtai ar ģimeni un naktsmītnes. Organizējam skolēnu ekskursijas skolniekiem kā peintbols, loka šaušana."
    >
      <ExploreCards cards={cards} />
      <PageHeaderImage
        imgsrc="/static/home/gravas-atputa-bauska.jpg?webp?lqip"
        alt="Atpūta laukos pie dabas Bauska"
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
				[TR_NS.EXPLORE_CARDS, TR_NS.SERVICE_DESCRIPTIONS, TR_NS.NAVBAR]
			))
		},
	}
}
