import Card from "./style";
import { colors } from "../theme";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';

const RitualAmenity = ({ icon, label, caption}) => {
  const iconName = toCapitalCase(icon);
  const Icon = dynamic(() => import(`../icons/${iconName}`));
  const {t} = useTranslation(TR_NS.SAUNA_RITUALS);
  return (
    <Card>
      <Icon style={{ color: colors.primaryDark, fontSize: "32px" }} />
      <h4 className="label">{t(label)}</h4>
      <p className="caption">{t(caption)}</p>
    </Card>
  );
};
export default RitualAmenity;
