import styled from "@emotion/styled";
import { media } from "../theme";

// Full-viewport lightbox on the deep green. Three rows: top bar, stage,
// thumbnail strip. The stage takes whatever height is left.
export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.fontColors.onDark};
  user-select: none;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  min-height: 4rem;

  .back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
    color: rgba(246, 242, 232, 0.8);
    font-size: ${props => props.theme.fonts.eyebrow};
    font-weight: ${props => props.theme.fontWeight.semibold};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    &:hover {
      color: ${props => props.theme.fontColors.onDark};
    }
    svg {
      font-size: 18px;
    }
  }

  .counter {
    font-family: ${props => props.theme.families.display};
    font-size: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.secondary};
    white-space: nowrap;
  }

  @media ${media.sm} {
    padding: 0.5rem 0.75rem;
    .back span {
      max-width: 40vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  border-radius: ${props => props.theme.radii.pill};
  color: ${props => props.theme.fontColors.onDark};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: rgba(246, 242, 232, 0.1);
  }
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.secondary};
    outline-offset: 2px;
  }
`;

export const Stage = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.75rem;
  padding: 0 4.5rem 0.5rem;
  min-height: 0;

  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    touch-action: pan-y;
  }

  .slide {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide img {
    border-radius: ${props => props.theme.radii.md};
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  }

  .caption {
    text-align: center;
    font-size: ${props => props.theme.fonts.body};
    color: rgba(246, 242, 232, 0.85);
    min-height: 1.6em;
    padding: 0 1rem;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    background: rgba(246, 242, 232, 0.08);
    border: 1px solid rgba(246, 242, 232, 0.18);
    svg {
      font-size: 22px;
    }
    &.prev {
      left: 0.75rem;
    }
    &.next {
      right: 0.75rem;
    }
  }

  @media ${media.sm} {
    padding: 0 0.75rem 0.5rem;
    .arrow {
      display: none;
    }
    .slide img {
      border-radius: ${props => props.theme.radii.sm};
      box-shadow: none;
    }
  }
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem 1.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  justify-content: safe center;
  &::-webkit-scrollbar {
    display: none;
  }

  button {
    position: relative;
    flex: 0 0 auto;
    width: 4.5rem;
    height: 3.375rem;
    padding: 0;
    background: none;
    border: 2px solid transparent;
    border-radius: ${props => props.theme.radii.md};
    overflow: hidden;
    cursor: pointer;
    opacity: 0.55;
    transition: opacity 0.15s ease, border-color 0.15s ease;

    &:hover,
    &[aria-current="true"] {
      opacity: 1;
    }
    &[aria-current="true"] {
      border-color: ${props => props.theme.colors.secondary};
    }
    &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.secondary};
      outline-offset: 2px;
    }
  }

  @media ${media.sm} {
    padding: 0.5rem 0.75rem 1rem;
    button {
      width: 3.5rem;
      height: 2.625rem;
    }
  }
`;
