import Layout from "../components/Layout";
import PageHeaderImage from "../components/page-header-image/PageHeaderImage";
import ExploreCards from "../components/explore-cards/ExploreCards";
import { IndexDescriptions } from "../components/page-descriptions/PageDescriptions";

import cards from "../static/data/index-page/exploreCards";
import serviceDescriptions from "../static/data/index-page/serviceDescriptions";

const Index = () => {
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
      <IndexDescriptions descriptions={serviceDescriptions} />
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ["explore_cards", "service_descriptions"]
});

export default Index;
