import styled from "@emotion/styled";

// `active` is a styling prop only. Emotion's styled on a DOM tag filters it
// out with @emotion/is-prop-valid, so it never reaches the element.
export const TabList = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid ${props => props.theme.fontColors.divider};
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${p => (p.active ? p.theme.colors.primary : "transparent")};
  margin-bottom: -1px;
  padding: 0.75rem 1rem;
  min-height: 48px;
  min-width: 90px;
  font: inherit;
  font-size: ${props => props.theme.fonts.button};
  font-weight: ${props => props.theme.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  cursor: pointer;
  color: ${p => (p.active ? p.theme.colors.primary : p.theme.fontColors.disabled)};
  transition: color 0.2s, border-color 0.2s;

  &:hover,
  &:focus-visible {
    color: ${props => props.theme.colors.primary};
  }
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primaryCool};
    outline-offset: -2px;
  }
`;

export const TabItem = styled.div`
  display: ${p => (p.active ? `flex` : "none")};
  flex-direction: column;
  padding-bottom: 1rem;
`;

export const TabContent = styled.div`
  display: flex;
  background: rgba(51, 51, 51, 0.03);
  padding: 2rem;
`;

export const FaqItem = styled.div`
  padding-bottom: 1rem;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  h3 {
    color: ${props => props.theme.colors.primary};
    padding-bottom: 0.5rem;
  }
  .answer {
    color: ${props => props.theme.fontColors.primary};
    display: ${p => (p.active ? `block` : "none")};
    line-height: 1.8;
  }
`;
