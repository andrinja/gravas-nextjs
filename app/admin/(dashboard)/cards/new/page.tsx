import Link from 'next/link';
import { createCardAction } from '../../../actions';
import { NewCardForm } from '../../../_components/NewCardForm';
import { addDays, addMonths, toIsoDate } from '../../../../../lib/giftcards/format';
import { db, schema } from '../../../../../lib/db';
import { eq } from 'drizzle-orm';

/** Preview of the number the card will get; allocated for real on save. */
async function nextNumberPreview(now = new Date()) {
	const year = now.getUTCFullYear();
	const [row] = await db.select({ last: schema.numberSequences.last }).from(schema.numberSequences).where(eq(schema.numberSequences.year, year));
	return `${year}-${String((row?.last ?? 0) + 1).padStart(4, '0')}`;
}

export default async function NewCardPage() {
	const now = new Date();
	const number = await nextNumberPreview(now);
	return (
		<>
			<div className="stack" style={{ gap: 6 }}>
				<Link href="/admin" className="crumb">
					← Pārskats
				</Link>
				<h1>Jauna dāvanu karte</h1>
				<span className="sub" style={{ color: 'var(--muted)' }}>
					Karte {number} · rēķins {number} tiks izveidots kopā ar karti
				</span>
			</div>
			<NewCardForm
				mode="create"
				action={createCardAction}
				number={number}
				defaults={{
					buyerName: '',
					buyerEmail: '',
					buyerPhone: '',
					serviceLine: '',
					amount: '',
					dueDate: toIsoDate(addDays(now, 7)),
					validUntil: toIsoDate(addMonths(now, 12)),
					cardTitle: '',
					cardSubtitle: '',
					cardNote: '',
					cardPhoto: 'sauna',
					language: 'lv',
				}}
			/>
		</>
	);
}
