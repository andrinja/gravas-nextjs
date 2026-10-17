import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { ensureMigrated } from '../../../lib/db';
import { createWebRequest, logEvent } from '../../../lib/giftcards/service';
import { requestNotificationEmail } from '../../../lib/mail/templates';
import { sendMail, type MailResult } from '../../../lib/mail/send';
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
		const mail = requestNotificationEmail({ ...data, number: card.number, cardUrl: `${origin}/admin/cards/${card.id}` });
		const result = await sendMail({ to: admin, ...mail, tags: { kind: 'request', card: card.number } }).catch((e): MailResult => ({ ok: false, dryRun: false, error: String(e) }));
		if (!result.ok) {
			// Visible on the card instead of lost in a server log.
			await logEvent(card.id, 'email_failed', 'system', `Paziņojums administratoram neaizgāja: ${result.error ?? 'nezināma kļūda'}`);
		} else {
			await logEvent(card.id, 'note', 'system', result.dryRun ? 'Paziņojums administratoram (izmēģinājuma režīms, e-pasts nav aizgājis)' : `Paziņojums nosūtīts uz ${admin}`, { mailId: result.id, dryRun: result.dryRun });
		}
	}

	return NextResponse.json({ ok: true, message: THANKS[data.language] });
}
