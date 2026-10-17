import fs from 'node:fs';
import path from 'node:path';
import { Svg, Path, Rect } from '@react-pdf/renderer';

/**
 * The wordmark from public/static/logo.svg as react-pdf vector elements.
 * The renderer's <Image> cannot take SVG, so the file's <path> and <rect>
 * elements are parsed once and re-emitted. The source holds only those two
 * element types with plain attributes (checked when this was written).
 */
type El = { tag: 'path' | 'rect'; attrs: Record<string, string> };

let parsed: { viewBox: string; els: El[] } | null = null;

function load() {
	if (parsed) return parsed;
	const xml = fs.readFileSync(path.join(process.cwd(), 'public', 'static', 'logo.svg'), 'utf8');
	const viewBox = xml.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 339 61';
	const els: El[] = [];
	for (const m of xml.matchAll(/<(path|rect)\b([^>]*?)\/?>/g)) {
		const attrs: Record<string, string> = {};
		for (const a of m[2].matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
		els.push({ tag: m[1] as El['tag'], attrs });
	}
	parsed = { viewBox, els };
	return parsed;
}

/** `width` in points; height follows the viewBox ratio. `fill` overrides every colour (for dark grounds). */
export function Logo({ width, fill }: { width: number; fill?: string }) {
	const { viewBox, els } = load();
	const [, , vw, vh] = viewBox.split(/\s+/).map(Number);
	const height = (width * vh) / vw;
	return (
		<Svg width={width} height={height} viewBox={viewBox}>
			{els.map((el, i) =>
				el.tag === 'path' ? (
					<Path key={i} d={el.attrs.d} fill={fill ?? el.attrs.fill ?? '#1E514B'} />
				) : (
					<Rect
						key={i}
						x={Number(el.attrs.x ?? 0)}
						y={Number(el.attrs.y ?? 0)}
						width={Number(el.attrs.width ?? 0)}
						height={Number(el.attrs.height ?? 0)}
						fill={fill ?? el.attrs.fill ?? '#1E514B'}
						transform={el.attrs.transform}
					/>
				)
			)}
		</Svg>
	);
}
