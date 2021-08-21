import Items from './style';
import RitualExtraDetail from '../../components/extra-detail/RitualExtraDetail'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const RitualExtraDetails = ({details, title}) => {
	const {t} = useTranslation(TR_NS.SAUNA_RITUALS);
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div>
                {details.map(detail => (
                    <RitualExtraDetail key={detail.title} {...detail}/>
                ))}
            </div>
        </Items>
    )
}

export default RitualExtraDetails;