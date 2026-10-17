/**
 * Who issues the invoice. The business identity is public and lives here;
 * the bank details come from the environment so they never sit in a public
 * repository. INVOICE_PAYEE_ID is optional: only set it if the account is a
 * personal one that needs the holder's identity code on the invoice.
 */
export const ISSUER = {
	name: 'Z/S "Gravas"',
	regNo: '43601015117',
	addressLines: ['"Gravas", Likverteni, Vecsaules pagasts,', 'Bauskas novads, LV-3932'],
	phone: '+371 26647133',
	email: 'info@gravas.lv',
	web: 'gravas.lv',
	signer: 'Biruta Zēberga',
	vatNote: 'PVN netiek piemērots: Z/S "Gravas" nav reģistrēts PVN maksātājs.',
	/** Default payment term in days; the form pre-fills the due date with it. */
	paymentTermDays: 7,
};

export function bankDetails() {
	return {
		bank: process.env.INVOICE_BANK_NAME || '[banka]',
		iban: process.env.INVOICE_IBAN || '[IBAN]',
		holder: process.env.INVOICE_ACCOUNT_HOLDER || ISSUER.name,
		payeeId: process.env.INVOICE_PAYEE_ID || '',
	};
}

/** Absolute origin for fetching public assets (card photos) while rendering. */
export function siteOrigin() {
	return process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
