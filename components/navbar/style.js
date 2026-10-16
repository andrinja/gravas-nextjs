import styled from "@emotion/styled";
import { media } from "../theme";

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: ${props => props.theme.layout.navHeight};
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 ${props => props.theme.layout.gutter};
  background: rgba(246, 242, 232, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  z-index: 20;

  .logo-items {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      display: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: ${props => props.theme.colors.ink};

      @media ${media.md} {
        display: flex;
        margin-left: auto;
        min-width: 44px;
        min-height: 44px;
      }
    }

    .gravas-logo {
      box-sizing: content-box;
      cursor: pointer;
      margin-right: auto;
      display: block;
    }

    @media ${media.md} {
      width: 100%;
    }
  }

  @media ${media.md} {
    height: auto;
    min-height: ${props => props.theme.layout.navHeight};
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 1.5rem;
  }
  @media ${media.sm} {
    padding: 0.75rem ${props => props.theme.layout.gutterSm};
  }
`;

// Language switch: three links in a pill. Was a native <select>, which is a
// poor fit for three options (no visible choices, OS-dependent popup) and
// gave search engines nothing to follow; links to the same path in each
// locale are both.
export const LangItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.radii.pill};
  padding: 0.1875rem;
  gap: 0.125rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25rem;
    min-height: 2rem;
    padding: 0 0.5rem;
    border-radius: ${props => props.theme.radii.pill};
    font-size: ${props => props.theme.fonts.eyebrow};
    font-weight: ${props => props.theme.fontWeight.semibold};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.theme.fontColors.disabled};
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      color: ${props => props.theme.colors.ink};
    }

    &[aria-current="true"] {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.fontColors.onDark};
    }
  }

  @media ${media.md} {
    margin: 0.5rem 0 1rem;
    a {
      min-height: 2.5rem;
      min-width: 3rem;
    }
  }
`;

export const NavItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media ${media.md} {
    display: ${p => (p.isOpen ? "flex" : "none")};
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;

    .item {
      padding: 0.875rem 1rem;
    }
  }
`;

export const Divider = styled.div`
  display: none;
  @media ${media.md} {
    display: flex;
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.lightGrey};
    margin: 0.5rem 0;
  }
`;
