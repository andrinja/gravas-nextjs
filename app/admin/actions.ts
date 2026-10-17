'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../../lib/auth/guard';
import { parseCardInput } from '../../lib/giftcards/validation';
import * as svc from '../../lib/giftcards/service';
import { sendMail } from '../../lib/mail/send';
import { formatEuro, formatDate } from '../../lib/giftcards/format';
import { renderGiftCardPdf, renderInvoicePdf, giftCardFilename, invoiceFilename } from '../../lib/pdf/render';

export type FormState = { errors?: Record<string, string>; raw?: Record<string, string>; message?: string } | null;

function refresh(id?: string) {
	revalidatePath('/admin');
	if (id) revalidatePath(`/admin/cards/${id}`);
}

export async function createCardAction(_prev: FormState, form: FormData): Promise<FormState> {
	const admin = await requireAdmin();
	const { data, errors, raw } = parseCardInput(form);
	if (!data) return { errors, raw };
	const card = await svc.createCard(data, admin.email);
	refresh();
	redirect(`/admin/cards/${card.id}?created=1`);
}

export async function updateCardAction(id: string, _prev: FormState, form: FormData): Promise<FormState> {
	const admin = await requireAdmin();
	const { data, errors, raw } = parseCardInput(form);
	if (!data) return { errors, raw };
	try {
		await svc.updateCard(id, data, admin.email);
	} catch (e) {
		return { raw, message: (e as Error).message };
	}
	refresh(id);
	redirect(`/admin/cards/${id}`);
}

export async function sendInvoiceAction(id: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	const detail = await svc.getCardDetail(id);
	if (!detail) return { message: 'Karte nav atrasta' };
	const { card, invoice } = detail;
	if (!invoice) return { message: 'Rēķins nav atrasts' };
	const pdf = await renderInvoicePdf(card, invoice);
	const result = await sendMail({
		to: card.buyerEmail,
		attachments: [{ filename: invoiceFilename(invoice), content: pdf, contentType: 'application/pdf' }],
		subject: `Gravas rēķins Nr. ${card.number}`,
		text: [
			`Labdien, ${card.buyerName}!`,
			'',
			`Pielikumā rēķins Nr. ${card.number} par dāvanu karti: ${card.serviceLine}.`,
			`Summa: ${formatEuro(card.amountCents)}. Apmaksas termiņš: ${formatDate(card.dueDate)}.`,
			'Pēc maksājuma saņemšanas nosūtīsim dāvanu karti uz šo e-pastu.',
			'',
			'Gravas · +371 26647133 · info@gravas.lv',
		].join('\n'),
	});
	if (!result.ok) {
		await svc.logEvent(id, 'email_failed', admin.email, result.error ?? 'Nezināma kļūda');
		refresh(id);
		return { message: `Neizdevās nosūtīt: ${result.error}` };
	}
	await svc.markInvoiceSent(id, admin.email, { to: card.buyerEmail, dryRun: result.dryRun, mailId: result.id });
	refresh(id);
	return { message: result.dryRun ? 'Rēķins atzīmēts kā nosūtīts (e-pasts nav konfigurēts, izmēģinājuma režīms)' : `Rēķins nosūtīts uz ${card.buyerEmail}` };
}

export async function sendCardAction(id: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	const detail = await svc.getCardDetail(id);
	if (!detail) return { message: 'Karte nav atrasta' };
	const { card } = detail;
	const pdf = await renderGiftCardPdf(card);
	const result = await sendMail({
		to: card.buyerEmail,
		attachments: [{ filename: giftCardFilename(card), content: pdf, contentType: 'application/pdf' }],
		subject: `Jūsu Gravas dāvanu karte Nr. ${card.number}`,
		text: [
			`Labdien, ${card.buyerName}!`,
			'',
			`Paldies par pirkumu. Pielikumā dāvanu karte Nr. ${card.number}: ${card.cardTitle}${card.cardSubtitle ? `, ${card.cardSubtitle}` : ''}.`,
			`Derīga līdz ${formatDate(card.validUntil)}. Rezervācija pa tālruni +371 26647133 vai info@gravas.lv.`,
			'',
			'Uz tikšanos Gravās!',
		].join('\n'),
	});
	if (!result.ok) {
		await svc.logEvent(id, 'email_failed', admin.email, result.error ?? 'Nezināma kļūda');
		refresh(id);
		return { message: `Neizdevās nosūtīt: ${result.error}` };
	}
	await svc.markCardSent(id, admin.email, { to: card.buyerEmail, dryRun: result.dryRun, mailId: result.id });
	refresh(id);
	return { message: result.dryRun ? 'Karte atzīmēta kā nosūtīta (e-pasts nav konfigurēts, izmēģinājuma režīms)' : `Karte nosūtīta uz ${card.buyerEmail}` };
}

export async function setPaidAction(id: string, paid: boolean, note?: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	try {
		if (paid) await svc.markPaid(id, admin.email, note);
		else await svc.markUnpaid(id, admin.email);
	} catch (e) {
		return { message: (e as Error).message };
	}
	refresh(id);
	return { message: paid ? 'Atzīmēts kā apmaksāts' : 'Apmaksa atsaukta' };
}

export async function redeemAction(id: string, note?: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	try {
		await svc.redeem(id, admin.email, note);
	} catch (e) {
		return { message: (e as Error).message };
	}
	refresh(id);
	return { message: 'Karte atzīmēta kā izmantota' };
}

export async function cancelAction(id: string, reason?: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	try {
		await svc.cancel(id, admin.email, reason);
	} catch (e) {
		return { message: (e as Error).message };
	}
	refresh(id);
	return { message: 'Karte atcelta' };
}

export async function addNoteAction(id: string, note: string): Promise<{ message: string }> {
	const admin = await requireAdmin();
	const text = note.trim();
	if (!text) return { message: 'Tukša piezīme' };
	await svc.addNote(id, admin.email, text);
	refresh(id);
	return { message: 'Piezīme pievienota' };
}
