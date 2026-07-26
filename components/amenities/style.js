import styled from "@emotion/styled";
import { media } from "../theme";

const Items = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 1rem 0;
  .title {
    font-size: ${props => props.theme.fonts.headline5};
    font-weight: ${props => props.theme.fontWeight.bold};
    color: ${props => props.theme.fontColors.primary};
    padding-bottom: 1rem;
  }
  .amenities {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10.5rem, 12rem));
    grid-gap: 1rem;
  }
  @media ${media.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;

    .amenities {
      grid-template-columns: fit-content(100%);
    }
  }
`;

export default Items;
