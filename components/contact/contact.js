import { Icon } from "../icons/Icon";
import Button from "../button/button";
import { colors } from "../theme";
import { Item, Details } from "./style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';

const Contact = ({ icon, href, contact, buttonText}) => {
  const {t} = useTranslation(TR_NS.CONTACTS);
  return (
    <Item>
      <Details>
        <Icon name={icon} style={{ color: colors.primary, fontSize: "28px" }} />
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
