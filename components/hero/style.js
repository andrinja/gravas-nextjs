import styled from "@emotion/styled";
import { media } from "../theme";

export const HeroFrame = styled.section`
  position: relative;
  width: 100%;
  height: 42rem;
  margin-top: 1.5rem;
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background: ${props => props.theme.colors.surface};

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to top, rgba(14, 31, 28, 0.74) 0%, rgba(14, 31, 28, 0.18) 55%, rgba(14, 31, 28, 0) 100%);
  }

  .copy {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 0 3.5rem 4rem;
    color: ${props => props.theme.fontColors.onDark};
    max-width: 56rem;
  }

  .eyebrow {
    font-size: ${props => props.theme.fonts.eyebrow};
    font-weight: ${props => props.theme.fontWeight.semibold};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.secondary};
  }

  h1 {
    font-size: ${props => props.theme.fonts.headline2};
    color: ${props => props.theme.fontColors.onDark};
    max-width: 14ch;

    em {
      font-style: italic;
    }
  }

  .lede {
    font-size: 1.1875rem;
    line-height: 1.55;
    max-width: 34rem;
    color: rgba(246, 242, 232, 0.92);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    margin-top: 0.5rem;
  }

  @media ${media.md} {
    height: 34rem;
    .copy {
      padding: 0 2rem 2.5rem;
    }
  }
  @media ${media.sm} {
    height: 32rem;
    margin-top: 1rem;
    /* The copy block covers most of the photo at phone width, so the
       scrim has to reach much higher than on desktop. */
    &:after {
      background: linear-gradient(to top, rgba(14, 31, 28, 0.86) 0%, rgba(14, 31, 28, 0.6) 50%, rgba(14, 31, 28, 0.15) 85%, rgba(14, 31, 28, 0) 100%);
    }
    .copy {
      padding: 0 1.25rem 1.5rem;
      gap: 0.875rem;
    }
    .lede {
      font-size: 1.0625rem;
    }
  }
`;

// Button-shaped links. Buttons that navigate are links; the Button component
// is for real buttons (modals, toggles).
export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0 1.625rem;
  border-radius: ${props => props.theme.radii.sm};
  font-size: ${props => props.theme.fonts.button};
  font-weight: ${props => props.theme.fontWeight.semibold};
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &.light {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.ink};
    &:hover {
      background: ${props => props.theme.colors.white};
    }
  }
  &.ghost {
    border: 1px solid rgba(246, 242, 232, 0.7);
    color: ${props => props.theme.fontColors.onDark};
    &:hover {
      border-color: ${props => props.theme.fontColors.onDark};
    }
  }
  &.primary {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.fontColors.onDark};
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
    }
  }
  &.outline {
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.fontColors.onDark};
    }
  }
`;
