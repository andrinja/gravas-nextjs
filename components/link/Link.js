import {default as NextLink } from 'next/link'

export const Link = ({ children, href }) => {

	//detect locale
	return <NextLink href={href} locale="en">{children}</NextLink>
}