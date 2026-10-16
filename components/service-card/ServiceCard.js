import Link from "next/link";
import Image from 'next/image';
import Card from "./style";
import { useTranslation } from 'next-i18next/pages';

export const ServiceCard = ({title, priceTitle, priceFrom, img, translationNamespace, prefix }) => {
  const slug = title.replace(/_/g, "-");

  const { t } = useTranslation(translationNamespace)
  return (
    <Card as={Link} href={`/${prefix}/${slug}`} prefetch={false}>
      <span className="photo">
        <Image
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1240px) 50vw, 33vw"
          src={img}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </span>
      <h2 className="title">{t(title)}</h2>
      <span className="detail-items">
        <span>{t(priceTitle)}</span>
        <span className="price">{t(priceFrom)}</span>
      </span>
    </Card>
  );
};
