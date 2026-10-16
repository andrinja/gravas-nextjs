import styled from '@emotion/styled';
import { media } from '../theme';

// Duration · persons · location strip under a detail page's title.
const HighlightCardItems = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   gap: 2.5rem 3.5rem;
   margin: 1.5rem 0 2.5rem;
   padding: 1.5rem 0;
   border-top: 1px solid ${props => props.theme.colors.lightGrey};
   border-bottom: 1px solid ${props => props.theme.colors.lightGrey};

   @media ${media.sm} {
      gap: 1.25rem 2rem;
   }
`

export default HighlightCardItems;
