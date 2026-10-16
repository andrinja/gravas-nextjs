import Layout from "../../components/Layout";
import PageHeader from "../../components/page-header/PageHeader";
import ContactsText from "../../static/data/contacts/contacts";
import Contacts from "../../components/contacts/contacts";
import FAQ from "../../components/frequent-questions";
import contactHeader from "../../static/data/contacts/contactHeaders";
import faqData from "../../static/data/contacts/faq";
import FaqHeader from "../../components/faq-header/style";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { faqPage } from '../../lib/seo/structuredData';

const ContactsPage = () => {
	const {t} = useTranslation(TR_NS.CONTACTS);
	const { t: tFaq } = useTranslation(TR_NS.FREQUENT_QUESTIONS);

	// Every question on the page, flattened across the tabs, as FAQPage
	// structured data so the answers can show under the search result.
	const faqJsonLd = faqPage(
		faqData.flatMap(tab =>
			tab.questions.map(({ label, answer }) => ({ question: tFaq(label), answer: tFaq(answer) }))
		)
	);

  return (
    <Layout
      title={t(contactHeader.metaTitle)}
      description={t(contactHeader.metaDescription)}
      jsonLd={[faqJsonLd]}
    >
      {/* No hero photo on this page, so the title is the h1 here. */}
      <PageHeader
        level="h1"
        title={t(contactHeader.headerTitle)}
        description={t(contactHeader.headerDescription)}
      />
      <Contacts contactsText={ContactsText} />
      <FaqHeader>{t(contactHeader.frequentQuestionsTitle)}</FaqHeader>
      <FAQ />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, [TR_NS.CONTACTS, TR_NS.FREQUENT_QUESTIONS, TR_NS.NAVBAR]),
	},
  })

export default ContactsPage;
