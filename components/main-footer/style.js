import styled from "@emotion/styled";
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'

export const Footer = styled(Grid)`
	 background: ${props => props.theme.colors.background};
	 padding: 2rem 3rem;
	 width: 100vw;
`

export const PartnerLink = styled.a`
	text-decoration: none;
	color: ${props => props.theme.colors.darkGrey};
	font-size: ${props => props.theme.fonts.caption};
`