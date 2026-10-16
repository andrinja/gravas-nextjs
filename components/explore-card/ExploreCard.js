import Link from "next/link";
import Image from 'next/image'
import { Card } from "./style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';

export default function ExploreCard ({ label, img, href}) {
	const { t } = useTranslation(TR_NS.EXPLORE_CARDS);
	return (
		<Card as={Link} href={href} prefetch={false}>
			<span className="photo">
				<Image
					fill
					sizes="(max-width: 512px) 100vw, (max-width: 1240px) 50vw, 25vw"
					src={img}
					alt=""
					style={{ objectFit: "cover" }}
				/>
			</span>
			<span className="label">
				{t(label)}
				<span className="arrow" aria-hidden>→</span>
			</span>
		</Card>
	)
}
