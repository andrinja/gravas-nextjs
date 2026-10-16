import styled from '@emotion/styled'
import { media } from '../theme';

export const Section = styled.section`
   display: flex;
   flex-direction: column;
   gap: 1.75rem;
   margin: 4.5rem 0 1.5rem;

   .heading {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
   }

   h2 {
      font-size: ${props => props.theme.fonts.headline3};
   }

   .all {
      font-size: ${props => props.theme.fonts.caption};
      font-weight: ${props => props.theme.fontWeight.semibold};
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.primary};
      border-bottom: 1px solid ${props => props.theme.colors.primary};
      padding-bottom: 2px;
   }

   @media ${media.sm} {
      margin-top: 3rem;
      gap: 1.25rem;
   }
`

const CardItems = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: 1.5rem;

   @media ${media.md} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }
   @media ${media.xs} {
      grid-template-columns: 1fr;
   }
`
export default CardItems;
