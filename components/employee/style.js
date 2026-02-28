import styled from "@emotion/styled";

export const EmployeeDetails = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 1rem 0;
  gap: 0;

  .left-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .right-column {
    display: grid;
    grid-gap: 1rem;
  }

  .role-title {
    font-size: ${props => props.theme.fonts.headline5};
    font-weight: ${props => props.theme.fontWeight.bold};
    color: ${props => props.theme.fontColors.primary};
    margin: 0;
  }

  .image-and-timeline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
  }

  .image-wrapper {
    flex-shrink: 0;

    .image {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .timeline {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
  }

  .description {
    margin: 0;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    align-items: center;

    .left-column {
      align-items: center;
      text-align: center;
    }

    .role-title {
      margin-bottom: 1.5rem;
    }

    .image-and-timeline {
      justify-content: center;
    }

    .image-wrapper .image {
      margin: 0 auto;
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
