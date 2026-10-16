import PriceTag from '../price-tag/PriceTag';
import Items from './style';
import { useT } from '../../lib/useT';
import type { SectionContentNamespace } from '../../constants/translationNamespace';
import type { PriceItem, TranslationKey } from '../../lib/sections/schema';

type Props = {
	prices: PriceItem[];
	title: TranslationKey;
	translationNamespace: SectionContentNamespace;
};

export const PriceTags = ({ prices, title, translationNamespace }: Props) => {
	const t = useT(translationNamespace);
	return (
		<Items>
			<h2 className="title">{t(title)}</h2>
			<div className="price-cards">
				{prices.map(price => (
					<PriceTag
						key={price.title}
						{...price}
						translationNamespace={translationNamespace}
					/>
				))}
			</div>
		</Items>
	);
};

export default PriceTags;
