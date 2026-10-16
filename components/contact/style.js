import styled from "@emotion/styled";
import { media } from "../theme";

export const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};

  &:first-of-type {
    border-top: 1px solid ${props => props.theme.colors.lightGrey};
  }

  .buttonLink {
    flex-shrink: 0;
    button {
      min-height: 2.5rem;
      padding: 0 1rem;
      font-size: ${props => props.theme.fonts.caption};
    }
    @media ${media.xs} {
      display: none;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-width: 0;

  svg {
    flex-shrink: 0;
    color: ${props => props.theme.colors.primary};
  }

  .contact-detail {
    color: ${props => props.theme.colors.ink};
    font-weight: ${props => props.theme.fontWeight.medium};
    overflow-wrap: anywhere;
  }
`;
