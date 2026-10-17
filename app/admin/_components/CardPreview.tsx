import type { CardLanguage, CardPhoto } from '../../../lib/db/schema';
import { formatDate, photoSrc } from '../../../lib/giftcards/format';
import { CARD_COPY, CONTACT } from '../../../lib/giftcards/cardCopy';

export interface CardPreviewData {
	number: string;
	cardTitle: string;
	cardSubtitle?: string | null;
	cardNote?: string | null;
	cardPhoto: CardPhoto;
	language: CardLanguage;
	validUntil: string;
}


/**
 * The gift card as HTML, shared by the creation form's live preview and the
 * card page. Sized in container-query units (see admin.css .gc), so it is
 * the same proportions at any width. The PDF is rendered separately from the
 * same data.
 */
export function CardPreview({ data }: { data: CardPreviewData }) {
	const c = CARD_COPY[data.language] ?? CARD_COPY.lv;
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
									{CONTACT.phone}
									<br />
									{CONTACT.email}
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
