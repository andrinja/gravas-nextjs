import { and, desc, eq, sql } from 'drizzle-orm';
import { db, schema } from '../db';
import type { CardStatus, EventType, GiftCard, CardEvent, Invoice } from '../db/schema';
import type { CardInput } from './validation';
import { toIsoDate, addDays, addMonths } from './format';
import { can } from './status';

/** SERVER ONLY. All writes to gift cards go through here. */

const { giftCards, invoices, events, numberSequences } = schema;

export class TransitionError extends Error {}

/**
 * Next number for the year, "2026-0035". One atomic upsert, so two admins
 * creating at the same instant cannot get the same number, and no
 * transaction is needed just for this.
 */
export async function allocateNumber(now = new Date()): Promise<{ number: string; year: number; seq: number }> {
	const year = now.getUTCFullYear();
	const [row] = await db
		.insert(numberSequences)
		.values({ year, last: 1 })
		.onConflictDoUpdate({ target: numberSequences.year, set: { last: sql`${numberSequences.last} + 1` } })
		.returning();
	const seq = row.last;
	return { number: `${year}-${String(seq).padStart(4, '0')}`, year, seq };
}

export async function logEvent(cardId: string, type: EventType, actor: string, note?: string | null, meta?: Record<string, unknown>) {
	await db.insert(events).values({ cardId, type, actor, note: note ?? null, meta: meta ?? null });
}

export async function createCard(input: CardInput, actor: string, source: 'admin' | 'web' = 'admin'): Promise<GiftCard> {
	const now = new Date();
	const { number, year, seq } = await allocateNumber(now);
	const [card] = await db
		.insert(giftCards)
		.values({
			number,
			year,
			seq,
			status: 'draft',
			buyerName: input.buyerName,
			buyerEmail: input.buyerEmail,
			buyerPhone: input.buyerPhone || null,
			serviceLine: input.serviceLine,
			amountCents: input.amount,
			cardTitle: input.cardTitle,
			cardSubtitle: input.cardSubtitle || null,
			cardNote: input.cardNote || null,
			cardPhoto: input.cardPhoto,
			language: input.language,
			validUntil: input.validUntil,
			dueDate: input.dueDate,
			source,
			createdBy: actor,
		})
		.returning();
	await db.insert(invoices).values({
		number,
		cardId: card.id,
		issueDate: toIsoDate(now),
		dueDate: input.dueDate,
		buyerName: input.buyerName,
		buyerEmail: input.buyerEmail,
		buyerPhone: input.buyerPhone || null,
		lineDescription: `Dāvanu karte Nr. ${number} — ${input.serviceLine}`,
		amountCents: input.amount,
	});
	await logEvent(card.id, 'created', actor, `Karte un rēķins ${number} izveidoti`);
	return card;
}

export async function updateCard(id: string, input: CardInput, actor: string): Promise<GiftCard> {
	const current = await getCard(id);
	if (!current) throw new TransitionError('Karte nav atrasta');
	if (!can.edit(current.status)) throw new TransitionError('Šajā statusā karti vairs nevar labot');
	const invoiceEditable = can.editInvoice(current.status);

	const patch: Partial<typeof giftCards.$inferInsert> = {
		cardTitle: input.cardTitle,
		cardSubtitle: input.cardSubtitle || null,
		cardNote: input.cardNote || null,
		cardPhoto: input.cardPhoto,
		language: input.language,
		validUntil: input.validUntil,
		updatedAt: new Date(),
	};
	if (invoiceEditable) {
		Object.assign(patch, {
			buyerName: input.buyerName,
			buyerEmail: input.buyerEmail,
			buyerPhone: input.buyerPhone || null,
			serviceLine: input.serviceLine,
			amountCents: input.amount,
			dueDate: input.dueDate,
		});
		await db
			.update(invoices)
			.set({
				buyerName: input.buyerName,
				buyerEmail: input.buyerEmail,
				buyerPhone: input.buyerPhone || null,
				lineDescription: `Dāvanu karte Nr. ${current.number} — ${input.serviceLine}`,
				amountCents: input.amount,
				dueDate: input.dueDate,
				updatedAt: new Date(),
			})
			.where(eq(invoices.cardId, id));
	}
	const [card] = await db.update(giftCards).set(patch).where(eq(giftCards.id, id)).returning();
	await logEvent(id, 'updated', actor, invoiceEditable ? 'Rēķina un kartes dati laboti' : 'Kartes teksts labots');
	return card;
}

async function transition(id: string, allowed: (s: CardStatus) => boolean, next: Partial<typeof giftCards.$inferInsert>, event: EventType, actor: string, note?: string | null, meta?: Record<string, unknown>) {
	const current = await getCard(id);
	if (!current) throw new TransitionError('Karte nav atrasta');
	if (!allowed(current.status)) throw new TransitionError(`Darbība nav atļauta statusā "${current.status}"`);
	const [card] = await db
		.update(giftCards)
		.set({ ...next, updatedAt: new Date() })
		.where(eq(giftCards.id, id))
		.returning();
	await logEvent(id, event, actor, note, meta);
	return card;
}

