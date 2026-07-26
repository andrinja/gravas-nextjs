const breakpoints = {
  md: "(max-width: 1240px)"
};

import styled from "@emotion/styled";

const Layout = styled.div`
  width: calc(100vw - 5rem);
  max-width: 90rem;
  height: calc(100vh - 3rem);
  margin: 0 auto;

  @media ${breakpoints.md} {
    width: 100vw;
  }
`;

export const IconItems = styled.div`
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    cursor: pointer;
  }

  @media ${breakpoints.md} {
    position: relative;
    z-index: 2;
    margin: 0.5rem 1rem;
  }
`;

export const Images = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 85% 15%;
  align-content: space-evenly;

  @media ${breakpoints.md} {
    grid-template-columns: 100%;
  }
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54rem;
  height: 32rem;
  position: relative;
  margin: 0 auto;

  svg {
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: calc(50% - 2rem);

    &:first-child {
      left: -4rem;
    }

    &:last-child {
      left: 100%;
    }
  }

  > div {
    width: auto;
    height: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.25rem;
  }
  @media ${breakpoints.md} {
    width: 100vw;
    img {
      width: 100%;
      height: 100%;
    }
    svg {
      display: none;
    }
  }
`;

export const Main = styled.main`
  p {
    padding: 1rem 0;
    text-align: center;
  }
`;

export const Aside = styled.aside`
  display: grid;
  grid-template-columns: 5rem 5rem;
  grid-auto-rows: 5rem;
  grid-gap: 1rem;
  margin: auto 0;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 0.25rem;
  }

  @media ${breakpoints.md} {
    grid-template-columns: repeat(auto-fit, 5rem);
  }
`;

export default Layout;
