import { useRouter } from "next/router";
import galleries from "../../static/data/galleries";
import { withTranslation } from "../../i18n";
import { useState } from "react";
import Layout, { Images, Main, Aside, IconItems, Image } from "./style";
import { useTransition, animated } from "react-spring";
import CloseIcon from "../../components/icons/Close";
import NextIcon from "../../components/icons/Next";
import BackIcon from "../../components/icons/Back";
import { default as NextImage } from 'next/image'

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
  const transitions = useTransition(gallery.images[index], image => image.id, {
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
          <Image>
            <BackIcon
              onClick={handleBack}
              style={{ color: "#000000", fontSize: "28px" }}
            />
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={{ ...props, display: 'flex', alignItems: 'center' }}>
                  <NextImage height={512} width={864} src={item.path} alt={item.title} type="image/webp" />
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
                type="image/webp"
              />
            </picture>
          ))}
        </Aside>
      </Images>
    </Layout>
  );
};
Gallery.getInitialProps = async () => ({
  namespacesRequired: ["gallery"]
});

export default withTranslation("gallery")(Gallery);
