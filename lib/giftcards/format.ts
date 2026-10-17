import type { CardPhoto } from '../db/schema';

/** "105,00 €" — Latvian number formatting, euro after a space. */
export function formatEuro(cents: number): string {
	const value = (cents / 100).toFixed(2).replace('.', ',');
	return `${value} €`;
}

/** "17.10.2026" from a Date or an ISO date string. */
export function formatDate(input: Date | string | null | undefined): string {
	if (!input) return '—';
	const d = typeof input === 'string' ? new Date(input.length === 10 ? `${input}T00:00:00Z` : input) : input;
	const dd = String(d.getUTCDate()).padStart(2, '0');
	const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
	return `${dd}.${mm}.${d.getUTCFullYear()}`;
}

/** "17.10.2026 14:32" in Riga time. */
export function formatDateTime(input: Date | string | null | undefined): string {
	if (!input) return '—';
	const d = typeof input === 'string' ? new Date(input) : input;
	return new Intl.DateTimeFormat('lv-LV', {
		timeZone: 'Europe/Riga',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(d);
}

/** YYYY-MM-DD for <input type="date"> and DATE columns. */
export function toIsoDate(d: Date): string {
	return d.toISOString().slice(0, 10);
}

export function addMonths(d: Date, months: number): Date {
	const copy = new Date(d);
	copy.setUTCMonth(copy.getUTCMonth() + months);
	return copy;
}

export function addDays(d: Date, days: number): Date {
	const copy = new Date(d);
	copy.setUTCDate(copy.getUTCDate() + days);
	return copy;
}

/** Whole days from today to `isoDate`; negative when in the past. */
export function daysUntil(isoDate: string, now = new Date()): number {
	const target = new Date(`${isoDate}T00:00:00Z`).getTime();
	const today = new Date(toIsoDate(now) + 'T00:00:00Z').getTime();
	return Math.round((target - today) / 86_400_000);
}

export const CARD_PHOTO_OPTIONS: { key: CardPhoto; label: string; src: string }[] = [
	{ key: 'sauna', label: 'Pirts rituāls', src: '/static/sauna-rituals/pirts-rituali-kopa.jpg' },
	{ key: 'paintball', label: 'Peintbola laukums', src: '/static/sport-activities/laukums.jpg' },
	{ key: 'guesthouse', label: 'Viesu māja', src: '/static/guesthouse/skats-uz-viesu-maju.jpg' },
	{ key: 'celebration', label: 'Svinību vieta', src: '/static/guesthouse/kazu-svinibu-vieta.jpg' },
	{ key: 'archery', label: 'Loka šaušana', src: '/static/sport-activities/lokasausana.jpg' },
];

export function photoSrc(key: CardPhoto): string {
	return CARD_PHOTO_OPTIONS.find(p => p.key === key)?.src ?? CARD_PHOTO_OPTIONS[0].src;
}
