import ActivityPriceTag from '../priceTag/ActivityPriceTag';
import Items from './style'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const ActivityPriceTags = ({prices, title}) => {
	const { t } = useTranslation(TR_NS.SPORT_ACTIVITIES)
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div className="price-cards">
                {prices.map(price => (
                    <ActivityPriceTag key={price.title} {...price}/>
                ))}
            </div>
        </Items>
    )
}

export default  ActivityPriceTags;