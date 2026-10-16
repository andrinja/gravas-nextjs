import styled from "@emotion/styled";
import { media } from "../theme";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 3rem;
  align-items: center;
  margin: 1rem 0 3rem;

  iframe {
    width: 100%;
    height: 28rem;
    border: 0;
    border-radius: ${props => props.theme.radii.md};
    background: ${props => props.theme.colors.surface};
  }

  @media ${media.md} {
    grid-template-columns: 1fr;
    gap: 2rem;

    iframe {
      order: 2;
      height: 20rem;
    }
  }
`;

export const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
