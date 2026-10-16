import styled from "@emotion/styled";
import { media } from "../theme";

// Full-bleed band on the darker cream, content aligned to the page column.
export const Footer = styled.footer`
	background: ${props => props.theme.colors.surface};
	color: ${props => props.theme.fontColors.secondary};
	font-size: ${props => props.theme.fonts.caption};
	width: 100%;
`

export const FooterInner = styled.div`
	max-width: ${props => props.theme.layout.maxWidth};
	margin: 0 auto;
	padding: 3rem ${props => props.theme.layout.gutter};
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	gap: 2rem;

	@media ${media.md} {
		padding: 2.5rem 1.5rem;
	}
	@media ${media.sm} {
		padding: 2rem ${props => props.theme.layout.gutterSm};
		flex-direction: column;
	}
`

export const Brand = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;

	a {
		color: inherit;
	}
`

export const PartnerLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.375rem;

	h5 {
		font-size: ${props => props.theme.fonts.eyebrow};
		font-weight: ${props => props.theme.fontWeight.semibold};
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: ${props => props.theme.fontColors.disabled};
		margin-bottom: 0.25rem;
	}
`

export const SocialLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		color: ${props => props.theme.colors.primary};
		font-size: 26px;
	}
`

export const PartnerLink = styled.a`
	color: ${props => props.theme.fontColors.secondary};
	&:hover {
		color: ${props => props.theme.colors.primary};
	}
`
