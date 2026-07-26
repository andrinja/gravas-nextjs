import styled from "@emotion/styled";
import { media } from "../theme";

export const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: center;
  padding-left: 2rem;
  margin: 1rem 0;

  svg {
    margin-right: 1rem;
  }

  @media ${media.md} {
    padding-left: 0;
  }
  @media ${media.xs} {
    padding-left: 0;
    grid-template-columns: 1fr;
  }

  .buttonLink {
    margin-left: auto;
    text-decoration: none;
    button {
      width: 150px;
      display: flex;
      justify-content: center;

      @media ${media.md} {
        margin-left: 0;
      }
    }
    @media ${media.xs} {
      display: none;
    }
  }
`;

export const Details = styled.div`
  display: flex;

  span {
    font-size: 1.75rem;
    color: ${props => props.theme.colors.primary};
    padding: 0 1rem;
  }

  .contact-detail {
    align-self: center;
    text-decoration: none;
    color: ${props => props.theme.fontColors.primary};
    cursor: pointer;
  }
`;
