import Items from './style';
import GuesthouseExtraDetail from '../../components/extra-detail/GuesthouseExtraDetail'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';
const GuesthouseExtraDetails = ({details, title}) => {
	const { t } = useTranslation(TR_NS.GUESTHOUSE)
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div>
                {details.map(detail => (
                    <GuesthouseExtraDetail key={detail.title} {...detail}/>
                ))}
            </div>
        </Items>
    )
}

export default  GuesthouseExtraDetails