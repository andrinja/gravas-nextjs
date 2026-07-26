import styled from "@emotion/styled";
import { media } from "../theme";


export const Container = styled.div`
  width: 100%;
  display: flex;

  @media ${media.md} {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    iframe {
      width: 100%;
      order: 2;
    }
  }
`;

export const ContactItems = styled.div`
  width: calc(100% - 36rem);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${media.md} {
    width: 100%;
  }
`;
