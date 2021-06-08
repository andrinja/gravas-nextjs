import { useState } from "react";
import ActiveLink from "../ActiveLink";
import NavItem from "../nav-item/NavItem";
import { Nav, NavItems, Divider, SelectItems } from "./style";
import { withTranslation, i18n } from "../../i18n";
import MenuIcon from "../../components/icons/Menu";
import CloseIcon from "../../components/icons/Close";
import ArrowDownIcon from "../../components/icons/ArrowDown";

const FALLBACK_LANGUAGE = "lv";

const LanguageSelect = () => {

  return (
    <SelectItems>
      <ArrowDownIcon className="icon" style={{ fontSize: "24px" }} />
      <select
        value={i18n.language}
        onChange={event => {
          i18n.changeLanguage(event.target.value);
        }}
      >
        <option value="lv">Latviešu</option>
        <option value="ru">Pусский</option>
        <option value="en">English</option>
      </select>
    </SelectItems>
  );
};

const Navbar = ({ t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav>
      <div className="logo-items">
        <ActiveLink activeClassName="active" href="/">
          <img className="gravas-logo" src="../../static/logo.svg" alt="" />
        </ActiveLink>

        {isMenuOpen ? (
          <CloseIcon
            onClick={() => setIsMenuOpen(false)}
            className="icon-close icon"
          />
        ) : (
          <MenuIcon
            onClick={() => setIsMenuOpen(true)}
            className="icon-menu icon"
          />
        )}
      </div>
      <NavItems isOpen={isMenuOpen}>
        <NavItem
          rel="preconnect"
          href="/pirts-rituali"
          label={t("pirts_rituali")}
        />
        <NavItem rel="preconnect" href="/viesu-maja" label={t("viesu_maja")} />
        <NavItem
          rel="preconnect"
          href="/aktiva-atputa"
          label={t("aktiva_atputa")}
        />
        <NavItem
          rel="preconnect"
          href="/davanu-karte"
          label={t("davanu_karte")}
        />
        <NavItem rel="preconnect" href="/atsauksmes" label={t("atsauksmes")} />
        <NavItem rel="preconnect" href="/kontakti" label={t("kontakti")} />

        <Divider />

        <LanguageSelect />
      </NavItems>
    </Nav>
  );
};

export default withTranslation("navbar")(Navbar);
