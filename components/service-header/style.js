import styled from '@emotion/styled'
import { media } from '../theme';

const HeaderText = styled.div`
 margin: 2.5rem 0 0.5rem;

 .title {
   font-size: ${props => props.theme.fonts.headline2};
   color: ${props => props.theme.colors.ink};
   max-width: 20ch;
 }

 @media ${media.sm} {
   margin-top: 1.75rem;
 }
`

export default HeaderText;
