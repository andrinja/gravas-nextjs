import Item from "./style";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';

const ActivityPriceTag = ({
  icon,
  title,
  forPerson,
  additionalPerson,
  totalPrice
}) => {
	const { t} = useTranslation(TR_NS.SPORT_ACTIVITIES)
  const iconName = toCapitalCase(icon);
  const Icon = dynamic(() => import(`../icons/${iconName}`));
  return (
    <Item>
      <Icon style={{ color: "#C4AF5C", fontSize: "48px" }} />
      <h2>{t(title)}</h2>
      <p>{t(forPerson)}</p>
      <p>{t(additionalPerson)}</p>
      <h3 className="price">{t(totalPrice)}</h3>
    </Item>
  );
};

export default ActivityPriceTag;
