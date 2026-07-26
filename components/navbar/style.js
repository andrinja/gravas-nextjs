import styled from "@emotion/styled";
import { media } from "../theme";

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background: white;
  z-index: 2;

  .logo-items {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    .icon {
      display: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;

      @media ${media.md} {
        display: flex;
        margin-left: auto;
        min-width: 44px;
        min-height: 44px;

        &.icon-menu {
          font-size: 28px;
        }
      }
    }

    .gravas-logo {
      box-sizing: content-box;
      cursor: pointer;
      margin-right: auto;
    }

    @media ${media.md} {
      width: 100%;
    }
  }

  @media ${media.md} {
    height: auto;
    flex-direction: column;
    align-items: center;
    margin: 0;
    background: ${props => props.theme.colors.background};
  }
`;

export const SelectItems = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;

  select {
    color: ${props => props.theme.fontColors.disabled};
    font-size: ${props => props.theme.fonts.body};
    border: none;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }

  .icon {
    padding-right: 0.5rem;
    color: ${props => props.theme.fontColors.disabled};
  }
  @media ${media.md} {
    margin-bottom: 1rem;
  }
`;
export const NavItems = styled.div`
  max-width: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media ${media.md} {
    display: ${p => (p.isOpen ? "flex" : "none")};
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
      padding: 1rem;
    }
  }
`;

export const Divider = styled.div`
  display: none;
  @media ${media.md} {
    display: flex;
    width: 100%;
    border: 0.5px solid ${props => props.theme.fontColors.divider};
    margin-bottom: 1rem;
  }
`;
