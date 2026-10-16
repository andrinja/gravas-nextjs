import { default as NextLink } from 'next/link'

// Thin wrapper over next/link that forwards every prop. It used to pass only
// `href` and `children`, which silently dropped className, aria-* and rel on
// every caller — the gallery button on detail pages rendered as a bare,
// unstyled anchor underneath the hero photo and was invisible for years.
export const Link = ({ children, ...props }) => (
	<NextLink {...props}>{children}</NextLink>
)
