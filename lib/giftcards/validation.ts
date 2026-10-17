import { z } from 'zod';
import { CARD_LANGUAGES, CARD_PHOTOS } from '../db/schema';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datums formātā GGGG-MM-DD');

/** Step 1 + step 2 of the creation form, also used for edits. */
export const cardInput = z.object({
	buyerName: z.string().trim().min(2, 'Norādi pircēja vārdu').max(120),
	buyerEmail: z.string().trim().toLowerCase().email('Nederīgs e-pasts').max(200),
	buyerPhone: z.string().trim().max(40).optional().or(z.literal('')),
	serviceLine: z.string().trim().min(3, 'Norādi pakalpojumu').max(300),
	/** Euro as typed, "105" or "105,50"; stored as cents. */
	amount: z
		.string()
		.trim()
		.regex(/^\d{1,5}([.,]\d{1,2})?$/, 'Summa, piemēram 105 vai 105,50')
		.transform(s => Math.round(parseFloat(s.replace(',', '.')) * 100))
		.refine(c => c > 0, 'Summai jābūt lielākai par 0'),
	dueDate: isoDate,
	validUntil: isoDate,
	cardTitle: z.string().trim().min(3, 'Norādi virsrakstu uz kartes').max(120),
	cardSubtitle: z.string().trim().max(80).optional().or(z.literal('')),
	cardNote: z.string().trim().max(240).optional().or(z.literal('')),
	cardPhoto: z.enum(CARD_PHOTOS),
	language: z.enum(CARD_LANGUAGES),
});

export type CardInput = z.infer<typeof cardInput>;
export type CardInputRaw = z.input<typeof cardInput>;

export function parseCardInput(form: FormData): { data?: CardInput; errors?: Record<string, string>; raw: Record<string, string> } {
	const raw: Record<string, string> = {};
	for (const key of Object.keys(cardInput.shape)) raw[key] = String(form.get(key) ?? '');
	const result = cardInput.safeParse(raw);
	if (result.success) return { data: result.data, raw };
	const errors: Record<string, string> = {};
	for (const issue of result.error.issues) {
		const key = String(issue.path[0] ?? 'form');
		if (!errors[key]) errors[key] = issue.message;
	}
	return { errors, raw };
}
