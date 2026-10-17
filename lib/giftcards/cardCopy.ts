import type { CardLanguage } from '../db/schema';

/** Fixed strings printed on the gift card, per card language. Shared by the HTML preview and the PDF. */
export const CARD_COPY: Record<CardLanguage, { eyebrow: string; number: string; valid: string; booking: string; legal: string; tag: string }> = {
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

export const CONTACT = { phone: '+371 26647133', email: 'info@gravas.lv' };
