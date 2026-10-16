import Items from './style';
import ExtraDetail from '../extra-detail/ExtraDetail';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { ExtraDetailItem, TranslationKey } from '../../lib/sections/schema';

type Props = {
	details: ExtraDetailItem[];
	title: TranslationKey;
	translationNamespace: SectionContentNamespace;
};

export const ExtraDetails = ({ details, title, translationNamespace }: Props) => {
	const t = useT(translationNamespace);
	return (
		<Items>
			<h2 className="title">{t(title)}</h2>
			<div>
				{details.map(detail => (
					<ExtraDetail
						key={detail.title}
						{...detail}
						translationNamespace={translationNamespace}
					/>
				))}
			</div>
		</Items>
	);
};

export default ExtraDetails;
