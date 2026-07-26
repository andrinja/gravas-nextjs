import styled from '@emotion/styled'
import { media } from '../theme';

const ServiceDescriptions = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-row-gap: 2rem;

    .item {
        display: grid;
        grid-template-columns:  25% 75%;

        .label {
            font-size: ${props => props.theme.fonts.headline5};
            font-weight: ${props => props.theme.fontWeight.bold};
            color: ${props => props.theme.fontColors.primary};
        }
        .description {
            color: ${props => props.theme.fontColors.secondary}
        }

        @media ${media.sm} {
            display: flex;
            flex-direction: column;
            align-items: center;

            .label {
                font-size: ${props => props.theme.fonts.headline5};
                padding: 2rem;
            }
        }
    }
`

export default ServiceDescriptions;