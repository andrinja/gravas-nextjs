import styled from "@emotion/styled";

export const EmployeeDetails = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 1rem 0;
  .title {
    padding-bottom: 2rem;
    font-size: ${props => props.theme.fonts.headline5};
    font-weight: ${props => props.theme.fontWeight.bold};
    color: ${props => props.theme.fontColors.primary};
  }
  .education {
    display: grid;
    grid-template-columns: 7rem 20% 20%;
    grid-gap: 1rem;

    .image {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .about {
    display: grid;
    grid-gap: 1rem;
    padding: 2rem 0;
  }

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .education {
      grid-template-columns: none;
      text-align: center;

      .image {
        margin: 0 auto;
      }
    }
  }
`;

export const ModalItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 1rem;
  max-width: 31rem;

  p {
    padding-top: 1rem;
  }
  .contacts {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    svg {
      padding-right: 1rem;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      color: ${props => props.theme.colors.darkGrey};
    }
  }
`;
