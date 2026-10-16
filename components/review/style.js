import styled from '@emotion/styled'

export const ReviewList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.5rem;
    margin: 1rem 0 2rem;
`

const Item = styled.blockquote`
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    padding: 1.75rem;
    border: 1px solid ${props => props.theme.colors.lightGrey};
    border-radius: ${props => props.theme.radii.md};
    background: ${props => props.theme.colors.superLightGrey};
    color: ${props => props.theme.fontColors.secondary};

    &:before {
        content: "“";
        font-family: ${props => props.theme.families.display};
        font-size: 3rem;
        line-height: 0.6;
        color: ${props => props.theme.colors.secondaryDark};
    }

    p {
        margin: 0;
    }

    footer {
        margin-top: auto;
        padding-top: 0.5rem;
        font-family: ${props => props.theme.families.display};
        font-size: ${props => props.theme.fonts.headline5};
        font-weight: ${props => props.theme.fontWeight.semibold};
        color: ${props => props.theme.colors.ink};
    }
`

export default Item;
