import Card from "./style";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const HighlightCard = ({ icon, label, caption}) => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
  const iconName = toCapitalCase(icon);
  const Icon = dynamic(() => import(`../icons/${iconName}`));
  return (
    <Card>
      <Icon style={{ color: "#1E514B", fontSize: "24px" }} />
      <h4 className="label">{t(label)}</h4>
      <p className="caption">{t(caption)}</p>
    </Card>
  );
};
export default HighlightCard;
