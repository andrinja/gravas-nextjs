import type { GiftCard } from '../../../lib/db/schema';
import { cardView } from '../../../lib/giftcards/status';

export function StatusPill({ card, suffix }: { card: Pick<GiftCard, 'status' | 'dueDate' | 'validUntil'>; suffix?: string }) {
	const v = cardView(card);
	return (
		<span className={`pill ${v.tone}`}>
			{v.label}
			{suffix ? ` · ${suffix}` : ''}
		</span>
	);
}
