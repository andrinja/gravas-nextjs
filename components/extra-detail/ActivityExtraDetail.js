import Item from './style';
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const ActivityExtraDetail = ({title, details}) => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
    return (
        <Item>
            <div className="detail">
                <h3>{t(title)}</h3>
                <p>{t(details)}</p>
            </div>
            <div className="line"></div>
        </Item>
    )
}

export default ActivityExtraDetail;