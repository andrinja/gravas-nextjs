import { Icon } from "../icons/Icon";
import Card from "./style";
import { colors } from "../theme";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const ActivityAmenity = ({ icon, label, caption}) => {
  const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES);
  return (
    <Card>
      <Icon name={icon} style={{ color: colors.primaryDark, fontSize: "32px" }} />
      <h4 className="label">{t(label)}</h4>
      <p className="caption">{t(caption)}</p>
    </Card>
  );
};
export default ActivityAmenity;
