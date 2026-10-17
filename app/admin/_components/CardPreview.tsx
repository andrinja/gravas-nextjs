import type { CardLanguage, CardPhoto } from '../../../lib/db/schema';
import { formatDate, photoSrc } from '../../../lib/giftcards/format';

export interface CardPreviewData {
	number: string;
	cardTitle: string;
	cardSubtitle?: string | null;
	cardNote?: string | null;
	cardPhoto: CardPhoto;
	language: CardLanguage;
	validUntil: string;
}

const COPY: Record<CardLanguage, { eyebrow: string; number: string; valid: string; booking: string; legal: string; tag: string }> = {
	lv: {
		eyebrow: 'Dāvanu karte',
		number: 'Kartes numurs',
		valid: 'Derīga līdz',
		booking: 'Rezervācija',
		legal: 'Gravas · Likverteni, Vecsaules pagasts, Bauskas novads · gravas.lv. Iepriekšēja rezervācija nepieciešama. Karte nav apmaināma pret naudu.',
		tag: 'Atpūta laukos, bez steigas',
	},
	en: {
		eyebrow: 'Gift card',
		number: 'Card number',
		valid: 'Valid until',
		booking: 'Reservations',
		legal: 'Gravas · Likverteni, Vecsaules parish, Bauska municipality · gravas.lv. Reservation required in advance. Not exchangeable for cash.',
		tag: 'Rest in the countryside, unhurried',
	},
	ru: {
		eyebrow: 'Подарочная карта',
		number: 'Номер карты',
		valid: 'Действительна до',
		booking: 'Бронирование',
		legal: 'Gravas · Ликвертени, Вецсаульская волость, Бауский край · gravas.lv. Требуется предварительное бронирование. Не обменивается на деньги.',
		tag: 'Отдых на природе, без спешки',
	},
};

/**
 * The gift card as HTML, shared by the creation form's live preview and the
 * card page. Sized in container-query units (see admin.css .gc), so it is
 * the same proportions at any width. The PDF is rendered separately from the
 * same data.
 */
export function CardPreview({ data }: { data: CardPreviewData }) {
	const c = COPY[data.language] ?? COPY.lv;
	return (
		<div className="card-preview-wrap">
			<div className="gc" aria-label={`${c.eyebrow} ${data.number}`}>
				<div className="gc-left">
					<div className="gc-top">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/static/logo.svg" alt="Gravas" />
						<span>{c.eyebrow}</span>
					</div>
					<div className="gc-body">
						<div className="gc-title">{data.cardTitle || '…'}</div>
						{data.cardSubtitle ? <div className="gc-sub">{data.cardSubtitle}</div> : null}
						{data.cardNote ? <p className="gc-note">{data.cardNote}</p> : null}
					</div>
					<div className="gc-foot">
						<div className="gc-rule" />
						<div className="gc-meta">
							<div>
								<span className="k">{c.number}</span>
								<span className="v">{data.number}</span>
							</div>
							<div>
								<span className="k">{c.valid}</span>
								<span className="v">{formatDate(data.validUntil)}</span>
							</div>
							<div>
								<span className="k">{c.booking}</span>
								<span className="v sm">
									+371 26647133
									<br />
									info@gravas.lv
								</span>
							</div>
						</div>
						<p className="gc-legal">{c.legal}</p>
					</div>
				</div>
				<div className="gc-photo">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={photoSrc(data.cardPhoto)} alt="" />
					<div className="fade" aria-hidden />
					<div className="tag">{c.tag}</div>
				</div>
			</div>
		</div>
	);
}
