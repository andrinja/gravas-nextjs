import { Icon } from '../icons/Icon';
import Card from './style';
import { colors } from '../theme';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { IconCaptionItem } from '../../lib/sections/schema';

type Props = IconCaptionItem & { translationNamespace: SectionContentNamespace };

export const HighlightCard = ({ icon, label, caption, translationNamespace }: Props) => {
	const t = useT(translationNamespace);
	return (
		<Card>
			<Icon name={icon} style={{ color: colors.primary, fontSize: '24px' }} />
			{/* Not a heading: this strip sits right under the h1, and an h4
			    there skips two levels. It is a label/value pair. */}
			<span className="label">{t(label)}</span>
			<span className="caption">{t(caption)}</span>
		</Card>
	);
};

export default HighlightCard;
