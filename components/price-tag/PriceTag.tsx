import { Icon } from '../icons/Icon';
import Item from './style';
import { colors } from '../theme';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { PriceItem } from '../../lib/sections/schema';

type Props = PriceItem & { translationNamespace: SectionContentNamespace };

export const PriceTag = ({
	icon,
	title,
	forPerson,
	additionalPerson,
	totalPrice,
	translationNamespace,
}: Props) => {
	const t = useT(translationNamespace);
	return (
		<Item>
			<Icon name={icon} style={{ color: colors.secondaryDark, fontSize: '48px' }} />
			<h2>{t(title)}</h2>
			<p>{t(forPerson)}</p>
			{/* additionalPerson is absent on 45 of the 63 price entries — only the
			    ritual section uses it. Rendering an empty <p> is the pre-existing
			    behaviour and is kept deliberately: making it conditional would
			    change the markup on every guesthouse and activity price card. */}
			<p>{t(additionalPerson)}</p>
			<h3 className="price">{t(totalPrice)}</h3>
		</Item>
	);
};

export default PriceTag;
