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
			<h4 className="label">{t(label)}</h4>
			<p className="caption">{t(caption)}</p>
		</Card>
	);
};

export default HighlightCard;
