import styled from '@emotion/styled';

export const Card = styled.a`
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

    .label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        font-weight: ${props => props.theme.fontWeight.semibold};

        .arrow {
            color: ${props => props.theme.colors.secondaryDark};
            transition: transform 0.2s ease;
        }
    }

    &:hover .label .arrow {
        transform: translateX(3px);
    }
`;
