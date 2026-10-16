import styled from '@emotion/styled'
import { media } from '../theme';

// Detail pages: a serif label column and a prose column.
const ServiceDescriptions = styled.div`
    margin: 1.5rem 0 3rem;
    display: grid;
    row-gap: 2.5rem;

    .item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
        column-gap: 3rem;

        .label {
            font-family: ${props => props.theme.families.display};
            font-size: ${props => props.theme.fonts.headline4};
            font-weight: ${props => props.theme.fontWeight.semibold};
            line-height: 1.12;
            color: ${props => props.theme.colors.ink};
        }
        .description {
            color: ${props => props.theme.fontColors.secondary};
            max-width: 68ch;
        }

        @media ${media.sm} {
            grid-template-columns: 1fr;
            row-gap: 0.75rem;
        }
    }
`

export default ServiceDescriptions;
