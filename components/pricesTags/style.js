import styled from "@emotion/styled";
import { media } from "../theme";

const Items = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 1rem 0 6rem 0;

  .title {
    font-size: ${props => props.theme.fonts.headline5};
    font-weight: ${props => props.theme.fontWeight.bold};
    color: ${props => props.theme.fontColors.primary};
    padding-bottom: 1rem;
  }
  .price-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10.5rem, 16rem));
    grid-gap: 1rem;
  }

  @media ${media.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default Items;
