import styled from "@emotion/styled";

const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  color: ${props => props.theme.colors.ink};

  .photo {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: ${props => props.theme.radii.md};
    background: ${props => props.theme.colors.surface};

    img {
      transition: transform 0.4s ease;
    }
  }

  &:hover .photo img {
    transform: scale(1.03);
  }

  .title {
    font-family: ${props => props.theme.families.display};
    font-size: ${props => props.theme.fonts.headline5};
    font-weight: ${props => props.theme.fontWeight.semibold};
    line-height: 1.15;
  }

  .detail-items {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.fontColors.disabled};

    .price {
      color: ${props => props.theme.colors.secondaryDark};
      font-weight: ${props => props.theme.fontWeight.semibold};
    }
  }
`;

export default Card;
