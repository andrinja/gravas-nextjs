import RitualPriceTag from '../priceTag/RitualPriceTag';
import Items from './style'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const RitualPriceTags = ({prices, title}) => {
	const { t } = useTranslation(TR_NS.SAUNA_RITUALS)
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div className="price-cards">
                {prices.map(price => (
                    <RitualPriceTag key={price.title} {...price}/>
                ))}
            </div> 
        </Items>
    )
}

export default RitualPriceTags;