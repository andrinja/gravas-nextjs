import styled from '@emotion/styled'
import { media } from '../theme';

const Item = styled.div`
    .detail {
        display: grid;
        grid-template-columns: minmax(8rem, 1fr) minmax(0, 5fr);
        column-gap: 2rem;
        padding: 1.25rem 0;

        h3 {
            font-size: ${props => props.theme.fonts.body};
            font-weight: ${props => props.theme.fontWeight.semibold};
            color: ${props => props.theme.colors.ink};
        }
        p {
            color: ${props => props.theme.fontColors.secondary};
            max-width: 68ch;
        }
    }
    .line {
        height: 1px;
        width: 100%;
        background: ${props => props.theme.colors.lightGrey};
    }
    &:last-child .line {
        display: none;
    }
    @media ${media.sm} {
        .detail {
            grid-template-columns: 1fr;
            row-gap: 0.25rem;
        }
    }
`
export default Item;
