import styled from '@emotion/styled';

const Card = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.875rem;
    align-items: center;

    svg {
        grid-row: 1 / span 2;
        color: ${props => props.theme.colors.secondaryDark};
    }

    .label {
        font-size: ${props => props.theme.fonts.body};
        font-weight: ${props => props.theme.fontWeight.semibold};
        color: ${props => props.theme.colors.ink};
        line-height: 1.3;
    }

    .caption {
        font-size: ${props => props.theme.fonts.caption};
        color: ${props => props.theme.fontColors.disabled};
        line-height: 1.3;
    }
`

export default Card;
