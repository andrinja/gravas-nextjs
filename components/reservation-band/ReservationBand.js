import { Band } from "./style";
import { ActionLink } from "../hero/style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';

export const PHONE = "+371 26647133";
export const EMAIL = "info@gravas.lv";

// Translates against how_to_reserve: every page that renders this must load
// that namespace in getStaticProps (see README, "Adding a namespace").
const ReservationBand = () => {
  const { t } = useTranslation(TR_NS.HOW_TO_RESERVE);
  return (
    <Band aria-labelledby="reservation-title">
      <div className="copy">
        <h2 id="reservation-title">{t("how_to_reserve_title")}</h2>
        <p>{t("information_to_provide")}</p>
      </div>
      <div className="actions">
        <ActionLink href={`tel:${PHONE.replace(/\s/g, "")}`} className="light">{PHONE}</ActionLink>
        <ActionLink href={`mailto:${EMAIL}`} className="ghost">{EMAIL}</ActionLink>
      </div>
    </Band>
  );
};

export default ReservationBand;
