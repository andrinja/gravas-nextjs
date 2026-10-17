import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCard } from '../../../../../../lib/giftcards/service';
import { can } from '../../../../../../lib/giftcards/status';
import { updateCardAction } from '../../../../actions';
import { NewCardForm } from '../../../../_components/NewCardForm';

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const card = await getCard(id);
	if (!card) notFound();
	if (!can.edit(card.status)) redirect(`/admin/cards/${id}`);
	const action = updateCardAction.bind(null, id);
	return (
		<>
			<div className="stack" style={{ gap: 6 }}>
				<Link href={`/admin/cards/${id}`} className="crumb">
					← Karte {card.number}
				</Link>
				<h1>Labot karti {card.number}</h1>
			</div>
			<NewCardForm
				mode="edit"
				action={action}
				number={card.number}
				invoiceLocked={!can.editInvoice(card.status)}
				defaults={{
					buyerName: card.buyerName,
					buyerEmail: card.buyerEmail,
					buyerPhone: card.buyerPhone ?? '',
					serviceLine: card.serviceLine,
					amount: (card.amountCents / 100).toFixed(2).replace('.', ',').replace(',00', ''),
					dueDate: card.dueDate,
					validUntil: card.validUntil,
					cardTitle: card.cardTitle,
					cardSubtitle: card.cardSubtitle ?? '',
					cardNote: card.cardNote ?? '',
					cardPhoto: card.cardPhoto,
					language: card.language,
				}}
			/>
		</>
	);
}
