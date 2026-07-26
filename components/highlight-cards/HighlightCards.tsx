import HighlightCard from '../highlight-card/HighlightCard';
import HighlightCardItems from './style';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { IconCaptionItem } from '../../lib/sections/schema';

type Props = {
	highlights: IconCaptionItem[];
	translationNamespace: SectionContentNamespace;
};

export const HighlightCards = ({ highlights, translationNamespace }: Props) => (
	<HighlightCardItems>
		{highlights.map(highlight => (
			<HighlightCard
				key={highlight.label}
				{...highlight}
				translationNamespace={translationNamespace}
			/>
		))}
	</HighlightCardItems>
);

export default HighlightCards;
