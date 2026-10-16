import dynamic from 'next/dynamic';
import type { ComponentType, SVGProps } from 'react';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Every icon in this folder, keyed by component name.
 *
 * The import specifiers must stay STRING LITERALS. Next's SWC `next-dynamic`
 * transform only recognises `dynamic(() => import('./Literal'))`, and it is
 * that recognition which attaches `loadableGenerated` and puts the module in
 * react-loadable-manifest. Without it `next/dynamic` renders null on the
 * server — which is exactly the bug this file replaces: the old call sites
 * built the specifier at runtime (`import(`../icons/${iconName}`)`) inside
 * the render body, so no data-driven icon could ever be server-rendered, and
 * a fresh component identity was created on every render.
 *
 * Regenerate after adding an icon (the `icons:convert` script emits the .js):
 *   ls components/icons/*.js | ... -> one line per file, alphabetical.
 */
export const ICONS = {
	Amber:           dynamic(() => import('./Amber')),
	Archery:         dynamic(() => import('./Archery')),
	ArrowDown:       dynamic(() => import('./ArrowDown')),
	Back:            dynamic(() => import('./Back')),
	BambooMassage:   dynamic(() => import('./BambooMassage')),
	Basketball:      dynamic(() => import('./Basketball')),
	Bathrobe:        dynamic(() => import('./Bathrobe')),
	Bed:             dynamic(() => import('./Bed')),
	BirthdayRitual:  dynamic(() => import('./BirthdayRitual')),
	Bonfire:         dynamic(() => import('./Bonfire')),
	Bow:             dynamic(() => import('./Bow')),
	Box:             dynamic(() => import('./Box')),
	Bride:           dynamic(() => import('./Bride')),
	Cakra:           dynamic(() => import('./Cakra')),
	Canopy:          dynamic(() => import('./Canopy')),
	Chairs:          dynamic(() => import('./Chairs')),
	Close:           dynamic(() => import('./Close')),
	CoupleRitual:    dynamic(() => import('./CoupleRitual')),
	Cutlery:         dynamic(() => import('./Cutlery')),
	Facebook:        dynamic(() => import('./Facebook')),
	FacialTreatment: dynamic(() => import('./FacialTreatment')),
	FeetBath:        dynamic(() => import('./FeetBath')),
	GiftCard:        dynamic(() => import('./GiftCard')),
	GirlsNight:      dynamic(() => import('./GirlsNight')),
	Gloves:          dynamic(() => import('./Gloves')),
	Hat:             dynamic(() => import('./Hat')),
	Herbs:           dynamic(() => import('./Herbs')),
	Instagram:       dynamic(() => import('./Instagram')),
	Key:             dynamic(() => import('./Key')),
	Kitchen:         dynamic(() => import('./Kitchen')),
	Location:        dynamic(() => import('./Location')),
	Mail:            dynamic(() => import('./Mail')),
	Mask:            dynamic(() => import('./Mask')),
	Massage:         dynamic(() => import('./Massage')),
	Menu:            dynamic(() => import('./Menu')),
	Next:            dynamic(() => import('./Next')),
	Paintball:       dynamic(() => import('./Paintball')),
	PaintballBalls:  dynamic(() => import('./PaintballBalls')),
	PaintballMask:   dynamic(() => import('./PaintballMask')),
	PaintballPaint:  dynamic(() => import('./PaintballPaint')),
	Parking:         dynamic(() => import('./Parking')),
	People:          dynamic(() => import('./People')),
	Phone:           dynamic(() => import('./Phone')),
	Pin:             dynamic(() => import('./Pin')),
	Pool:            dynamic(() => import('./Pool')),
	Protector:       dynamic(() => import('./Protector')),
	RoseRitual:      dynamic(() => import('./RoseRitual')),
	Sauna:           dynamic(() => import('./Sauna')),
	Scrub:           dynamic(() => import('./Scrub')),
	Shower:          dynamic(() => import('./Shower')),
	SingingBowl:     dynamic(() => import('./SingingBowl')),
	Spa:             dynamic(() => import('./Spa')),
	SteamingWhisk:   dynamic(() => import('./SteamingWhisk')),
	Tank:            dynamic(() => import('./Tank')),
	Tea:             dynamic(() => import('./Tea')),
	Time:            dynamic(() => import('./Time')),
	Traditions:      dynamic(() => import('./Traditions')),
	Uniform:         dynamic(() => import('./Uniform')),
	Volleyball:      dynamic(() => import('./Volleyball')),
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof ICONS;
