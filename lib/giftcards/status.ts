import type { CardStatus, GiftCard } from '../db/schema';
import { daysUntil } from './format';

/** Days past the due date before an unpaid invoice counts as stale. */
export const OVERDUE_GRACE_DAYS = 7;
/** A sent, unredeemed card is "expiring" this many days before validUntil. */
export const EXPIRING_WINDOW_DAYS = 30;

/**
 * What the dashboard shows. The stored status is the lifecycle step; these
 * add the two time-derived conditions the user wants to filter on.
 */
export type ViewStatus = CardStatus | 'overdue' | 'expired';

export interface CardView {
	view: ViewStatus;
	label: string;
	tone: 'neutral' | 'gold' | 'green' | 'red' | 'muted';
	expiringSoon: boolean;
	daysOverdue: number;
}

export const STATUS_LABELS: Record<ViewStatus, string> = {
	draft: 'Melnraksts',
	invoice_sent: 'Gaida apmaksu',
	paid: 'Apmaksāta',
	card_sent: 'Karte nosūtīta',
	redeemed: 'Izmantota',
	cancelled: 'Atcelta',
	overdue: 'Novecojusi',
	expired: 'Beigusies',
};

export function cardView(card: Pick<GiftCard, 'status' | 'dueDate' | 'validUntil'>, now = new Date()): CardView {
	const dueIn = daysUntil(card.dueDate, now);
	const validFor = daysUntil(card.validUntil, now);

	if (card.status === 'invoice_sent' && dueIn < -OVERDUE_GRACE_DAYS) {
		return { view: 'overdue', label: `${STATUS_LABELS.overdue} · ${-dueIn} d.`, tone: 'red', expiringSoon: false, daysOverdue: -dueIn };
	}
	if ((card.status === 'card_sent' || card.status === 'paid') && validFor < 0) {
		return { view: 'expired', label: STATUS_LABELS.expired, tone: 'muted', expiringSoon: false, daysOverdue: 0 };
	}
	const expiringSoon = (card.status === 'card_sent' || card.status === 'paid') && validFor >= 0 && validFor <= EXPIRING_WINDOW_DAYS;
	const tone: CardView['tone'] =
		card.status === 'paid' ? 'gold' : card.status === 'card_sent' ? 'green' : card.status === 'redeemed' || card.status === 'cancelled' ? 'muted' : 'neutral';
	return { view: card.status, label: STATUS_LABELS[card.status], tone, expiringSoon, daysOverdue: 0 };
}

/** Dashboard tabs, in display order. */
export const FILTERS = [
	{ key: 'all', label: 'Visas' },
	{ key: 'draft', label: 'Melnraksti' },
	{ key: 'invoice_sent', label: 'Gaida apmaksu' },
	{ key: 'paid', label: 'Apmaksātas' },
	{ key: 'card_sent', label: 'Nosūtītas' },
	{ key: 'redeemed', label: 'Izmantotas' },
	{ key: 'overdue', label: 'Novecojušas' },
	{ key: 'expiring', label: 'Beidzas drīz' },
	{ key: 'cancelled', label: 'Atceltas' },
] as const;
export type FilterKey = (typeof FILTERS)[number]['key'];

export function matchesFilter(card: GiftCard, filter: FilterKey, now = new Date()): boolean {
	const v = cardView(card, now);
	switch (filter) {
		case 'all':
			return true;
		case 'overdue':
			return v.view === 'overdue';
		case 'expiring':
			return v.expiringSoon;
		case 'invoice_sent':
			return card.status === 'invoice_sent' && v.view !== 'overdue';
		default:
			return card.status === filter;
	}
}

/** Which actions the card page may offer in each stored status. */
export const can = {
	edit: (s: CardStatus) => s === 'draft' || s === 'invoice_sent',
	editInvoice: (s: CardStatus) => s === 'draft',
	sendInvoice: (s: CardStatus) => s === 'draft' || s === 'invoice_sent',
	markPaid: (s: CardStatus) => s === 'draft' || s === 'invoice_sent',
	markUnpaid: (s: CardStatus) => s === 'paid',
	sendCard: (s: CardStatus) => s === 'paid' || s === 'card_sent',
	redeem: (s: CardStatus) => s === 'card_sent',
	cancel: (s: CardStatus) => s !== 'redeemed' && s !== 'cancelled',
};
