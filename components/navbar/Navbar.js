import { useState, useEffect } from "react";
import Link from 'next/link'
import NavItem from "../nav-item/NavItem";
import { Nav, NavItems, Divider, LangItems } from "./style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';
import MenuIcon from "../../components/icons/Menu";
import CloseIcon from "../../components/icons/Close";
import Image from 'next/image'
import { useRouter } from 'next/router'

const LANGUAGE_NAMES = { lv: "Latviešu", ru: "Русский", en: "English" };

// Same path, other locale. next/link's `locale` prop does the prefixing, so
// /pirts-rituali becomes /en/pirts-rituali and /ru/pirts-rituali, and the
// default locale drops the prefix again.
const LanguageSwitch = () => {
  const { asPath, locale, locales } = useRouter();
  // asPath can carry a hash or query; keep them, the locale prefix is
  // handled by Link.
  return (
    <LangItems role="group" aria-label="Valoda / Language / Язык">
      {(locales || []).map(code => (
        <Link
          key={code}
          href={asPath}
          locale={code}
          hrefLang={code}
          lang={code}
          aria-current={code === locale ? "true" : undefined}
          aria-label={LANGUAGE_NAMES[code] || code}
          prefetch={false}
        >
          {code}
        </Link>
      ))}
    </LangItems>
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
  const { events } = useRouter();

  // Close the phone menu after navigating. The navbar now lives in _app and
  // survives route changes, so it no longer resets by remounting.
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    events.on('routeChangeComplete', close);
    return () => events.off('routeChangeComplete', close);
  }, [events]);

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

        <LanguageSwitch />
      </NavItems>
    </Nav>
  );
}
