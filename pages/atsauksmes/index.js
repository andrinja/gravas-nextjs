import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import ReviewDescriptions from "../../static/data/reviews/reviews";
import Review from "../../components/review/Review";
import { TR_NS } from '../../constants/translationNamespace';
import getServerSideTranslations from '../../utils/getServerSideTranslations';


const ReviewsPage = () => {

  return (
    <Layout
      title="Atsauksmes | Gravas"
      description="Gravas pirts rituāla atsauksmes no klientiem."
    >
      <PageHeaderImage
        imgsrc="/static/guesthouse/viesu-majas-atsauksmes.jpg?webp?lqip"
        alt="Gravas pļavā pie rata. Kāzu fotostūra idejas"
      />
      <PageHeader
        title="Viesu atsauksmes"
        description="Kopš 2011. gada esam ieviesuši viesu grāmatu pirts rituāla viesiem. Katra atsauksme mums ļauj apskatīties uz savu ieguldīto darbu no cita skatupunta kā arī iedvesmo attīstīties uz priekšu."
      />
      <Review reviews={ReviewDescriptions} />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await getServerSideTranslations(
			locale,
			[TR_NS.NAVBAR]
		),
	},
})

export default ReviewsPage;
