import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCardDetail } from '../../../../../lib/giftcards/service';
import { formatDate, formatDateTime, formatEuro, CARD_PHOTO_OPTIONS } from '../../../../../lib/giftcards/format';
import { can } from '../../../../../lib/giftcards/status';
import { StatusPill } from '../../../_components/StatusPill';
import { CardPreview } from '../../../_components/CardPreview';
import { CardActions } from '../../../_components/CardActions';
import type { EventType } from '../../../../../lib/db/schema';

const EVENT_LABELS: Record<EventType, string> = {
	requested: 'Pieprasījums no mājaslapas',
	created: 'Karte un rēķins izveidoti',
	updated: 'Dati laboti',
	invoice_sent: 'Rēķins nosūtīts',
	invoice_opened: 'Rēķins atvērts',
	email_delivered: 'E-pasts piegādāts',
	email_opened: 'E-pasts atvērts',
	email_bounced: 'E-pasts nav piegādāts',
	marked_paid: 'Atzīmēts kā apmaksāts',
	marked_unpaid: 'Apmaksa atsaukta',
	card_sent: 'Dāvanu karte nosūtīta',
	redeemed: 'Karte izmantota',
	cancelled: 'Karte atcelta',
	note: 'Piezīme',
	email_failed: 'E-pasta kļūda',
};
const EVENT_TONE: Partial<Record<EventType, string>> = { marked_paid: 'gold', email_failed: 'red', email_bounced: 'red', requested: 'muted', note: 'muted', email_delivered: 'muted', email_opened: 'muted' };

export default async function CardPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
	const { id } = await params;
	const { created } = await searchParams;
	const detail = await getCardDetail(id);
	if (!detail) notFound();
	const { card, invoice, events } = detail;
	const photoLabel = CARD_PHOTO_OPTIONS.find(p => p.key === card.cardPhoto)?.label ?? card.cardPhoto;

	return (
		<>
			{created && card.status === 'draft' ? <p className="msg">Karte {card.number} un rēķins izveidoti. Nekas vēl nav nosūtīts.</p> : null}
			<div className="page-head">
				<div className="stack" style={{ gap: 6 }}>
					<Link href="/admin" className="crumb">
						← Pārskats
					</Link>
					<div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
						<h1>Dāvanu karte {card.number}</h1>
						<StatusPill card={card} suffix={card.status === 'paid' ? 'karte vēl nav nosūtīta' : undefined} />
					</div>
					<span className="sub" style={{ color: 'var(--muted)' }}>
						{card.buyerName} · {card.buyerEmail}
						{card.buyerPhone ? ` · ${card.buyerPhone}` : ''} · {card.serviceLine} · {formatEuro(card.amountCents)}
					</span>
				</div>
				<div style={{ display: 'flex', gap: 8 }}>
					{can.edit(card.status) ? (
						<Link href={`/admin/cards/${card.id}/edit`} className="btn btn-quiet btn-sm">
							Labot
						</Link>
					) : null}
				</div>
			</div>

			<div className="two-col">
				<div className="stack" style={{ gap: 16 }}>
					<CardActions
						id={card.id}
						status={card.status}
						buyerEmail={card.buyerEmail}
						paidNote={card.paidNote}
						invoiceSentAt={card.invoiceSentAt ? formatDateTime(card.invoiceSentAt) : null}
					/>
				</div>

				<div className="stack" style={{ gap: 16 }}>
					<section className="panel" aria-label="Kartes priekšskatījums">
						<div className="head">
							<h2>Karte</h2>
							<span className="hint">
								Derīga līdz {formatDate(card.validUntil)} · {card.language.toUpperCase()} · foto: {photoLabel}
							</span>
						</div>
						<CardPreview data={card} />
					</section>

					<section className="panel" aria-label="Rēķins">
						<div className="head">
							<h2>Rēķins {invoice?.number ?? card.number}</h2>
							<span className="hint">
								Izrakstīts {formatDate(invoice?.issueDate)} · termiņš {formatDate(card.dueDate)}
							</span>
						</div>
						<div className="rule" />
						<div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '6px 16px', fontSize: 13 }}>
							<span style={{ color: 'var(--ink-2)' }}>{invoice?.lineDescription ?? card.serviceLine}</span>
							<strong>{formatEuro(card.amountCents)}</strong>
							<span style={{ color: 'var(--muted)' }}>PVN</span>
							<span style={{ color: 'var(--muted)' }}>netiek piemērots</span>
							<span style={{ fontWeight: 600, borderTop: '1px solid var(--line)', paddingTop: 6 }}>Kopā apmaksai</span>
							<span style={{ fontWeight: 600, borderTop: '1px solid var(--line)', paddingTop: 6 }}>{formatEuro(card.amountCents)}</span>
						</div>
					</section>

					<section className="panel" aria-labelledby="s-notikumi">
						<h2 id="s-notikumi">Notikumi</h2>
						<ol className="timeline">
							{events.map(e => (
								<li key={e.id}>
									<span className={`dot ${EVENT_TONE[e.type] ?? ''}`} aria-hidden />
									<span className="stack" style={{ gap: 2 }}>
										<span className="t">{EVENT_LABELS[e.type]}</span>
										<span className="m">
											{formatDateTime(e.createdAt)} · {e.actor}
											{e.note ? ` · ${e.note}` : ''}
											{e.meta && (e.meta as { dryRun?: boolean }).dryRun ? ' · izmēģinājuma režīms, e-pasts nav aizgājis' : ''}
										</span>
									</span>
								</li>
							))}
						</ol>
					</section>
				</div>
			</div>
		</>
	);
}
