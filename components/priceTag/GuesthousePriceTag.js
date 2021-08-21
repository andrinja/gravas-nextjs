import Item from "./style";
import dynamic from "next/dynamic";
import toCapitalCase from "../../lib/toCapitalCase";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const GuesthousePriceTag = ({
  icon,
  title,
  forPerson,
  additionalPerson,
  totalPrice,
}) => {
  const iconName = toCapitalCase(icon);
  const { t} = useTranslation(TR_NS.GUESTHOUSE)
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

export default GuesthousePriceTag;
