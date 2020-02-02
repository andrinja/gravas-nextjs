import { useState } from "react";
import Router from "next/router";
import Button from "../button/button";
import { BottomItems, ModalItems } from "./style";
import Modal from "react-responsive-modal";
import howToReserveDetails from "../../static/data/contacts/howToReserve";
import { withTranslation } from "../../i18n";
import PhoneIcon from "../../components/icons/Phone";
import EmailIcon from "../../components/icons/Mail";

const Footer = ({ t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BottomItems>
      <Button
        onClick={() => Router.push("/davanu-karte")}
        type="button"
        buttonStyle="btn--secondary--solid"
        buttonColor="btn--primary"
        icon="gift-card"
      />

      <Button
        onClick={() => setIsModalOpen(true)}
        type="button"
        buttonStyle="btn--primary--outline"
        children={t(howToReserveDetails.reserveButtonText)}
      />

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

export default withTranslation("how_to_reserve")(Footer);
