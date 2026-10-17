import { createElement, type ReactElement } from 'react';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import type { GiftCard, Invoice } from '../db/schema';
import { GiftCardPdf } from './GiftCardPdf';
import { InvoicePdf } from './InvoicePdf';

/** SERVER ONLY. PDFs are rendered on demand from the database row; nothing is stored. */

export async function renderGiftCardPdf(card: GiftCard): Promise<Buffer> {
	return renderToBuffer(createElement(GiftCardPdf, { card }) as unknown as ReactElement<DocumentProps>);
}

export async function renderInvoicePdf(card: GiftCard, invoice: Invoice): Promise<Buffer> {
	return renderToBuffer(createElement(InvoicePdf, { card, invoice }) as unknown as ReactElement<DocumentProps>);
}

export const giftCardFilename = (card: GiftCard) => `gravas-davanu-karte-${card.number}.pdf`;
export const invoiceFilename = (invoice: Invoice) => `gravas-rekins-${invoice.number}.pdf`;
