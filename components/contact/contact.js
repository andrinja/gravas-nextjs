import Button from "../button/button";
import { Item, Details } from "./style";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const Contact = ({ icon, href, contact, buttonText}) => {
  const iconName = toCapitalCase(icon);
  const Icon = dynamic(() => import(`../icons/${iconName}`));
  const {t} = useTranslation(TR_NS.CONTACTS);
  return (
    <Item>
      <Details>
        <Icon style={{ color: "#1E514B", fontSize: "28px" }} />
		<a
			className="contact-detail"
			target="_blank"
			rel="noreferrer"
			href={`${href}${contact}`}>
          {contact}
        </a>
      </Details>
      <a
        className="buttonLink"
        target="_blank"
        rel="noreferrer"
        href={`${href}${contact}`}
      >
        <Button
          type="button"
          buttonStyle="btn--primary--outline"
        >
			{t(buttonText)}
		</Button>
      </a>
    </Item>
  );
};

export default Contact;
