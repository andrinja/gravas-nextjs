import styled from "@emotion/styled";
import { media } from "../theme";

// The page column. Sits under the fixed navbar (hence the top margin) and
// gives every page the same max width and side gutters.
const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => props.theme.layout.maxWidth};
  min-height: calc(100vh - ${props => props.theme.layout.navHeight});
  margin: ${props => props.theme.layout.navHeight} auto 0;
  padding: 0 ${props => props.theme.layout.gutter} 4rem;

  @media ${media.md} {
    padding: 0 1.5rem 3rem;
  }
  @media ${media.sm} {
    padding: 0 ${props => props.theme.layout.gutterSm} 2.5rem;
  }
`;

export default Container;
