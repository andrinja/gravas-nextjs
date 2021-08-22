import ActivityAmenity from "../amenity/ActivityAmenity";
import Items from "./style";
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const ActivityAmenities = ({ amenities, title }) => {
	const { t } = useTranslation(TR_NS.SPORTS_ACTIVITIES)
	return (
		<Items>
			<h3 className="title">{t(title)}</h3>
			<div className="amenities">
			{amenities.map(amenity => (
				<ActivityAmenity key={amenity.label} {...amenity} />
			))}
			</div>
		</Items>
	  )
};
export default ActivityAmenities;
