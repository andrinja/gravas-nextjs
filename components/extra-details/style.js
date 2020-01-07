import styled from '@emotion/styled'
const Items = styled.div`
    display: grid;
    grid-template-columns:  25% 75%;
    margin: 1rem 0;

    .title {
        font-size: ${props => props.theme.fonts.headline5};
        font-weight: ${props => props.theme.fontWeight.bold};
        color: ${props => props.theme.fontColors.primary};
        padding-bottom: 1rem;
    }

    @media (max-width: 720px) {
            display: flex;
            flex-direction: column;
            align-items: center;
    }
`

export default Items;