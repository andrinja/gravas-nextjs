import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import GiftCardRequest from "../../components/gift-card-request/GiftCardRequest";
import giftCardHeader from "../../static/data/index-page/giftcardHeader";
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';

const steps = ["form_gift_card", "payment_confirmation", "receive_gift_card_in_mail"];

const Index = () => {
	const {t} = useTranslation(TR_NS.GIFT_CARDS);
	return (
	<Layout
		title={t(giftCardHeader.metaTitle)}
		description={t(giftCardHeader.metaDescription)}
	>
    <PageHeaderImage
      imgsrc="/static/gift-card/gift-card-header.jpg"
      alt={t(giftCardHeader.alt)}
      title={t(giftCardHeader.title)}
    />
    <PageHeader description={t(giftCardHeader.description)} />
    <section aria-labelledby="gift-steps" style={{ maxWidth: '44rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '0.5rem 0 1rem' }}>
      <h2 id="gift-steps" style={{ fontSize: '1.75rem' }}>{t("gift_card_how_to_purchase")}</h2>
      <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem', color: '#3E4B48' }}>
        {steps.map(step => <li key={step}>{t(step)}</li>)}
      </ol>
    </section>
    <GiftCardRequest />
  </Layout>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, [TR_NS.GIFT_CARDS, TR_NS.NAVBAR]),
	},
})

export default Index;
