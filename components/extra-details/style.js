import styled from '@emotion/styled'
import { media } from '../theme';

const Items = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    column-gap: 3rem;
    margin: 1.5rem 0 3rem;

    .title {
        font-family: ${props => props.theme.families.display};
        font-size: ${props => props.theme.fonts.headline4};
        font-weight: ${props => props.theme.fontWeight.semibold};
        line-height: 1.12;
        color: ${props => props.theme.colors.ink};
    }

    @media ${media.sm} {
        grid-template-columns: 1fr;
        row-gap: 1rem;
    }
`

export default Items;
