import styled from "@emotion/styled";

// Used to be styled(MUI Grid) with container/justifyContent/alignItems props;
// a flex <footer> does the same without @material-ui/core.
export const Footer = styled.footer`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	background: ${props => props.theme.colors.background};
	padding: 2rem 3rem;
	width: 100vw;
`

export const PartnerLinks = styled.div`
	display: flex;
	flex-direction: column;
`

export const SocialLinks = styled.div`
	display: flex;
	align-items: center;

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		color: ${props => props.theme.colors.primary};
		font-size: 35px;
	}
`

export const PartnerLink = styled.a`
	text-decoration: none;
	color: ${props => props.theme.colors.darkGrey};
	font-size: ${props => props.theme.fonts.caption};
`
