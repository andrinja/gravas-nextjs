import { useRouter } from "next/router";
import { Link } from '../../components/link'
import galleries from "../../static/data/galleries";

import { Header, HeaderImage } from "./style";

// title/caption are optional and no caller currently passes either, so both
// conditional blocks below are dead today. Defaults are what make them
// optional to TypeScript for the .tsx callers.
const PageHeaderImage = ({ imgsrc, alt, title = null, caption = null }) => {
  const router = useRouter();
  const { slug } = router.query;
  const hasGallery = galleries.find(gallery => gallery.slug === slug);

  return (
    <Header>
      <picture>
        <HeaderImage
          className="image"
          src={imgsrc}
          alt={alt}
          type="image/webp"
        />
      </picture>

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