export const markInvoiceSent = (id: string, actor: string, meta?: Record<string, unknown>) =>
	transition(id, can.sendInvoice, { status: 'invoice_sent', invoiceSentAt: new Date() }, 'invoice_sent', actor, meta?.to ? `Nosūtīts uz ${meta.to}` : null, meta);

export const markPaid = (id: string, actor: string, note?: string) =>
	transition(id, can.markPaid, { status: 'paid', paidAt: new Date(), paidNote: note || null }, 'marked_paid', actor, note || null);

export async function markUnpaid(id: string, actor: string) {
	const current = await getCard(id);
	if (!current) throw new TransitionError('Karte nav atrasta');
	const back: CardStatus = current.invoiceSentAt ? 'invoice_sent' : 'draft';
	return transition(id, can.markUnpaid, { status: back, paidAt: null, paidNote: null }, 'marked_unpaid', actor, 'Apmaksa atsaukta');
}

export const markCardSent = (id: string, actor: string, meta?: Record<string, unknown>) =>
	transition(id, can.sendCard, { status: 'card_sent', cardSentAt: new Date() }, 'card_sent', actor, meta?.to ? `Nosūtīta uz ${meta.to}` : null, meta);

export const redeem = (id: string, actor: string, note?: string) =>
	transition(id, can.redeem, { status: 'redeemed', redeemedAt: new Date() }, 'redeemed', actor, note || null);

export const cancel = (id: string, actor: string, reason?: string) =>
	transition(id, can.cancel, { status: 'cancelled', cancelledAt: new Date(), cancelReason: reason || null }, 'cancelled', actor, reason || null);

export const addNote = (id: string, actor: string, note: string) => logEvent(id, 'note', actor, note);

export async function getCard(id: string): Promise<GiftCard | undefined> {
	const [card] = await db.select().from(giftCards).where(eq(giftCards.id, id)).limit(1);
	return card;
}

export interface CardDetail {
	card: GiftCard;
	invoice: Invoice | undefined;
	events: CardEvent[];
}

export async function getCardDetail(id: string): Promise<CardDetail | undefined> {
	const card = await getCard(id);
	if (!card) return undefined;
	const [invoice] = await db.select().from(invoices).where(eq(invoices.cardId, id)).limit(1);
	const timeline = await db.select().from(events).where(eq(events.cardId, id)).orderBy(desc(events.createdAt));
	return { card, invoice, events: timeline };
}

export async function listCards(opts: { search?: string } = {}): Promise<GiftCard[]> {
	const q = opts.search?.trim().toLowerCase();
	const rows = await db.select().from(giftCards).orderBy(desc(giftCards.year), desc(giftCards.seq));
	if (!q) return rows;
	return rows.filter(c => [c.number, c.buyerName, c.buyerEmail, c.serviceLine, c.cardTitle].some(f => f?.toLowerCase().includes(q)));
}

export async function yearTotals(year: number) {
	const [row] = await db
		.select({
			count: sql<number>`count(*)::int`,
			paidCents: sql<number>`coalesce(sum(case when ${giftCards.status} in ('paid','card_sent','redeemed') then ${giftCards.amountCents} else 0 end), 0)::int`,
		})
		.from(giftCards)
		.where(and(eq(giftCards.year, year)));
	return row ?? { count: 0, paidCents: 0 };
}

export interface WebRequestInput {
	name: string;
	email: string;
	phone?: string;
	/** What they want, in their words: service, people, occasion. */
	request: string;
	language: 'lv' | 'en' | 'ru';
}

/**
 * A request from the public gift-card page becomes a draft with no amount
 * yet: the admin opens it, fills in the price and the card text, and only
 * then sends the invoice. The validation that guards edits requires an
 * amount above zero, so a web draft cannot be sent by accident.
 */
export async function createWebRequest(input: WebRequestInput): Promise<GiftCard> {
	const now = new Date();
	const { number, year, seq } = await allocateNumber(now);
	const title = input.request.trim().split('\n')[0].slice(0, 120);
	const [card] = await db
		.insert(giftCards)
		.values({
			number,
			year,
			seq,
			status: 'draft',
			buyerName: input.name.trim(),
			buyerEmail: input.email.trim().toLowerCase(),
			buyerPhone: input.phone?.trim() || null,
			serviceLine: title,
			amountCents: 0,
			cardTitle: title,
			cardPhoto: 'sauna',
			language: input.language,
			validUntil: toIsoDate(addMonths(now, 12)),
			dueDate: toIsoDate(addDays(now, 7)),
			source: 'web',
			createdBy: 'web',
		})
		.returning();
	await db.insert(invoices).values({
		number,
		cardId: card.id,
		issueDate: toIsoDate(now),
		dueDate: toIsoDate(addDays(now, 7)),
		buyerName: card.buyerName,
		buyerEmail: card.buyerEmail,
		buyerPhone: card.buyerPhone,
		lineDescription: `Dāvanu karte Nr. ${number} — ${title}`,
		amountCents: 0,
	});
	await logEvent(card.id, 'requested', 'web', input.request.trim().slice(0, 1000), { language: input.language });
	return card;
}
