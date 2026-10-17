import path from 'node:path';
import { Font } from '@react-pdf/renderer';

/**
 * The same two families the site uses, as TTF for the PDF renderer (it does
 * not read woff2). Files live in lib/pdf/fonts and are included in the
 * serverless bundle via outputFileTracingIncludes in next.config.js.
 * Registering twice is harmless; the module may be evaluated per worker.
 */
const dir = path.join(process.cwd(), 'lib', 'pdf', 'fonts');

let registered = false;
export function registerFonts() {
	if (registered) return;
	registered = true;
	Font.register({
		family: 'Raleway',
		fonts: [
			{ src: path.join(dir, 'Raleway-Regular.ttf'), fontWeight: 400 },
			{ src: path.join(dir, 'Raleway-SemiBold.ttf'), fontWeight: 600 },
		],
	});
	Font.register({
		family: 'Cormorant',
		fonts: [
			{ src: path.join(dir, 'CormorantGaramond-SemiBold.ttf'), fontWeight: 600 },
			{ src: path.join(dir, 'CormorantGaramond-SemiBoldItalic.ttf'), fontWeight: 600, fontStyle: 'italic' },
		],
	});
	// Latvian words hyphenated by an English dictionary look wrong; wrap whole words.
	Font.registerHyphenationCallback(word => [word]);
}

export const COLORS = {
	bg: '#F6F2E8',
	surface: '#EFE9DB',
	ink: '#1B2E2B',
	ink2: '#3E4B48',
	muted: '#5A6663',
	line: '#D9D2C1',
	green: '#1E514B',
	gold: '#85661F',
	goldBright: '#E3C565',
	white: '#FFFFFF',
};
