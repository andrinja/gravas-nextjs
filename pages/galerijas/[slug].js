import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbox, TopBar, IconButton, Stage, Thumbs } from "../../components/gallery/style";
import Seo from "../../components/seo/Seo";
import CloseIcon from "../../components/icons/Close";
import NextIcon from "../../components/icons/Next";
import BackIcon from "../../components/icons/Back";
import galleries from "../../static/data/galleries";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';
import { localePaths } from '../../lib/paths';
import { galleryParent } from '../../lib/sections/serverProps';

const SWIPE_PX = 60;

// Slide direction: +1 going forward, -1 going back. The leaving image slides
// out the way the arriving one came in.
const variants = {
  enter: dir => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: dir => ({ x: dir * -48, opacity: 0, transition: { duration: 0.18 } }),
};

const Gallery = ({ gallery, parent }) => {
  const { t } = useTranslation(TR_NS.COMMON);
  const { t: tParent } = useTranslation(parent.ns);
  const [[index, direction], setPosition] = useState([0, 0]);
  const thumbsRef = useRef(null);
  const total = gallery.images.length;
  const image = gallery.images[index];
  const parentTitle = tParent(parent.titleKey);

  const go = useCallback(
    step => setPosition(([i]) => [(i + step + total) % total, step > 0 ? 1 : -1]),
    [total]
  );
  const jump = useCallback(i => setPosition(([cur]) => [i, i > cur ? 1 : -1]), []);

  useEffect(() => {
    const onKey = event => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Keep the active thumbnail in view as the user moves through the strip.
  useEffect(() => {
    thumbsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return (
    <>
      <Seo title={`${parentTitle} · ${t("gallery")}`} noindex />
      <Lightbox role="dialog" aria-label={`${parentTitle} · ${t("gallery")}`}>
        <TopBar>
          <Link className="back" href={parent.href} aria-label={t("gallery_back_to", { title: parentTitle })}>
            <BackIcon aria-hidden />
            <span>{parentTitle}</span>
          </Link>
          <span className="counter" aria-live="polite">
            {t("gallery_counter", { current: index + 1, total })}
          </span>
          <IconButton as={Link} href={parent.href} aria-label={t("gallery_close")}>
            <CloseIcon aria-hidden style={{ fontSize: "22px" }} />
          </IconButton>
        </TopBar>

        <Stage>
          <div className="frame">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={image.path}
                className="slide"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_PX) go(1);
                  else if (info.offset.x > SWIPE_PX) go(-1);
                }}
              >
                <Image
                  src={image.path}
                  alt={image.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 720px) 100vw, 90vw"
                  draggable={false}
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <IconButton className="arrow prev" type="button" onClick={() => go(-1)} aria-label={t("gallery_previous")}>
                  <BackIcon aria-hidden />
                </IconButton>
                <IconButton className="arrow next" type="button" onClick={() => go(1)} aria-label={t("gallery_next")}>
                  <NextIcon aria-hidden />
                </IconButton>
              </>
            )}
          </div>
          <p className="caption">{image.title}</p>
        </Stage>

        {total > 1 && (
          <Thumbs ref={thumbsRef} role="tablist" aria-label={t("gallery")}>
            {gallery.images.map((thumb, i) => (
              <button
                key={thumb.path}
                type="button"
                role="tab"
                aria-current={i === index ? "true" : undefined}
                aria-label={thumb.title}
                onClick={() => jump(i)}
              >
                <Image src={thumb.path} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </Thumbs>
        )}
      </Lightbox>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: localePaths(galleries.map(g => ({ slug: g.slug }))),
    fallback: false,
  };
}

// galleryParent reaches SECTION_DATA, so it stays inside getStaticProps
// (see lib/sections/serverProps.ts).
export const getStaticProps = async ({ locale, params }) => {
  const gallery = galleries.find(g => g.slug === params.slug);
  if (!gallery) return { notFound: true };
  const parent = galleryParent(params.slug);
  return {
    props: {
      ...(await serverSideTranslations(locale, [TR_NS.COMMON, parent.ns])),
      gallery,
      parent,
    },
  };
};

export default Gallery;
