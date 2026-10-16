import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ButtonStyle = styled.button`
  border-radius: ${props => props.theme.radii.sm};
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  min-height: 3rem;
  padding: 0 1.5rem;
  font-family: inherit;
  font-size: ${props => props.theme.fonts.button};
  font-weight: ${props => props.theme.fontWeight.semibold};
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;

  ${p =>
    p.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

  &.btn--primary--solid {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.fontColors.onDark};
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
    }
  }

  &.btn--primary--outline {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.fontColors.onDark};
    }
  }

  &.btn--secondary--solid {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.ink};
    &:hover {
      background: ${props => props.theme.colors.white};
    }
  }

  &.btn--secondary--outline {
    background: transparent;
    color: ${props => props.theme.fontColors.onDark};
    border-color: rgba(246, 242, 232, 0.7);
    &:hover {
      border-color: ${props => props.theme.fontColors.onDark};
    }
  }
  .icon-gift-card {
    font-size: 1.5rem;
  }
`;

export default ButtonStyle;
