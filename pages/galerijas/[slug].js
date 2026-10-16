import { useRouter } from "next/router";
import galleries from "../../static/data/galleries";
import { useState } from 'react'
import Layout, { Images, Main, Aside, IconItems, Image } from "../../components/gallery/style";
import { useTransition, animated } from "@react-spring/web";
import CloseIcon from "../../components/icons/Close";
import NextIcon from "../../components/icons/Next";
import BackIcon from "../../components/icons/Back";
import { default as NextImage } from 'next/image'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';
import { getPaths } from '../../utils/getPaths';

const Gallery = () => {
  const router = useRouter();

  const { slug } = router.query;
  const gallery = galleries.find(gallery => gallery.slug === slug);

  gallery.images = gallery.images.map((image, key) => {
    return {
      id: key,
      ...image
    };
  });

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    const nextImageIndex = index + 1;
    setIndex(nextImageIndex > gallery.images.length - 1 ? 0 : nextImageIndex);
  };

  const handleBack = () => {
    const previousImageIndex = index - 1;
    const lastImageIndex = gallery.images.length - 1;
    setIndex(previousImageIndex < 0 ? lastImageIndex : previousImageIndex);
  };
  // react-spring v9+ API: keys live in the config and the hook returns a
  // render function instead of an array of { item, props, key }.
  const transitions = useTransition(gallery.images[index], {
    keys: image => image.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <Layout>
      <IconItems>
        <CloseIcon onClick={router.back} style={{ fontSize: "28px" }} />
      </IconItems>
      <Images>
        <Main>
          <Image alt="">
            <BackIcon
              onClick={handleBack}
              style={{ color: "#000000", fontSize: "28px" }}
            />
            {transitions((style, item) => (
              <animated.div style={{ ...style, display: 'flex', alignItems: 'center' }}>
                  <NextImage height={512} width={864} src={item.path} alt={item.title} />
              </animated.div>
            ))}
            <NextIcon
              onClick={handleNext}
              style={{ color: "#000000", fontSize: "28px" }}
            />
          </Image>
          <p>{gallery.images[index].title}</p>
        </Main>
        <Aside>
          {gallery.images.map((image, index) => (
            <picture key={index}>
              <NextImage
              height={80}
              width={80}
                onClick={() => {
                  setIndex(index);
                }}
                key={index}
                src={image.path}
                alt={image.title}
               
              />
            </picture>
          ))}
        </Aside>
      </Images>
    </Layout>
  );
};

export async function getStaticPaths() {

	return {
		paths: getPaths(galleries, 'galerijas', 'slug'),
		fallback: false,
	}
  }

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, [TR_NS.COMMON]),
	},
})

export default Gallery;
