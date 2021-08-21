import RitualAmenity from '../amenity/RitualAmenity'
import Items from './style'
import { useTranslation } from 'next-i18next'
import { TR_NS } from '../../constants/translationNamespace';

const RitualAmenities = ({amenities, title}) => {
	const {t} = useTranslation(TR_NS.SAUNA_RITUALS);
	return (
		<Items>
        <h3 className="title">{t(title)}</h3>
        <div className="amenities">
            {amenities.map(amenity => (
                <RitualAmenity key={amenity.label}{...amenity}/>
            ))}
        </div>
    </Items>
	)
}
export default RitualAmenities;