import styled from '@emotion/styled'
import { media } from '../theme';

// Intro text under a hero: optional display title, then the description in
// a measure that stays readable on wide screens.
const HeaderText = styled.div`
    width: 100%;
    margin: 2.5rem 0 1.5rem;
    display: grid;
    gap: 1rem;

    .title {
        font-size: ${props => props.theme.fonts.headline3};
        color: ${props => props.theme.colors.ink};
    }
    .description {
        color: ${props => props.theme.fontColors.secondary};
        max-width: 68ch;
        font-size: 1.125rem;
    }

    @media ${media.sm} {
        margin: 1.75rem 0 1rem;
        .description {
            font-size: ${props => props.theme.fonts.body};
        }
    }
`

export default HeaderText
