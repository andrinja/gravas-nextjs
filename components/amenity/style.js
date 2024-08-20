import styled from "@emotion/styled";

const Card = styled.div`
  border: 1px solid ${props => props.theme.fontColors.divider};
  border-radius: 8px;
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  & > * {
    margin: 0.5rem 0;
  }

  p {
    color: ${props => props.theme.fontColors.disabled};
    font-size: ${props => props.theme.fonts.body};
  }

  img {
    font-size: 2.2rem;
    color: ${props => props.theme.colors.primary};
  }
`;

export default Card;
