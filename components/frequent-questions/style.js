import styled from "@emotion/styled";

// `active` is a styling prop only. Emotion's styled on a DOM tag filters it
// out with @emotion/is-prop-valid, so it never reaches the element.
export const TabList = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${p => (p.active ? p.theme.colors.secondaryDark : "transparent")};
  margin-bottom: -1px;
  padding: 0.75rem 1rem;
  min-height: 48px;
  font: inherit;
  font-size: ${props => props.theme.fonts.eyebrow};
  font-weight: ${props => props.theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  cursor: pointer;
  color: ${p => (p.active ? p.theme.colors.ink : p.theme.fontColors.disabled)};
  transition: color 0.2s, border-color 0.2s;

  &:hover,
  &:focus-visible {
    color: ${props => props.theme.colors.ink};
  }
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primaryCool};
    outline-offset: -2px;
  }
`;

export const TabItem = styled.div`
  display: ${p => (p.active ? `flex` : "none")};
  flex-direction: column;
  width: 100%;
`;

export const TabContent = styled.div`
  display: flex;
  padding: 1.5rem 0 1rem;
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;

  h3 {
    font-size: ${props => props.theme.fonts.body};
    font-weight: ${props => props.theme.fontWeight.semibold};
    color: ${props => props.theme.colors.ink};

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      color: inherit;
    }
    button:after {
      content: "${p => (p.active ? "–" : "+")}";
      color: ${props => props.theme.colors.secondaryDark};
      font-size: 1.25rem;
      line-height: 1;
    }
  }
  .answer {
    color: ${props => props.theme.fontColors.secondary};
    display: ${p => (p.active ? `block` : "none")};
    line-height: 1.7;
    padding: 0 0 1rem;
    max-width: 68ch;
  }
`;
