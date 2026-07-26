import type { SVGProps } from 'react';
import { ICONS, type IconName } from './registry';

/**
 * Turn an icon token as it appears in static/data/** into a registry key.
 *
 * The data is not consistent: the same icon appears as both "bed" and
 * "bed.svg", and 26 of the 60 tokens carry the suffix. The ".svg" is a lie in
 * every case — these resolve to .js React components, not SVG files. Rather
 * than rewrite the data and hope nobody reintroduces a suffix, the parse is
 * tolerant and stays tolerant.
 *
 * Returns null for anything unknown, empty or missing. The previous helper
 * (lib/toCapitalCase.js) threw on null and on "" — `word[0].toUpperCase()` on
 * an empty segment — so one bad data entry could take down a whole page.
 */
export function iconNameFromToken(token: string | null | undefined): IconName | null {
	if (!token) return null;
	const pascal = token
		.replace(/\.svg$/i, '')
		.split('-')
		.filter(Boolean)
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join('');
	return pascal in ICONS ? (pascal as IconName) : null;
}

type IconProps = { name?: string | null } & SVGProps<SVGSVGElement>;

/** Renders a data-driven icon by token. Unknown tokens render nothing. */
export function Icon({ name, ...rest }: IconProps) {
	const key = iconNameFromToken(name);

	if (!key) {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn(`[Icon] unknown icon token: ${JSON.stringify(name)}`);
		}
		return null;
	}

	const Svg = ICONS[key];
	return <Svg {...rest} />;
}

export default Icon;
