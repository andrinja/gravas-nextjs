import styled from '@emotion/styled'
import { media } from '../theme';

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.5rem 2rem;
    margin-top: 1rem;

    @media ${media.md} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media ${media.sm} {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`

export default Cards;
