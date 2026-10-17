import { Document, Page, View, Text, Image, Svg, Defs, LinearGradient, Stop, Rect, StyleSheet } from '@react-pdf/renderer';
import type { GiftCard } from '../db/schema';
import { CARD_COPY, CONTACT } from '../giftcards/cardCopy';
import { formatDate, photoSrc } from '../giftcards/format';
import { COLORS, registerFonts } from './fonts';
import { Logo } from './Logo';
import { siteOrigin } from './issuer';

/**
 * DL landscape (210 × 100 mm). The approved design was drawn at 1050 × 500
 * px; everything here is that design scaled by 0.567 to points.
 */
const W = 595.3;
const H = 283.5;
const k = W / 1050;

const s = StyleSheet.create({
	page: { backgroundColor: COLORS.bg, fontFamily: 'Raleway', color: COLORS.ink, flexDirection: 'row' },
	left: { width: W * 0.6, paddingTop: 44 * k, paddingRight: 40 * k, paddingBottom: 36 * k, paddingLeft: 48 * k, justifyContent: 'space-between' },
	top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	eyebrow: { fontSize: 11 * k, letterSpacing: 2.2 * k, textTransform: 'uppercase', fontWeight: 600, color: COLORS.gold },
	title: { fontFamily: 'Cormorant', fontWeight: 600, fontSize: 40 * k, lineHeight: 1.08, color: COLORS.ink },
	sub: { fontFamily: 'Cormorant', fontWeight: 600, fontStyle: 'italic', fontSize: 24 * k, lineHeight: 1.2, color: COLORS.green, marginTop: 6 * k },
	note: { fontSize: 12.5 * k, lineHeight: 1.5, color: COLORS.ink2, marginTop: 10 * k, maxWidth: 46 * 7 * k },
	rule: { height: 1, backgroundColor: COLORS.line, marginBottom: 14 * k },
	meta: { flexDirection: 'row' },
	metaCol: { flex: 1, paddingRight: 8 * k },
	k: { fontSize: 10 * k, letterSpacing: 1.6 * k, textTransform: 'uppercase', color: COLORS.muted, marginBottom: 3 * k },
	v: { fontFamily: 'Cormorant', fontWeight: 600, fontSize: 20 * k, color: COLORS.ink },
	vSm: { fontSize: 12.5 * k, fontWeight: 600, lineHeight: 1.35, color: COLORS.ink },
	legal: { fontSize: 10.5 * k, lineHeight: 1.5, color: COLORS.muted, marginTop: 14 * k },
	right: { width: W * 0.4, position: 'relative' },
	photo: { position: 'absolute', top: 0, left: 0, width: W * 0.4, height: H, objectFit: 'cover' },
	tag: { position: 'absolute', right: 28 * k, bottom: 22 * k, fontFamily: 'Cormorant', fontWeight: 600, fontStyle: 'italic', fontSize: 18 * k, color: COLORS.goldBright },
});

export function GiftCardPdf({ card }: { card: GiftCard }) {
	registerFonts();
	const c = CARD_COPY[card.language] ?? CARD_COPY.lv;
	const photo = `${siteOrigin()}${photoSrc(card.cardPhoto)}`;
	const rw = W * 0.4;
	return (
		<Document title={`${c.eyebrow} ${card.number}`} author="Gravas" language={card.language}>
			<Page size={[W, H]} style={s.page}>
				<View style={s.left}>
					<View style={s.top}>
						<Logo width={128 * k} />
						<Text style={s.eyebrow}>{c.eyebrow}</Text>
					</View>
					<View>
						<Text style={s.title}>{card.cardTitle}</Text>
						{card.cardSubtitle ? <Text style={s.sub}>{card.cardSubtitle}</Text> : null}
						{card.cardNote ? <Text style={s.note}>{card.cardNote}</Text> : null}
					</View>
					<View>
						<View style={s.rule} />
						<View style={s.meta}>
							<View style={s.metaCol}>
								<Text style={s.k}>{c.number}</Text>
								<Text style={s.v}>{card.number}</Text>
							</View>
							<View style={s.metaCol}>
								<Text style={s.k}>{c.valid}</Text>
								<Text style={s.v}>{formatDate(card.validUntil)}</Text>
							</View>
							<View style={s.metaCol}>
								<Text style={s.k}>{c.booking}</Text>
								<Text style={s.vSm}>{CONTACT.phone}</Text>
								<Text style={s.vSm}>{CONTACT.email}</Text>
							</View>
						</View>
						<Text style={s.legal}>{c.legal}</Text>
					</View>
				</View>
				<View style={s.right}>
					{/* eslint-disable-next-line jsx-a11y/alt-text */}
					<Image src={photo} style={s.photo} />
					{/* cream fade on the photo's left edge, and a dark foot for the tag line */}
					<Svg width={rw} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
						<Defs>
							<LinearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
								<Stop offset="0" stopColor={COLORS.bg} stopOpacity={1} />
								<Stop offset="0.18" stopColor={COLORS.bg} stopOpacity={0} />
							</LinearGradient>
							<LinearGradient id="foot" x1="0" y1="1" x2="0" y2="0">
								<Stop offset="0" stopColor="#0E1F1C" stopOpacity={0.88} />
								<Stop offset="0.55" stopColor="#0E1F1C" stopOpacity={0.35} />
								<Stop offset="1" stopColor="#0E1F1C" stopOpacity={0} />
							</LinearGradient>
						</Defs>
						<Rect x={0} y={0} width={rw} height={H} fill="url(#fade)" />
						<Rect x={0} y={H - 110 * k} width={rw} height={110 * k} fill="url(#foot)" />
					</Svg>
					<Text style={s.tag}>{c.tag}</Text>
				</View>
			</Page>
		</Document>
	);
}
