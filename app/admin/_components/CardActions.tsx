'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { CardStatus } from '../../../lib/db/schema';
import { can } from '../../../lib/giftcards/status';
import { sendInvoiceAction, sendCardAction, setPaidAction, redeemAction, cancelAction, addNoteAction } from '../actions';

type Props = { id: string; status: CardStatus; buyerEmail: string; paidNote: string | null; invoiceSentAt: string | null };

/**
 * The buttons and the paid switch on the card page. Every action confirms
 * first, because each one either emails a customer or changes money state.
 */
export function CardActions({ id, status, buyerEmail, paidNote, invoiceSentAt }: Props) {
	const router = useRouter();
	const [pending, start] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const [note, setNote] = useState('');

	const run = (fn: () => Promise<{ message: string }>) =>
		start(async () => {
			const res = await fn();
			setMessage(res.message);
			router.refresh();
		});

	const paid = status === 'paid' || status === 'card_sent' || status === 'redeemed';

	return (
		<>
			{message ? <p className={`msg${/neizdevās|nav atļauta|kļūda/i.test(message) ? ' error' : ''}`}>{message}</p> : null}

			<section className="panel" aria-labelledby="s-rekins">
				<div className="head">
					<div className="stack" style={{ gap: 0 }}>
						<h2 id="s-rekins">1 · Rēķins</h2>
						<span className="hint">{invoiceSentAt ? `Nosūtīts ${invoiceSentAt}` : 'Vēl nav nosūtīts'}</span>
					</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<button type="button" className="btn btn-quiet btn-sm" disabled title="PDF ģenerēšana nāk nākamajā solī">
							PDF
						</button>
						<button
							type="button"
							className={`btn btn-sm ${invoiceSentAt ? 'btn-outline' : 'btn-primary'}`}
							disabled={pending || !can.sendInvoice(status)}
							onClick={() => {
								if (confirm(`Nosūtīt rēķinu uz ${buyerEmail}?`)) run(() => sendInvoiceAction(id));
							}}
						>
							{invoiceSentAt ? 'Nosūtīt vēlreiz' : 'Nosūtīt rēķinu'}
						</button>
					</div>
				</div>
				<div className="rule" />
				<label className="switch">
					<span className="stack" style={{ gap: 0 }}>
						<span style={{ fontWeight: 600 }}>Rēķins apmaksāts</span>
						<span className="hint">{paid ? paidNote || 'Atzīmēts kā apmaksāts' : 'Pārslēdz, kad nauda ir kontā. Tikai tad var sūtīt karti.'}</span>
					</span>
					<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
						<span style={{ fontSize: 12, fontWeight: 600, color: paid ? 'var(--green)' : 'var(--muted)' }}>{paid ? 'Jā' : 'Nē'}</span>
						<input
							type="checkbox"
							role="switch"
							aria-label="Rēķins apmaksāts"
							checked={paid}
							disabled={pending || (paid ? !can.markUnpaid(status) : !can.markPaid(status))}
							onChange={e => {
								if (e.target.checked) {
									const n = prompt('Piezīme par maksājumu (banka, summa, datums) — nav obligāta:', '') ?? null;
									if (n === null) return;
									run(() => setPaidAction(id, true, n));
								} else if (confirm('Atsaukt apmaksas atzīmi?')) {
									run(() => setPaidAction(id, false));
								}
							}}
						/>
					</span>
				</label>
			</section>

			<section className={`panel${status === 'paid' ? ' accent' : ''}`} aria-labelledby="s-karte">
				<div className="head">
					<div className="stack" style={{ gap: 0 }}>
						<h2 id="s-karte">2 · Dāvanu karte</h2>
						<span className="hint">{status === 'card_sent' || status === 'redeemed' ? 'Nosūtīta' : paid ? 'Gatava sūtīšanai' : 'Pieejams pēc apmaksas'}</span>
					</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<button type="button" className="btn btn-quiet btn-sm" disabled title="PDF ģenerēšana nāk nākamajā solī">
							Priekšskatīt PDF
						</button>
						<button
							type="button"
							className="btn btn-primary btn-sm"
							disabled={pending || !can.sendCard(status)}
							onClick={() => {
								if (confirm(`Nosūtīt dāvanu karti uz ${buyerEmail}?`)) run(() => sendCardAction(id));
							}}
						>
							{status === 'card_sent' || status === 'redeemed' ? 'Nosūtīt vēlreiz' : 'Nosūtīt karti tagad'}
						</button>
					</div>
				</div>
			</section>

			<section className="panel" aria-labelledby="s-izmantota">
				<div className="head">
					<div className="stack" style={{ gap: 0 }}>
						<h2 id="s-izmantota">3 · Izmantošana</h2>
						<span className="hint">Kad viesi ir bijuši, atzīmē karti kā izmantotu. Pieejams pēc kartes nosūtīšanas.</span>
					</div>
					<button
						type="button"
						className="btn btn-quiet btn-sm"
						disabled={pending || !can.redeem(status)}
						onClick={() => {
							const n = prompt('Datums vai piezīme par apmeklējumu (nav obligāta):', '') ?? null;
							if (n === null) return;
							run(() => redeemAction(id, n));
						}}
					>
						Atzīmēt kā izmantotu
					</button>
				</div>
			</section>

			<section className="panel" aria-labelledby="s-piezime">
				<h2 id="s-piezime">Iekšēja piezīme</h2>
				<textarea className="field" rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Redzama tikai šeit, nekad klientam" style={{ padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 2 }} />
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
					<button type="button" className="btn btn-outline btn-sm" disabled={pending || !note.trim()} onClick={() => run(async () => { const r = await addNoteAction(id, note); setNote(''); return r; })}>
						Pievienot piezīmi
					</button>
					<button
						type="button"
						className="btn btn-danger btn-sm"
						disabled={pending || !can.cancel(status)}
						onClick={() => {
							const reason = prompt('Atcelt karti. Iemesls (nav obligāts):', '') ?? null;
							if (reason === null) return;
							run(() => cancelAction(id, reason));
						}}
					>
						Atcelt karti
					</button>
				</div>
			</section>
		</>
	);
}
