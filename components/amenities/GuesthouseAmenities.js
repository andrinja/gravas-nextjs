import  GuesthouseAmenity from '../amenity/GuesthouseAmenity'
import Items from './style'
import { useTranslation } from 'next-i18next'
import { TR_NS } from '../../constants/translationNamespace'

const GuesthouseAmenities = ({amenities, title}) => {
	const { t } = useTranslation(TR_NS.GUESTHOUSE)
	return (
		<Items>
			<h3 className="title">{t(title)}</h3>
			<div className="amenities">
				{amenities.map(amenity => (
					<GuesthouseAmenity key={amenity.label}{...amenity}/>
				))}
			</div>
		</Items>
	)
}
export default GuesthouseAmenities