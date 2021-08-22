import { useState } from "react";
import Link from 'next/link'
import NavItem from "../nav-item/NavItem";
import { Nav, NavItems, Divider, SelectItems } from "./style";
import { useTranslation } from 'next-i18next';
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
      <ArrowDownIcon className="icon" style={{ fontSize: "24px" }} />
      <select
		value={i18n.language}
        onChange={event => {
			console.log(router)
			router.push(router.asPath, undefined, {
				locale: event.target.value
			})
        }}
      >
        <option value="lv">Latviešu</option>
        <option value="ru">Pусский</option>
        <option value="en">English</option>
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
        <Link href="/">
			<a>
			<Image width={160} height={28} className="gravas-logo" src="/static/logo.svg" alt="gravas logo" />
			</a>
        </Link>

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
