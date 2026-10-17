import { NextResponse, type NextRequest } from 'next/server';
import { getAdminOrNull } from '../../../../../../lib/auth/guard';
import { getCardDetail } from '../../../../../../lib/giftcards/service';
import { renderGiftCardPdf, renderInvoicePdf, giftCardFilename, invoiceFilename } from '../../../../../../lib/pdf/render';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/cards/:id/invoice  → the invoice PDF
 * GET /api/admin/cards/:id/card     → the gift card PDF
 * Same gate as the dashboard pages, as a 401 instead of a redirect.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string; doc: string }> }) {
	const admin = await getAdminOrNull();
	if (!admin) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
	const { id, doc } = await ctx.params;
	const detail = await getCardDetail(id);
	if (!detail) return NextResponse.json({ error: 'not found' }, { status: 404 });

	let buffer: Buffer;
	let filename: string;
	if (doc === 'invoice' && detail.invoice) {
		buffer = await renderInvoicePdf(detail.card, detail.invoice);
		filename = invoiceFilename(detail.invoice);
	} else if (doc === 'card') {
		buffer = await renderGiftCardPdf(detail.card);
		filename = giftCardFilename(detail.card);
	} else {
		return NextResponse.json({ error: 'unknown document' }, { status: 404 });
	}
	return new NextResponse(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="${filename}"`,
			'Cache-Control': 'private, no-store',
		},
	});
}
