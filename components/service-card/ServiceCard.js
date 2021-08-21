import Link from "next/link";
import Card from "./style";
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const ServiceCard = ({title, priceTitle, priceFrom, img, translationNamespace, prefix }) => {
  const slug = title.replace(/\_/g, "-");

  const { t } = useTranslation(translationNamespace)
  return (
    <Link href={`/${prefix}/${slug}`} prefetch={false}>
      <Card
		whileHover={{
			scale: 1.05,
			transition: { duration: 0.3 },
		}}
		whileTap={{
			scale: 0.9,
			transition: { duration: 0.3 }
		}}>
        <picture>
          <Image width={324} height={230} src={img} alt={t(title)} type="image/webp" />
        </picture>
        <h3 className="title">{t(title)}</h3>
        <div className="detail-items">
          <span>{t(priceTitle)}</span>
          <span>{t(priceFrom)}</span>
        </div>
      </Card>
    </Link>
  );
};

