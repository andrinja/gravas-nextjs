import Amenity from '../amenity/Amenity';
import Items from './style';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { IconCaptionItem, TranslationKey } from '../../lib/sections/schema';

type Props = {
	amenities: IconCaptionItem[];
	title: TranslationKey;
	translationNamespace: SectionContentNamespace;
};

export const Amenities = ({ amenities, title, translationNamespace }: Props) => {
	const t = useT(translationNamespace);
	return (
		<Items>
			<h2 className="title">{t(title)}</h2>
			<div className="amenities">
				{amenities.map(amenity => (
					<Amenity
						key={amenity.label}
						{...amenity}
						translationNamespace={translationNamespace}
					/>
				))}
			</div>
		</Items>
	);
};

export default Amenities;
