import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import ReviewDescriptions from "../../static/data/reviews/reviews";
import Review from "../../components/review/Review";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';

const ReviewsPage = () => {
  const { t } = useTranslation(TR_NS.PAGES);

  return (
    <Layout
      title={t('reviews_meta_title')}
      description={t('reviews_meta_description')}
    >
      <PageHeaderImage
        imgsrc="/static/guesthouse/viesu-majas-atsauksmes.jpg"
        alt={t('reviews_hero_alt')}
      />
      <PageHeader
        title={t('reviews_header_title')}
        description={t('reviews_header_description')}
      />
      {/* The reviews themselves are guest testimonials in the language they
          were written in, and stay untranslated on purpose. Only the page
          chrome above is localisable. */}
      <Review reviews={ReviewDescriptions} />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(
			locale,
			[TR_NS.NAVBAR, TR_NS.PAGES]
		),
	},
})

export default ReviewsPage;
