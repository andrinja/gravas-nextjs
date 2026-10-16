import styled from "@emotion/styled";
import { media } from "../theme";

// Green "Kā rezervēt?" band. In-flow, at the end of a page's content;
// replaces the old fixed bottom bar with a modal.
export const Band = styled.section`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.fontColors.onDark};
  border-radius: ${props => props.theme.radii.md};
  margin: 4rem 0 0;
  padding: 3rem 3.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  .copy {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    max-width: 40rem;
  }

  h2 {
    font-size: ${props => props.theme.fonts.headline3};
    color: ${props => props.theme.fontColors.onDark};
  }

  p {
    color: rgba(246, 242, 232, 0.86);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
  }

  @media ${media.md} {
    padding: 2.5rem 2rem;
  }
  @media ${media.sm} {
    margin-top: 3rem;
    padding: 2rem 1.25rem;
    .actions {
      width: 100%;
      flex-direction: column;
      a {
        width: 100%;
      }
    }
  }
`;
