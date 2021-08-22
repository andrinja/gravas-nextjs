import Link from "next/link";
import Card from "./style";
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

export default function ExploreCard ({ label, img, href}) {
	const { t } = useTranslation('explore_cards');
	return (
		<Link href={href} prefetch={false}>
		<Card
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.3 },
			}}
			whileTap={{
				scale: 0.9,
				transition: { duration: 0.3 }
			}}>
			<picture>
			<Image width={100} height={75} src={img} alt={t(label)} type="image/webp" />
			</picture>
			<span className="label">{t(label)}</span>
		</Card>
		</Link>
	)
}
