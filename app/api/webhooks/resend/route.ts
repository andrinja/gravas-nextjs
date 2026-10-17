import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { sql, eq, and } from 'drizzle-orm';
import { db, ensureMigrated, schema } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

/**
 * Resend delivery events → the card's timeline. Configure in Resend under
 * Webhooks with this URL and copy its signing secret to
 * RESEND_WEBHOOK_SECRET. Events are matched to a card through the Resend
 * email id we stored in the send event's meta.
 *
 * Signature scheme is Svix's: HMAC-SHA256 over "{id}.{timestamp}.{body}"
 * with the base64 part of the "whsec_" secret, compared to any of the
 * space-separated "v1,<sig>" values in svix-signature.
 */
const EVENT_MAP: Record<string, { type: (typeof schema.EVENT_TYPES)[number]; note: string }> = {
	'email.delivered': { type: 'email_delivered', note: 'Piegādāts' },
	'email.opened': { type: 'email_opened', note: 'Atvērts saņēmēja pusē' },
	'email.bounced': { type: 'email_bounced', note: 'Atlēca (bounce): adrese nepastāv vai neatbild' },
	'email.complained': { type: 'email_bounced', note: 'Saņēmējs atzīmēja kā surogātpastu' },
	'email.delivery_delayed': { type: 'email_failed', note: 'Piegāde aizkavējas' },
};

function verify(body: string, req: NextRequest, secret: string): boolean {
	const id = req.headers.get('svix-id');
	const ts = req.headers.get('svix-timestamp');
	const sigs = req.headers.get('svix-signature');
	if (!id || !ts || !sigs) return false;
	// reject stale (> 5 min) to blunt replays
	if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
	const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
	const expected = createHmac('sha256', key).update(`${id}.${ts}.${body}`).digest('base64');
	return sigs.split(' ').some(part => {
		const [, sig] = part.split(',');
		if (!sig || sig.length !== expected.length) return false;
		return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
	});
}

export async function POST(req: NextRequest) {
	const secret = process.env.RESEND_WEBHOOK_SECRET;
	if (!secret) return NextResponse.json({ error: 'webhook not configured' }, { status: 503 });
	const body = await req.text();
	if (!verify(body, req, secret)) return NextResponse.json({ error: 'bad signature' }, { status: 401 });

	const payload = JSON.parse(body) as { type: string; data?: { email_id?: string; to?: string[]; subject?: string } };
	const mapped = EVENT_MAP[payload.type];
	const mailId = payload.data?.email_id;
	if (!mapped || !mailId) return NextResponse.json({ ignored: payload.type });

	await ensureMigrated();
	const [origin] = await db
		.select({ cardId: schema.events.cardId })
		.from(schema.events)
		.where(and(sql`${schema.events.meta}->>'mailId' = ${mailId}`, sql`${schema.events.type} in ('invoice_sent','card_sent')`))
		.limit(1);
	if (!origin) return NextResponse.json({ ignored: 'unknown email id' });

	// Idempotent: Resend retries, and "opened" fires on every open.
	const [dupe] = await db
		.select({ id: schema.events.id })
		.from(schema.events)
		.where(and(eq(schema.events.cardId, origin.cardId), eq(schema.events.type, mapped.type), sql`${schema.events.meta}->>'mailId' = ${mailId}`))
		.limit(1);
	if (dupe) return NextResponse.json({ ok: true, duplicate: true });

	await db.insert(schema.events).values({
		cardId: origin.cardId,
		type: mapped.type,
		actor: 'resend',
		note: `${mapped.note}${payload.data?.to?.[0] ? ` · ${payload.data.to[0]}` : ''}`,
		meta: { mailId, resendEvent: payload.type },
	});
	return NextResponse.json({ ok: true });
}
