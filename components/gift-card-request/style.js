import styled from "@emotion/styled";
import { media } from "../theme";

export const RequestSection = styled.section`
  margin: 2.5rem 0 1rem;
  padding: 2rem 2.25rem;
  background: ${props => props.theme.colors.superLightGrey};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.radii.md};
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    font-size: ${props => props.theme.fonts.headline4};
  }

  .intro {
    color: ${props => props.theme.fontColors.secondary};
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.875rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.fontColors.secondary};
  }

  input,
  textarea {
    font: inherit;
    font-size: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.ink};
    padding: 0.7rem 0.875rem;
    min-height: 3rem;
    border: 1px solid ${props => props.theme.colors.lightGrey};
    border-radius: ${props => props.theme.radii.sm};
    background: ${props => props.theme.colors.white};
  }
  textarea {
    resize: vertical;
    min-height: 6rem;
  }
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primaryCool};
    outline-offset: 1px;
  }

  .honeypot {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.fontColors.disabled};
  }

  .status {
    padding: 0.75rem 1rem;
    border-radius: ${props => props.theme.radii.sm};
    font-size: ${props => props.theme.fonts.caption};
  }
  .status.ok {
    background: #dcebe6;
    color: #14473f;
  }
  .status.error {
    background: #f9e0dc;
    color: #7a2419;
  }

  @media ${media.sm} {
    padding: 1.5rem 1.25rem;
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;
