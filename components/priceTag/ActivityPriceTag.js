import { Icon } from "../icons/Icon";
import Item from "./style";
import { colors } from "../theme";
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
  return (
    <Item>
      <Icon name={icon} style={{ color: colors.secondaryDark, fontSize: "48px" }} />
      <h2>{t(title)}</h2>
      <p>{t(forPerson)}</p>
      <p>{t(additionalPerson)}</p>
      <h3 className="price">{t(totalPrice)}</h3>
    </Item>
  );
};

export default ActivityPriceTag;
