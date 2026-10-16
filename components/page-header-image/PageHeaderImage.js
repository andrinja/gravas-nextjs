import { useRouter } from "next/router";
import Image from "next/image";
import { Link } from '../../components/link'
import galleries from "../../static/data/galleries";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';

import { Header } from "./style";

// The hero is the LCP element on every page that has one, so it goes through
// next/image with `fill` + `priority`: a resized AVIF/WebP from /_next/image
// plus a preload hint.
//
// With `title` the headline is laid over the photo on a gradient; section
// index pages use that for their h1. Detail pages pass no title and render
// their h1 below the photo instead.
const PageHeaderImage = ({ imgsrc, alt, title = null, caption = null }) => {
  const router = useRouter();
  const { slug } = router.query;
  const hasGallery = galleries.find(gallery => gallery.slug === slug);
  // Only detail pages render the gallery link, and those load COMMON.
  const { t } = useTranslation(TR_NS.COMMON);
  const withText = Boolean(title || caption);

  return (
    <Header withText={withText}>
      <Image
        className="image"
        src={imgsrc}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={60}
        sizes="(max-width: 1440px) 100vw, 1440px"
        style={{ objectFit: "cover" }}
      />

      {withText && (
        <div className="text">
          {title && <h1>{title}</h1>}
          {caption && <p>{caption}</p>}
        </div>
      )}
      {hasGallery && (
        <Link className="gallery-link" href={`/galerijas/${slug}`} prefetch={false}>{t("gallery")}
        </Link>
      )}
    </Header>
  );
};

export default PageHeaderImage
