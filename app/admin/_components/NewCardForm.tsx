'use client';

import { useActionState, useState } from 'react';
import { CARD_PHOTO_OPTIONS, formatEuro } from '../../../lib/giftcards/format';
import type { CardLanguage, CardPhoto } from '../../../lib/db/schema';
import type { FormState } from '../actions';
import { CardPreview } from './CardPreview';

export interface CardFormDefaults {
	buyerName: string;
	buyerEmail: string;
	buyerPhone: string;
	serviceLine: string;
	amount: string;
	dueDate: string;
	validUntil: string;
	cardTitle: string;
	cardSubtitle: string;
	cardNote: string;
	cardPhoto: CardPhoto;
	language: CardLanguage;
}

type Props = {
	action: (prev: FormState, form: FormData) => Promise<FormState>;
	defaults: CardFormDefaults;
	number: string;
	mode: 'create' | 'edit';
	/** Edit after the invoice went out: buyer, service, amount and due date are frozen. */
	invoiceLocked?: boolean;
};

export function NewCardForm({ action, defaults, number, mode, invoiceLocked = false }: Props) {
	const [state, formAction, pending] = useActionState(action, null);
	const initial = { ...defaults, ...(state?.raw ?? {}) } as CardFormDefaults;
	const [values, setValues] = useState<CardFormDefaults>(initial);
	const errors = state?.errors ?? {};

	const set = (key: keyof CardFormDefaults) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
		setValues(v => ({ ...v, [key]: e.target.value }));

	const field = (key: keyof CardFormDefaults, label: string, input: React.ReactNode) => (
		<label className={`field${errors[key] ? ' invalid' : ''}`}>
			{label}
			{input}
			{errors[key] ? <span className="err">{errors[key]}</span> : null}
		</label>
	);

	const step1Done = values.buyerName && values.buyerEmail && values.serviceLine && values.amount;
	const amountCents = Math.round(parseFloat(values.amount.replace(',', '.') || '0') * 100);
	const titleLines = Math.ceil((values.cardTitle.length || 1) / 30);

	return (
		<>
			<ol className="steps" aria-label="Soļi">
				<li className={step1Done ? 'done' : 'active'}>
					<span className="num">1</span>
					<span>Rēķina dati</span>
					{step1Done ? <span style={{ fontSize: 12 }}>✓</span> : null}
				</li>
				<li className={step1Done ? 'active' : ''}>
					<span className="num">2</span>
					<span>Kartes teksts un priekšskatījums</span>
				</li>
				<li>
					<span className="num">3</span>
					<span>{mode === 'create' ? 'Izveidot' : 'Saglabāt'}</span>
				</li>
			</ol>

			<div className="form-col">
				<form action={formAction} className="form" noValidate>
					{state?.message ? <p className="msg error">{state.message}</p> : null}

					<fieldset disabled={invoiceLocked}>
						<legend>1 · Rēķina dati{invoiceLocked ? ' (rēķins jau nosūtīts, nav labojami)' : ''}</legend>
						<div className="grid-2">
							{field('buyerName', 'Pircēja vārds, uzvārds', <input name="buyerName" value={values.buyerName} onChange={set('buyerName')} autoComplete="off" />)}
							{field('buyerEmail', 'E-pasts (rēķinam un kartei)', <input name="buyerEmail" type="email" value={values.buyerEmail} onChange={set('buyerEmail')} autoComplete="off" />)}
							{field('buyerPhone', 'Tālrunis (nav obligāts)', <input name="buyerPhone" type="tel" value={values.buyerPhone} onChange={set('buyerPhone')} placeholder="+371" />)}
							{field('amount', 'Summa, €', <input name="amount" inputMode="decimal" value={values.amount} onChange={set('amount')} placeholder="105" />)}
						</div>
						{field('serviceLine', 'Pakalpojums (rēķina rindā)', <input name="serviceLine" value={values.serviceLine} onChange={set('serviceLine')} placeholder="Peintbols un iekurināta pirts 3 stundu garumā, 8 personām" />)}
						<div className="grid-2">
							{field('dueDate', 'Apmaksas termiņš', <input name="dueDate" type="date" value={values.dueDate} onChange={set('dueDate')} />)}
						</div>
					</fieldset>

					<div className="panel rule" style={{ padding: 0, border: 'none' }} />

					<fieldset>
						<legend>2 · Kartes teksts</legend>
						{field('cardTitle', 'Virsraksts uz kartes', <textarea name="cardTitle" rows={2} value={values.cardTitle} onChange={set('cardTitle')} placeholder="Peintbols un iekurināta pirts 3 stundu garumā" />)}
						<div className="grid-2">
							{field('cardSubtitle', 'Apakšvirsraksts', <input name="cardSubtitle" value={values.cardSubtitle} onChange={set('cardSubtitle')} placeholder="8 personām" />)}
							{field(
								'cardPhoto',
								'Foto uz kartes',
								<select name="cardPhoto" value={values.cardPhoto} onChange={set('cardPhoto')}>
									{CARD_PHOTO_OPTIONS.map(p => (
										<option key={p.key} value={p.key}>
											{p.label}
										</option>
									))}
								</select>
							)}
						</div>
						{field('cardNote', 'Piezīme (nav obligāta)', <textarea name="cardNote" rows={2} value={values.cardNote} onChange={set('cardNote')} placeholder="Peintbola sākuma komplektā iekļautas 50 bumbiņas personai." />)}
						<div className="grid-2">
							{field('validUntil', 'Karte derīga līdz (12 mēneši)', <input name="validUntil" type="date" value={values.validUntil} onChange={set('validUntil')} />)}
							{field(
								'language',
								'Kartes valoda',
								<select name="language" value={values.language} onChange={set('language')}>
									<option value="lv">Latviešu</option>
									<option value="en">English</option>
									<option value="ru">Русский</option>
								</select>
							)}
						</div>
					</fieldset>

					{/* Disabled fieldsets are not submitted; resend the locked values. */}
					{invoiceLocked
						? (['buyerName', 'buyerEmail', 'buyerPhone', 'amount', 'serviceLine', 'dueDate'] as const).map(k => <input key={k} type="hidden" name={k} value={values[k]} />)
						: null}

					<div className="form-actions">
						<span className="hint">{mode === 'create' ? 'Izveidošana vēl neko nesūta. Rēķinu un karti nosūta no kartes lapas.' : 'Izmaiņas attiecas uz vēl nenosūtītiem dokumentiem.'}</span>
						<button type="submit" className="btn btn-primary" disabled={pending}>
							{pending ? 'Saglabā…' : mode === 'create' ? 'Izveidot karti un rēķinu →' : 'Saglabāt izmaiņas'}
						</button>
					</div>
				</form>

				<aside aria-label="Priekšskatījums" style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 24 }}>
					<span className="eyebrow">Kartes priekšskatījums · atjaunojas rakstot</span>
					<CardPreview
						data={{
							number,
							cardTitle: values.cardTitle,
							cardSubtitle: values.cardSubtitle,
							cardNote: values.cardNote,
							cardPhoto: values.cardPhoto,
							language: values.language,
							validUntil: values.validUntil,
						}}
					/>
					<div className="grid-2">
						<div className="panel" style={{ padding: '14px 16px', gap: 6 }}>
							<span className="tile k eyebrow" style={{ color: 'var(--muted)' }}>
								Rēķins {number}
							</span>
							<span>
								{values.buyerName || '—'} · {values.buyerEmail || '—'}
							</span>
							<span style={{ color: 'var(--ink-2)' }}>
								1 × Dāvanu karte Nr. {number} · <strong>{Number.isFinite(amountCents) && amountCents > 0 ? formatEuro(amountCents) : '—'}</strong>
							</span>
							<span className="hint">Termiņš {values.dueDate || '—'} · PVN netiek piemērots</span>
						</div>
						<div className="panel" style={{ padding: '14px 16px', gap: 6 }}>
							<span className="eyebrow" style={{ color: 'var(--muted)' }}>
								Pārbaude
							</span>
							<span className={/.+@.+\..+/.test(values.buyerEmail) ? 'ok' : 'hint'}>{/.+@.+\..+/.test(values.buyerEmail) ? '✓ E-pasts derīgs' : '· E-pasts vēl nav ievadīts'}</span>
							<span className={titleLines <= 2 ? 'ok' : 'hint'} style={titleLines > 2 ? { color: 'var(--gold)' } : undefined}>
								{titleLines <= 2 ? '✓ Virsraksts ietilpst divās rindās' : `! Virsraksts garš: ~${titleLines} rindas`}
							</span>
							<span className={values.cardNote.length <= 160 ? 'ok' : 'hint'} style={values.cardNote.length > 160 ? { color: 'var(--gold)' } : undefined}>
								{values.cardNote.length <= 160 ? '✓ Piezīme ietilpst' : `! Piezīme gara: ${values.cardNote.length} zīmes`}
							</span>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}
