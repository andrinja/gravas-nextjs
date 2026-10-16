import styled from "@emotion/styled";

const Card = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.radii.md};
  background: ${props => props.theme.colors.superLightGrey};
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.375rem;
  padding: 1.125rem;

  svg {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: ${props => props.theme.fonts.body};
    font-weight: ${props => props.theme.fontWeight.semibold};
    line-height: 1.3;
    color: ${props => props.theme.colors.ink};
  }

  .caption {
    color: ${props => props.theme.fontColors.disabled};
    font-size: ${props => props.theme.fonts.caption};
    line-height: 1.4;
  }
`;

export default Card;
