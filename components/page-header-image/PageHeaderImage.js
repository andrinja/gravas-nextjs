import { useRouter } from "next/router";
import Image from "next/image";
import { Link } from '../../components/link'
import galleries from "../../static/data/galleries";

import { Header } from "./style";

// The hero is the LCP element on every page that has one. It used to be a
// plain <img> pointing at the original JPG (up to 523 KB, 1440px wide, sent
// to every phone). next/image with `fill` serves a resized AVIF/WebP from
// /_next/image, and `priority` adds a preload so the browser starts fetching
// it before hydration.
//
// title/caption are optional and no caller currently passes either, so both
// conditional blocks below are dead today. Defaults are what make them
// optional to TypeScript for the .tsx callers.
const PageHeaderImage = ({ imgsrc, alt, title = null, caption = null }) => {
  const router = useRouter();
  const { slug } = router.query;
  const hasGallery = galleries.find(gallery => gallery.slug === slug);

  return (
    <Header>
      <Image
        className="image"
        src={imgsrc}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1440px) 100vw, 1440px"
        style={{ objectFit: "cover" }}
      />

      {title && <h1>{title}</h1>}
      {caption && <p>{caption}</p>}
      {hasGallery && (
        <Link className="gallery-link" href={`/galerijas/${slug}`} prefetch={false}>Galerija
        </Link>
      )}
    </Header>
  );
};

export default PageHeaderImage
