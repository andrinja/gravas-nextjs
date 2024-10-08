import { useRouter } from "next/router";
import { Link } from '../../components/link'
import galleries from "../../static/data/galleries";

import { Header, HeaderImage } from "./style";

const PageHeaderImage = ({ imgsrc, alt, title, caption }) => {
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
