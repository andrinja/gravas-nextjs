import { useState } from "react";
import Router from "next/router";
import Button from "../button/button";
import { BottomItems, ModalItems } from "./style";
import Modal from "react-responsive-modal";
import howToReserveDetails from "../../static/data/contacts/howToReserve";
import PhoneIcon from "../../components/icons/Phone";
import EmailIcon from "../../components/icons/Mail";
import GiftCardIcon from "../../components/icons/GiftCard";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
	const {t} = useTranslation(TR_NS.HOW_TO_RESERVE);
  return (
    <BottomItems>
      <Button
        onClick={() => Router.push("/davanu-karte")}
        type="button"
        buttonStyle="btn--secondary--solid"
        buttonColor="btn--primary"
      >
        <GiftCardIcon style={{ fontSize: "28px" }}></GiftCardIcon>
      </Button>

      <Button
        onClick={() => setIsModalOpen(true)}
        type="button"
        buttonStyle="btn--primary--outline"
      >
		{t(howToReserveDetails.reserveButtonText)}
		</Button>
      <Modal center open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalItems>
          <h2>{t(howToReserveDetails.title)}</h2>
          <p>{t(howToReserveDetails.text)}</p>
          <div className="contacts">
            <PhoneIcon style={{ color: "#1E514B", fontSize: "36px" }} />
            <a className="contact-detail" href="tel:+37126647133">
              +371 26647133
            </a>
          </div>
          <div className="contacts">
            <EmailIcon style={{ color: "#1E514B", fontSize: "36px" }} />
            <a className="contact-detail" href="email:info@gravas.lv">
              info@gravas.lv
            </a>
          </div>
        </ModalItems>
      </Modal>
    </BottomItems>
  );
};

export default Footer;
