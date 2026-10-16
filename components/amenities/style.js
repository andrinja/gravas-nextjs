import styled from "@emotion/styled";
import { media } from "../theme";

const Items = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  column-gap: 3rem;
  margin: 1.5rem 0 3rem;

  .title {
    font-family: ${props => props.theme.families.display};
    font-size: ${props => props.theme.fonts.headline4};
    font-weight: ${props => props.theme.fontWeight.semibold};
    line-height: 1.12;
    color: ${props => props.theme.colors.ink};
  }
  .amenities {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
    gap: 1rem;
  }
  @media ${media.sm} {
    grid-template-columns: 1fr;
    row-gap: 1rem;
    .amenities {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export default Items;
