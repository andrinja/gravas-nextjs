import Card from "./style";
import { colors } from "../theme";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const GuesthouseAmenity = ({ icon, label, caption }) => {
  const iconName = toCapitalCase(icon);
  const { t} = useTranslation(TR_NS.GUESTHOUSE)
  const Icon = dynamic(() => import(`../icons/${iconName}`));

  return (
    <Card>
      <Icon style={{ color: colors.primaryDark, fontSize: "32px" }} />
      <h4 className="label">{t(label)}</h4>
      <p className="caption">{t(caption)}</p>
    </Card>
  );
};
export default GuesthouseAmenity;
