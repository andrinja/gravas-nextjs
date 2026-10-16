import styled from "@emotion/styled";
import { media } from "../theme";

// position: relative is what next/image `fill` anchors to. With a title the
// photo gets a bottom gradient so the headline reads on any image.
export const Header = styled.div`
  position: relative;
  width: 100%;
  height: ${p => (p.withText ? "34rem" : "28rem")};
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: ${props => props.theme.radii.md};
  background: ${props => props.theme.colors.surface};

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${p =>
      p.withText
        ? "linear-gradient(to top, rgba(14,31,28,0.72) 0%, rgba(14,31,28,0.15) 55%, rgba(14,31,28,0) 100%)"
        : "none"};
  }

  .text {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 2.5rem 2.5rem;
    color: ${props => props.theme.fontColors.onDark};
    max-width: 52rem;
  }

  h1 {
    font-size: ${props => props.theme.fonts.headline2};
    color: ${props => props.theme.fontColors.onDark};
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
  }

  p {
    font-size: 1.125rem;
    line-height: 1.5;
    color: rgba(246, 242, 232, 0.92);
    max-width: 36rem;
  }

  .gallery-link {
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 1.25rem;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.ink};
    border-radius: ${props => props.theme.radii.sm};
    font-size: ${props => props.theme.fonts.eyebrow};
    font-weight: ${props => props.theme.fontWeight.semibold};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media ${media.md} {
    height: ${p => (p.withText ? "28rem" : "22rem")};
    .text {
      padding: 0 1.5rem 1.5rem;
    }
  }
  @media ${media.sm} {
    height: ${p => (p.withText ? "24rem" : "16rem")};
    margin-top: 1rem;
    &:after {
      background: ${p =>
        p.withText
          ? "linear-gradient(to top, rgba(14,31,28,0.84) 0%, rgba(14,31,28,0.5) 45%, rgba(14,31,28,0) 100%)"
          : "none"};
    }
    .text {
      padding: 0 1rem 1.25rem;
    }
    .gallery-link {
      right: 1rem;
      bottom: 1rem;
    }
  }
`;
