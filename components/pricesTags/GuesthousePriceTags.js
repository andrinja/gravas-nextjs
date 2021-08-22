import GuesthousePriceTag from '../priceTag/GuesthousePriceTag';
import Items from './style'
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const GuesthousePriceTags = ({prices, title}) => {
	const { t } = useTranslation(TR_NS.GUESTHOUSE)
    return (
        <Items>
            <h3 className="title">{t(title)}</h3>
            <div className="price-cards">
                {prices.map(price => (
                    <GuesthousePriceTag key={price.title} {...price}/>
                ))}
            </div>
        </Items>
    )
}

export default GuesthousePriceTags;