import { useState } from "react";
import Link from 'next/link'
import NavItem from "../nav-item/NavItem";
import { Nav, NavItems, Divider, SelectItems } from "./style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';
import MenuIcon from "../../components/icons/Menu";
import CloseIcon from "../../components/icons/Close";
import ArrowDownIcon from "../../components/icons/ArrowDown";
import Image from 'next/image'
import { useRouter } from 'next/router'

const LanguageSelect = () => {
	const { i18n } = useTranslation()
	const router = useRouter()

  return (
    <SelectItems>
      <ArrowDownIcon className="icon" aria-hidden />
      <select
		aria-label="Valoda / Language"
		value={i18n.language}
        onChange={event => {
			router.push(router.asPath, undefined, {
				locale: event.target.value
			})
        }}
      >
        <option value="lv">LV</option>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </SelectItems>
  );
};

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 8,
  cursor: 'pointer',
  minWidth: 44,
  minHeight: 44,
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Navbar() {
  const { t } = useTranslation(TR_NS.NAVBAR);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav aria-label="Galvenā izvēlne">
      <div className="logo-items">
        <Link href="/" aria-label="Gravas">
			<Image width={150} height={26} className="gravas-logo" src="/static/logo.svg" alt="Gravas" priority />
        </Link>

        {isMenuOpen ? (
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="icon-close icon"
            aria-label={t("close_menu")}
            aria-expanded="true"
            style={iconButtonStyle}
          >
            <CloseIcon aria-hidden style={{ fontSize: "24px" }} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="icon-menu icon"
            aria-label={t("open_menu")}
            aria-expanded="false"
            style={iconButtonStyle}
          >
            <MenuIcon aria-hidden style={{ fontSize: "26px" }} />
          </button>
        )}
      </div>
      <NavItems isOpen={isMenuOpen}>
        <NavItem href="/pirts-rituali" label={t("pirts_rituali")} />
        <NavItem href="/viesu-maja" label={t("viesu_maja")} />
        <NavItem href="/aktiva-atputa" label={t("aktiva_atputa")} />
        <NavItem href="/davanu-karte" label={t("davanu_karte")} />
        <NavItem href="/atsauksmes" label={t("atsauksmes")} />
        <NavItem href="/kontakti" label={t("kontakti")} />

        <Divider />

        <LanguageSelect />
      </NavItems>
    </Nav>
  );
}
