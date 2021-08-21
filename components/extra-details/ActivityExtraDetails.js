import Items from './style';
import ActivityExtraDetail from '../../components/extra-detail/ActivityExtraDetail'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';
const ActivityExtraDetails = ({details, title}) => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div>
                {details.map(detail => (
                    <ActivityExtraDetail key={detail.title} {...detail}/>
                ))}
            </div>
        </Items>
    )
}

export default  ActivityExtraDetails