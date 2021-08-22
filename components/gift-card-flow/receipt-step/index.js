import Step from "../step";
import { withTranslation } from "../../../i18n";
import styled from "@emotion/styled";
import Button from "../../../components/button/button";
import Router from "next/router";
import Image from "next/image";

const ReceiptBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 5rem;
  }

  h3 {
    padding: 1rem 0;
  }

  button {
    margin: 1rem 0;
  }
`;
const ReceiptStep = ({ title, contactEmail, t }) => {
  return (
    <Step title={title}>
      <ReceiptBox>
        <Image src="/static/receipt-icon.png" alt="" />
        <h3>{t("thank_you_for_purchase")}</h3>
        <p id="gift_card_sent_to_email">
          {t("gift_card_sent_to_email", { contactEmail })}
        </p>
        <Button
          onClick={() => Router.push("/")}
          type="button"
          buttonStyle="btn--primary--solid"
        >
			{t("back_to_home")}
		</Button>
      </ReceiptBox>
    </Step>
  );
};

export default withTranslation("gift_cards")(ReceiptStep);
