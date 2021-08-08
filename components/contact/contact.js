import Button from "../button/button";
import { Item, Details } from "./style";
import { withTranslation } from "../../i18n";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";

const Contact = ({ icon, href, contact, buttonText, t }) => {
  const iconName = toCapitalCase(icon);
  const Icon = dynamic(() => import(`../icons/${iconName}`));
  return (
    <Item>
      <Details>
        <Icon style={{ color: "#1E514B", fontSize: "28px" }} />
		<a
			className="contact-detail"
			target="_blank"
			rel="noopener"
			href={`${href}${contact}`}>
          {contact}
        </a>
      </Details>
      <a
        className="buttonLink"
        target="_blank"
        rel="noopener"
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

export default withTranslation("contacts")(Contact);
