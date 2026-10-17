/**
 * Outbound email through Resend's HTTP API when RESEND_API_KEY is set;
 * otherwise a dry run that logs and reports itself as such, so the dashboard
 * can be used end to end in development and the event log says plainly
 * that nothing left the building.
 *
 * Env: RESEND_API_KEY, MAIL_FROM ("Gravas <info@gravas.lv>"; the domain must
 * be verified in Resend), MAIL_REPLY_TO (default info@gravas.lv), MAIL_BCC
 * (optional: a copy of every customer email to your own inbox).
 */
export interface MailMessage {
	to: string;
	subject: string;
	text: string;
	html?: string;
	attachments?: { filename: string; content: Buffer | string; contentType?: string }[];
	/** Free-form tags Resend echoes back in webhooks. */
	tags?: Record<string, string>;
}

export interface MailResult {
	ok: boolean;
	dryRun: boolean;
	id?: string;
	error?: string;
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.MAIL_FROM || 'Gravas <info@gravas.lv>';
	const replyTo = process.env.MAIL_REPLY_TO || 'info@gravas.lv';
	const bcc = process.env.MAIL_BCC;
	if (!apiKey) {
		console.info(`[mail dry-run] to=${message.to} subject=${JSON.stringify(message.subject)} attachments=${message.attachments?.length ?? 0}`);
		return { ok: true, dryRun: true };
	}
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			from,
			to: [message.to],
			reply_to: replyTo,
			bcc: bcc ? [bcc] : undefined,
			subject: message.subject,
			text: message.text,
			html: message.html,
			attachments: message.attachments?.map(a => ({
				filename: a.filename,
				content: Buffer.isBuffer(a.content) ? a.content.toString('base64') : a.content,
				content_type: a.contentType,
			})),
			tags: message.tags ? Object.entries(message.tags).map(([name, value]) => ({ name, value })) : undefined,
		}),
	});
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		return { ok: false, dryRun: false, error: `Resend ${res.status}: ${body.slice(0, 300)}` };
	}
	const json = (await res.json()) as { id?: string };
	return { ok: true, dryRun: false, id: json.id };
}
