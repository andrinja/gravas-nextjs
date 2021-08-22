import Layout from "../../components/Layout";
import PageHeader from "../../components/page-header/PageHeader";
import ContactsText from "../../static/data/contacts/contacts";
import Contacts from "../../components/contacts/contacts";
import FAQ from "../../components/frequent-questions";
import contactHeader from "../../static/data/contacts/contactHeaders";
import FaqHeader from "./style";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactsPage = () => {
	const {t} = useTranslation(TR_NS.CONTACTS);
  return (
    <Layout
      title={t(contactHeader.metatTitle)}
      description={t(contactHeader.metaDescription)}
    >
      <PageHeader
        title={t(contactHeader.headerTitle)}
        description={t(contactHeader.headerDescription)}
      />
      <Contacts contacts={ContactsText} />
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
