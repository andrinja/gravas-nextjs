import styled from '@emotion/styled'

const Item = styled.div`
    padding: 1.5rem 1.25rem;
    border: 1px solid ${props => props.theme.colors.lightGrey};
    border-radius: ${props => props.theme.radii.md};
    background: ${props => props.theme.colors.superLightGrey};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.25rem;

    svg {
        color: ${props => props.theme.colors.primary};
        margin-bottom: 0.75rem;
    }

    .title {
        font-family: ${props => props.theme.families.body};
        font-size: ${props => props.theme.fonts.body};
        font-weight: ${props => props.theme.fontWeight.semibold};
        line-height: 1.3;
        letter-spacing: 0;
        color: ${props => props.theme.colors.ink};
    }

    p {
        color: ${props => props.theme.fontColors.disabled};
        font-size: ${props => props.theme.fonts.caption};
        line-height: 1.4;
        min-height: 1.2em;
    }

    .price {
        margin-top: auto;
        padding-top: 0.75rem;
        font-family: ${props => props.theme.families.display};
        font-size: 2.25rem;
        font-weight: ${props => props.theme.fontWeight.semibold};
        line-height: 1;
        color: ${props => props.theme.colors.secondaryDark};
    }
`
export default Item;
