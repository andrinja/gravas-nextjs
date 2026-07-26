import Item from './style';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { ExtraDetailItem } from '../../lib/sections/schema';

type Props = ExtraDetailItem & { translationNamespace: SectionContentNamespace };

export const ExtraDetail = ({ title, details, translationNamespace }: Props) => {
	const t = useT(translationNamespace);
	return (
		<Item>
			<div className="detail">
				<h3>{t(title)}</h3>
				<p>{t(details)}</p>
			</div>
			<div className="line"></div>
		</Item>
	);
};

export default ExtraDetail;
