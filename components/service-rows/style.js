import styled from "@emotion/styled";
import { media } from "../theme";

// Home page: the three services as numbered, alternating photo + text rows.
export const Rows = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 3.5rem 0 0;

  @media ${media.sm} {
    gap: 3rem;
    margin-top: 2.5rem;
  }
`;

export const Row = styled.article`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3.5rem;
  align-items: center;

  .photo {
    position: relative;
    width: 100%;
    aspect-ratio: 5 / 4;
    overflow: hidden;
    border-radius: ${props => props.theme.radii.md};
    background: ${props => props.theme.colors.surface};
    order: ${p => (p.flip ? 2 : 1)};
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
    order: ${p => (p.flip ? 1 : 2)};
  }

  .number {
    font-family: ${props => props.theme.families.display};
    font-size: 1.375rem;
    font-weight: ${props => props.theme.fontWeight.semibold};
    color: ${props => props.theme.colors.secondaryDark};
  }

  h2 {
    font-size: ${props => props.theme.fonts.headline3};
  }

  p {
    color: ${props => props.theme.fontColors.secondary};
  }

  .cta {
    align-self: flex-start;
    margin-top: 0.375rem;
  }

  @media ${media.md} {
    gap: 2rem;
  }
  @media ${media.sm} {
    grid-template-columns: 1fr;
    gap: 1.25rem;

    .photo,
    .copy {
      order: initial;
    }
  }
`;
