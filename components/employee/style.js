import styled from "@emotion/styled";
import { media } from "../theme";

export const EmployeeDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  column-gap: 3rem;
  margin: 1.5rem 0 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};

  .left-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .right-column {
    display: grid;
    gap: 1.25rem;
  }

  .role-title {
    font-family: ${props => props.theme.families.display};
    font-size: ${props => props.theme.fonts.headline4};
    font-weight: ${props => props.theme.fontWeight.semibold};
    line-height: 1.12;
    color: ${props => props.theme.colors.ink};
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
    color: ${props => props.theme.fontColors.secondary};
    max-width: 68ch;
  }

  @media ${media.sm} {
    grid-template-columns: 1fr;
    row-gap: 1rem;
    padding: 2rem 0;
  }
`;

export const ModalItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2rem 1rem;
  max-width: 31rem;

  h2 {
    font-size: ${props => props.theme.fonts.headline4};
  }

  p {
    padding-top: 1rem;
    color: ${props => props.theme.fontColors.secondary};
  }
  .contacts {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    svg {
      padding-right: 1rem;
    }

    a {
      cursor: pointer;
      font-weight: ${props => props.theme.fontWeight.semibold};
      color: ${props => props.theme.colors.ink};
    }
  }
`;
