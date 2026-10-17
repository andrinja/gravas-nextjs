import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { GiftCard, Invoice } from '../db/schema';
import { formatDate, formatEuro } from '../giftcards/format';
import { COLORS, registerFonts } from './fonts';
import { Logo } from './Logo';
import { ISSUER, bankDetails } from './issuer';

/** A4 portrait, following the approved layout (794 × 1123 px design → points). */
const s = StyleSheet.create({
	page: { backgroundColor: COLORS.white, fontFamily: 'Raleway', color: COLORS.ink, fontSize: 9.5, lineHeight: 1.5, paddingTop: 42, paddingHorizontal: 45, paddingBottom: 36 },
	header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: COLORS.ink },
	tagline: { fontSize: 8, color: COLORS.muted, marginTop: 8 },
	hRight: { alignItems: 'flex-end' },
	docTitle: { fontFamily: 'Cormorant', fontWeight: 600, fontSize: 26, lineHeight: 1, color: COLORS.ink },
	docNo: { fontSize: 12, fontWeight: 600, marginTop: 5 },
	hMeta: { color: COLORS.ink2 },
	cols: { flexDirection: 'row', marginTop: 24 },
	col: { flex: 1, paddingRight: 30 },
	eyebrow: { fontSize: 7.5, letterSpacing: 1.2, textTransform: 'uppercase', color: COLORS.gold, fontWeight: 600, marginBottom: 5 },
	bold: { fontWeight: 600 },
	muted: { color: COLORS.ink2 },
	tableHead: { flexDirection: 'row', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.ink, marginTop: 24 },
	th: { fontSize: 7.5, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.muted, fontWeight: 600 },
	tr: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.line },
	cNo: { width: 24, color: COLORS.muted },
	cDesc: { flex: 1, paddingRight: 10 },
	cQty: { width: 50, textAlign: 'right' },
	cPrice: { width: 70, textAlign: 'right' },
	cSum: { width: 78, textAlign: 'right' },
	totals: { alignItems: 'flex-end', marginTop: 12 },
	totalsGrid: { width: 230 },
	tRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
	tFinal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', borderTopWidth: 1, borderTopColor: COLORS.ink, marginTop: 6, paddingTop: 6 },
	tFinalLabel: { fontWeight: 600, fontSize: 10.5 },
	tFinalValue: { fontFamily: 'Cormorant', fontWeight: 600, fontSize: 18 },
	payBox: { flexDirection: 'row', backgroundColor: COLORS.bg, borderRadius: 2, padding: 16, marginTop: 26 },
	footer: { position: 'absolute', left: 45, right: 45, bottom: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.line, fontSize: 8, color: COLORS.muted },
	signer: { fontFamily: 'Cormorant', fontWeight: 600, fontSize: 12, color: COLORS.ink },
});

export function InvoicePdf({ card, invoice }: { card: GiftCard; invoice: Invoice }) {
	registerFonts();
	const bank = bankDetails();
	return (
		<Document title={`Rēķins Nr. ${invoice.number}`} author={ISSUER.name} language="lv">
			<Page size="A4" style={s.page}>
				<View style={s.header}>
					<View>
						<Logo width={112} />
						<Text style={s.tagline}>Pirts rituāli · viesu māja · aktīvā atpūta</Text>
					</View>
					<View style={s.hRight}>
						<Text style={s.docTitle}>Rēķins</Text>
						<Text style={s.docNo}>Nr. {invoice.number}</Text>
						<Text style={s.hMeta}>Izrakstīts {formatDate(invoice.issueDate)}</Text>
						<Text style={s.hMeta}>Apmaksas termiņš {formatDate(invoice.dueDate)}</Text>
					</View>
				</View>

				<View style={s.cols}>
					<View style={s.col}>
						<Text style={s.eyebrow}>Pakalpojuma sniedzējs</Text>
						<Text style={s.bold}>{ISSUER.name}</Text>
						<Text>Reģ. Nr. {ISSUER.regNo}</Text>
						{ISSUER.addressLines.map(l => (
							<Text key={l}>{l}</Text>
						))}
						<Text style={s.muted}>
							{ISSUER.phone} · {ISSUER.email} · {ISSUER.web}
						</Text>
					</View>
					<View style={s.col}>
						<Text style={s.eyebrow}>Maksātājs</Text>
						<Text style={s.bold}>{invoice.buyerName}</Text>
						<Text>{invoice.buyerEmail}</Text>
						{invoice.buyerPhone ? <Text style={s.muted}>{invoice.buyerPhone}</Text> : null}
					</View>
				</View>

				<View style={s.tableHead}>
					<Text style={[s.th, s.cNo]}>Nr.</Text>
					<Text style={[s.th, s.cDesc]}>Pakalpojums</Text>
					<Text style={[s.th, s.cQty]}>Daudz.</Text>
					<Text style={[s.th, s.cPrice]}>Cena</Text>
					<Text style={[s.th, s.cSum]}>Summa</Text>
				</View>
				<View style={s.tr}>
					<Text style={s.cNo}>1</Text>
					<View style={s.cDesc}>
						<Text style={s.bold}>Dāvanu karte Nr. {card.number}</Text>
						<Text style={s.muted}>{card.serviceLine}</Text>
						<Text style={{ color: COLORS.muted, fontSize: 8.5 }}>Derīga līdz {formatDate(card.validUntil)}</Text>
					</View>
					<Text style={s.cQty}>1</Text>
					<Text style={s.cPrice}>{formatEuro(invoice.amountCents)}</Text>
					<Text style={[s.cSum, s.bold]}>{formatEuro(invoice.amountCents)}</Text>
				</View>

				<View style={s.totals}>
					<View style={s.totalsGrid}>
						<View style={s.tRow}>
							<Text style={s.muted}>Summa</Text>
							<Text>{formatEuro(invoice.amountCents)}</Text>
						</View>
						<View style={s.tRow}>
							<Text style={s.muted}>PVN</Text>
							<Text style={s.muted}>netiek piemērots</Text>
						</View>
						<View style={s.tFinal}>
							<Text style={s.tFinalLabel}>Kopā apmaksai</Text>
							<Text style={s.tFinalValue}>{formatEuro(invoice.amountCents)}</Text>
						</View>
					</View>
				</View>

				<View style={s.payBox}>
					<View style={s.col}>
						<Text style={s.eyebrow}>Norēķinu rekvizīti</Text>
						<Text>
							Saņēmējs: <Text style={s.bold}>{bank.holder}</Text>
						</Text>
						{bank.payeeId ? <Text>Personas kods: {bank.payeeId}</Text> : null}
						<Text>Banka: {bank.bank}</Text>
						<Text>
							Konts: <Text style={[s.bold, { letterSpacing: 0.4 }]}>{bank.iban}</Text>
						</Text>
					</View>
					<View style={s.col}>
						<Text style={s.eyebrow}>Maksājuma mērķis</Text>
						<Text style={s.bold}>Rēķins Nr. {invoice.number}</Text>
						<Text style={s.muted}>Dāvanu karte tiek nosūtīta uz pircēja e-pastu pēc maksājuma saņemšanas.</Text>
					</View>
				</View>

				<View style={s.footer} fixed>
					<View>
						<Text>Rēķins sagatavots elektroniski un ir derīgs bez paraksta.</Text>
						<Text>{ISSUER.vatNote}</Text>
					</View>
					<View style={{ alignItems: 'flex-end' }}>
						<Text style={s.signer}>{ISSUER.signer}</Text>
						<Text>{ISSUER.name}</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
