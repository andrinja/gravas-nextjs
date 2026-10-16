import Image from "next/image";
import Link from "next/link";
import { HeroFrame, ActionLink } from "./style";

// Home-page hero: full-width photo, headline on a gradient, two actions.
// `titleEm` is the italic tail of the headline ("bez steigas").
const Hero = ({ imgsrc, alt, eyebrow, title, titleEm, lede, primary, secondary }) => (
  <HeroFrame>
    <Image
      src={imgsrc}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1440px) 100vw, 1440px"
      style={{ objectFit: "cover" }}
    />
    <div className="copy">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>
        {title}
        {titleEm && <> <em>{titleEm}</em></>}
      </h1>
      {lede && <p className="lede">{lede}</p>}
      <div className="actions">
        {primary && (
          <ActionLink as={Link} href={primary.href} className="light">
            {primary.label}
          </ActionLink>
        )}
        {secondary && (
          <ActionLink as={Link} href={secondary.href} className="ghost">
            {secondary.label}
          </ActionLink>
        )}
      </div>
    </div>
  </HeroFrame>
);

export default Hero;
