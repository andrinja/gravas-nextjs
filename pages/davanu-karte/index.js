import Layout from "../../components/Layout";
import PageHeaderImage from "../../components/page-header-image/PageHeaderImage";
import PageHeader from "../../components/page-header/PageHeader";
import { withTranslation, Link } from "../../i18n";
import giftCardHeader from "../../static/data/index-page/giftcardHeader";
import Button from "../../components/button/button";
import Router from "next/router";
import {
  ListItems,
  ButtonItems
} from "../../components/gift-card-flow/main/style.js";

const Index = ({ t }) => (
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
      <ListItems>
        <li>{t("form_gift_card")}</li>
        <li>{t("payment_confirmation")}</li>
        <li>{t("receive_gift_card_in_mail")}</li>
      </ListItems>
      <ButtonItems>
        <a
          className="buttonLink"
          target="_blank"
          rel="noopener"
          href={`mailto:`}
        >
          <Button
            type="button"
            buttonStyle="btn--primary--outline"
          >
			  {t("write_email")}
		  </Button>
        </a>
        {/*<Button
          onClick={() => Router.push("/davanu-karte/iegadaties")}
          type="button"
          buttonStyle="btn--primary--solid"
          children={t(giftCardHeader.buyGiftCard)}
        />*/}
      </ButtonItems>
    </div>
  </Layout>
);

Index.getInitialProps = async () => ({
  namespacesRequired: ["gift_cards"]
});

export default withTranslation("gift_cards")(Index);
