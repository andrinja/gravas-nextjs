import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import giftCardHeader from "../../static/data/index-page/giftcardHeader";
import Button from "../../components/button/button";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';

const Index = () => {
	const {t} = useTranslation(TR_NS.GIFT_CARDS);
	return (
	<Layout
		title={t(giftCardHeader.metaTitle)}
		description={t(giftCardHeader.metaDescription)}
	>
    <PageHeaderImage
      imgsrc="/static/gift-card/gift-card-header.jpg?webp?lqip"
      alt={t(giftCardHeader.alt)}
    />
    <div>
      <PageHeader
        title={t(giftCardHeader.title)}
        description={t(giftCardHeader.description)}
      />
      <h4>{t("gift_card_how_to_purchase")}</h4>
		<ul style={{
			margin: '1rem 1.5rem'
		}}>
        <li>{t("form_gift_card")}</li>
        <li>{t("payment_confirmation")}</li>
        <li>{t("receive_gift_card_in_mail")}</li>
      </ul>
      <div>
        <a
			className="buttonLink"
			target="_blank"
			rel="norefferer noreferrer"
			href={`mailto:`}
			style={{
				textDecoration: 'none'
			}}
        >
          <Button
            type="button"
            buttonStyle="btn--primary--outline"
          >
			{t("write_email")}
		</Button>
        </a>
      </div>
    </div>
  </Layout>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale),
	},
})

export default Index;
