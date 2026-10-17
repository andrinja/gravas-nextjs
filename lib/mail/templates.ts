import type { GiftCard, Invoice } from '../db/schema';
import { formatDate, formatEuro } from '../giftcards/format';
import { CONTACT } from '../giftcards/cardCopy';

/**
 * The two customer emails, as text and as a small table-based HTML in the
 * site's colours (inline styles only; email clients ignore stylesheets).
 * Subject lines are deliberately plain: a number and what it is.
 */

const COLORS = { bg: '#F6F2E8', ink: '#1B2E2B', ink2: '#3E4B48', muted: '#5A6663', line: '#D9D2C1', green: '#1E514B', gold: '#85661F', white: '#FFFFFF' };

function escape(s: string) {
	return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
}

function shell(title: string, bodyHtml: string, footNote: string) {
	return `<!doctype html>
<html lang="lv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escape(title)}</title></head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLORS.white};border:1px solid ${COLORS.line};border-radius:3px;">
<tr><td style="padding:28px 32px 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.1;color:${COLORS.green};letter-spacing:0.12em;">GRAVAS</td></tr>
<tr><td style="padding:4px 32px 0 32px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.gold};">Pirts rituāli · viesu māja · aktīvā atpūta</td></tr>
<tr><td style="padding:24px 32px 8px 32px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.ink};">${bodyHtml}</td></tr>
<tr><td style="padding:16px 32px 28px 32px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.muted};border-top:1px solid ${COLORS.line};">
${escape(footNote)}<br>
Gravas · Likverteni, Vecsaules pagasts, Bauskas novads · <a href="tel:${CONTACT.phone.replace(/\s/g, '')}" style="color:${COLORS.green};text-decoration:none;">${CONTACT.phone}</a> · <a href="mailto:${CONTACT.email}" style="color:${COLORS.green};text-decoration:none;">${CONTACT.email}</a> · <a href="https://gravas.lv" style="color:${COLORS.green};text-decoration:none;">gravas.lv</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function row(label: string, value: string, strong = false) {
	return `<tr><td style="padding:6px 0;color:${COLORS.muted};font-size:13px;">${escape(label)}</td><td align="right" style="padding:6px 0;color:${COLORS.ink};font-size:${strong ? 17 : 14}px;font-weight:${strong ? 700 : 400};">${escape(value)}</td></tr>`;
}

export function invoiceEmail(card: GiftCard, invoice: Invoice) {
	const subject = `Gravas rēķins Nr. ${invoice.number}`;
	const text = [
		`Labdien, ${card.buyerName}!`,
		'',
		`Pielikumā rēķins Nr. ${invoice.number} par dāvanu karti: ${card.serviceLine}.`,
		`Summa: ${formatEuro(invoice.amountCents)}. Apmaksas termiņš: ${formatDate(invoice.dueDate)}.`,
		`Maksājuma mērķī, lūdzu, norādiet: Rēķins Nr. ${invoice.number}.`,
		'',
		'Pēc maksājuma saņemšanas nosūtīsim dāvanu karti uz šo e-pastu.',
		'',
		`Gravas · ${CONTACT.phone} · ${CONTACT.email}`,
	].join('\n');
	const html = shell(
		subject,
		`<p style="margin:0 0 16px 0;">Labdien, ${escape(card.buyerName)}!</p>
<p style="margin:0 0 16px 0;">Pielikumā rēķins par dāvanu karti. Pēc maksājuma saņemšanas nosūtīsim karti uz šo e-pastu.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};margin:8px 0 16px 0;">
${row('Rēķins', `Nr. ${invoice.number}`)}
${row('Pakalpojums', card.serviceLine)}
${row('Apmaksas termiņš', formatDate(invoice.dueDate))}
${row('Maksājuma mērķis', `Rēķins Nr. ${invoice.number}`)}
${row('Kopā apmaksai', formatEuro(invoice.amountCents), true)}
</table>
<p style="margin:0;color:${COLORS.ink2};font-size:13px;">Rekvizīti ir rēķinā (PDF pielikumā).</p>`,
		'Šis e-pasts nosūtīts, jo pieteicāties Gravas dāvanu kartei.'
	);
	return { subject, text, html };
}

export function giftCardEmail(card: GiftCard) {
	const subject = `Jūsu Gravas dāvanu karte Nr. ${card.number}`;
	const what = `${card.cardTitle}${card.cardSubtitle ? `, ${card.cardSubtitle}` : ''}`;
	const text = [
		`Labdien, ${card.buyerName}!`,
		'',
		`Paldies par pirkumu. Pielikumā dāvanu karte Nr. ${card.number}: ${what}.`,
		`Derīga līdz ${formatDate(card.validUntil)}.`,
		`Rezervācija pa tālruni ${CONTACT.phone} vai ${CONTACT.email}, norādot kartes numuru.`,
		'',
		'Uz tikšanos Gravās!',
	].join('\n');
	const html = shell(
		subject,
		`<p style="margin:0 0 16px 0;">Labdien, ${escape(card.buyerName)}!</p>
<p style="margin:0 0 16px 0;">Paldies par pirkumu. Dāvanu karte ir pielikumā; to var izdrukāt vai pārsūtīt saņēmējam.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};margin:8px 0 16px 0;">
${row('Dāvanu karte', `Nr. ${card.number}`)}
${row('Saturs', what)}
${row('Derīga līdz', formatDate(card.validUntil))}
${row('Rezervācija', `${CONTACT.phone} · ${CONTACT.email}`)}
</table>
<p style="margin:0;color:${COLORS.ink2};font-size:13px;">Rezervējot, lūdzu, nosauciet kartes numuru. Uz tikšanos Gravās!</p>`,
		'Šis e-pasts nosūtīts, jo iegādājāties Gravas dāvanu karti.'
	);
	return { subject, text, html };
}

/** Owner notification for a request from the public form. */
export function requestNotificationEmail(input: { number: string; name: string; email: string; phone?: string; language: string; request: string; cardUrl: string }) {
	const subject = `Jauns dāvanu kartes pieprasījums · ${input.number}`;
	const text = [
		`Jauns pieprasījums no gravas.lv/davanu-karte (${input.language}).`,
		'',
		`Vārds: ${input.name}`,
		`E-pasts: ${input.email}`,
		`Tālrunis: ${input.phone || '—'}`,
		'',
		'Pieprasījums:',
		input.request,
		'',
		`Atvērt kartē: ${input.cardUrl}`,
	].join('\n');
	const html = shell(
		subject,
		`<p style="margin:0 0 16px 0;">Jauns pieprasījums no mājaslapas formas. Karte ${escape(input.number)} ir izveidota kā melnraksts; ievadi cenu un nosūti rēķinu.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};margin:8px 0 16px 0;">
${row('Vārds', input.name)}
${row('E-pasts', input.email)}
${row('Tālrunis', input.phone || '—')}
${row('Valoda', input.language.toUpperCase())}
</table>
<p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.gold};font-weight:700;">Pieprasījums</p>
<p style="margin:0 0 20px 0;padding:12px 14px;background:${COLORS.bg};border-radius:3px;color:${COLORS.ink2};white-space:pre-wrap;">${escape(input.request)}</p>
<p style="margin:0;"><a href="${escape(input.cardUrl)}" style="display:inline-block;background:${COLORS.green};color:#F6F2E8;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:2px;">Atvērt karti ${escape(input.number)}</a></p>`,
		'Iekšējs paziņojums no Gravas dāvanu karšu sistēmas.'
	);
	return { subject, text, html };
}
