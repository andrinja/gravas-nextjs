import { useState } from "react";
import ActiveLink from "../ActiveLink";
import NavItem from "../nav-item/NavItem";
import { Nav, NavItems, Divider, SelectItems } from "./style";
import { useTranslation } from 'next-i18next';
import MenuIcon from "../../components/icons/Menu";
import CloseIcon from "../../components/icons/Close";
import ArrowDownIcon from "../../components/icons/ArrowDown";
import Image from 'next/image'

const LanguageSelect = () => {
	const { i18n } = useTranslation()

	console.log({ i18n})

  return (
    <SelectItems>
      <ArrowDownIcon className="icon" style={{ fontSize: "24px" }} />
      <select
        onChange={async event => {
			console.log((await i18n.changeLanguage(event.target.value))())
        }}
      >
        <option value="lv_LV">Latviešu</option>
        <option value="ru_RU">Pусский</option>
        <option value="en_US">English</option>
      </select>
    </SelectItems>
  );
};

export default function Navbar() {
const { t } = useTranslation('navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav>
      <div className="logo-items">
        <ActiveLink activeClassName="active" href="/">
          <Image width={160} height={28} className="gravas-logo" src="/static/logo.svg" alt="gravas logo" />
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
}
