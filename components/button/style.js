import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ButtonStyle = styled.button`
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  height: 3rem;
  padding: 0 1rem;
  font-size: ${props => props.theme.fonts.body};
  font-weight: ${props => props.theme.fontWeight.light};
  display: flex;
  align-items: center;

  ${p =>
    p.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

  &.btn--primary--solid {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  &.btn--primary--outline {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
  }

  &.btn--secondary--solid {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
  }

  &.btn--secondary--outline {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
  }
  .icon-gift-card {
    font-size: 1.5rem;
  }
`;

export default ButtonStyle;
