import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { ensureMigrated } from '../../../lib/db';
import { createWebRequest } from '../../../lib/giftcards/service';
import { sendMail } from '../../../lib/mail/send';
import { ADMIN_EMAILS } from '../../../lib/auth/auth';

export const dynamic = 'force-dynamic';

/**
 * POST from the public gift-card page. Creates a draft in the dashboard and
 * emails the admin. The `website` field is a honeypot: humans never see it,
 * bots fill it, and a filled one gets a polite 200 and no record.
 */
const schema = z.object({
	name: z.string().trim().min(2).max(120),
	email: z.string().trim().toLowerCase().email().max(200),
	phone: z.string().trim().max(40).optional().or(z.literal('')),
	request: z.string().trim().min(10).max(2000),
	language: z.enum(['lv', 'en', 'ru']).default('lv'),
	website: z.string().max(0).optional().or(z.literal('')),
});

const THANKS = {
	lv: 'Paldies! Sazināsimies ar Jums tuvākajā laikā.',
	en: 'Thank you! We will be in touch shortly.',
	ru: 'Спасибо! Мы скоро с вами свяжемся.',
};

export async function POST(req: NextRequest) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
	}
	const parsed = schema.safeParse(body);
	if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
	const data = parsed.data;
	if (data.website) return NextResponse.json({ ok: true, message: THANKS[data.language] });

	await ensureMigrated();
	const card = await createWebRequest(data);

	const admin = process.env.MAIL_BCC || ADMIN_EMAILS[0];
	if (admin) {
		const origin = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
		await sendMail({
			to: admin,
			subject: `Jauns dāvanu kartes pieprasījums · ${card.number}`,
			text: [
				`${data.name} <${data.email}>${data.phone ? ` · ${data.phone}` : ''} (${data.language})`,
				'',
				data.request,
				'',
				`Atvērt: ${origin}/admin/cards/${card.id}`,
			].join('\n'),
			tags: { kind: 'request', card: card.number },
		}).catch(() => undefined);
	}

	return NextResponse.json({ ok: true, message: THANKS[data.language] });
}
