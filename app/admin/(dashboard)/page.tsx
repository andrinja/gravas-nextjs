import Link from 'next/link';
import { listCards, yearTotals } from '../../../lib/giftcards/service';
import { FILTERS, cardView, matchesFilter, type FilterKey } from '../../../lib/giftcards/status';
import { formatDate, formatEuro, daysUntil } from '../../../lib/giftcards/format';
import { StatusPill } from '../_components/StatusPill';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ f?: string; q?: string }> }) {
	const { f, q } = await searchParams;
	const filter = (FILTERS.some(x => x.key === f) ? f : 'all') as FilterKey;
	const now = new Date();
	const all = await listCards({ search: q });
	const counts = Object.fromEntries(FILTERS.map(x => [x.key, all.filter(c => matchesFilter(c, x.key, now)).length])) as Record<FilterKey, number>;
	const rows = all.filter(c => matchesFilter(c, filter, now));
	const totals = await yearTotals(now.getUTCFullYear());
	const todayRaw = new Intl.DateTimeFormat('lv-LV', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Riga' }).format(now);
	const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

	const tile = (href: string, k: string, n: number | string, d: string, accent = false) => (
		<Link href={href} className={`tile${accent ? ' accent' : ''}`}>
			<span className="k">{k}</span>
			<span className="n">{n}</span>
			<span className="d">{d}</span>
		</Link>
	);

	return (
		<>
			<div className="page-head">
				<div className="stack" style={{ gap: 4 }}>
					<h1>Pārskats</h1>
					<span className="sub">{today}</span>
				</div>
				<Link href="/admin/cards/new" className="btn btn-primary">
					+ Jauna dāvanu karte
				</Link>
			</div>

			<section className="tiles" aria-label="Kopsavilkums">
				{tile('/admin?f=invoice_sent', 'Gaida apmaksu', counts.invoice_sent + counts.overdue, 'rēķini nosūtīti, nauda nav saņemta')}
				{tile('/admin?f=paid', 'Jānosūta karte', counts.paid, 'apmaksāti, karte vēl nav aizsūtīta', counts.paid > 0)}
				{tile('/admin?f=overdue', 'Novecojuši rēķini', counts.overdue, 'termiņš pārsniegts par 7+ dienām')}
				{tile('/admin?f=expiring', 'Beidzas 30 dienās', counts.expiring, 'derīgas, vēl neizmantotas kartes')}
				{tile('/admin', `${now.getUTCFullYear()}. gadā`, totals.count, `kartes · ${formatEuro(totals.paidCents)} apmaksāti`)}
			</section>

			<section className="stack" style={{ gap: 14 }} aria-label="Dāvanu kartes">
				<div className="toolbar">
					<nav className="tabs" aria-label="Statuss">
						{FILTERS.map(x => (
							<Link key={x.key} href={`/admin?f=${x.key}${q ? `&q=${encodeURIComponent(q)}` : ''}`} aria-current={x.key === filter ? 'page' : undefined}>
								{x.label} · {counts[x.key]}
							</Link>
						))}
					</nav>
					<form className="search" role="search" action="/admin">
						<input type="hidden" name="f" value={filter} />
						<svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A6663" strokeWidth="2">
							<circle cx="11" cy="11" r="7" />
							<path d="M20 20l-3.5-3.5" />
						</svg>
						<input type="search" name="q" defaultValue={q ?? ''} placeholder="Meklēt pēc numura, vārda, e-pasta" aria-label="Meklēt" />
					</form>
				</div>

				<div className="table">
					<div className="row head">
						<span>Karte</span>
						<span>Pircējs</span>
						<span>Pakalpojums</span>
						<span className="r">Summa</span>
						<span>Statuss</span>
						<span>Derīga līdz</span>
						<span />
					</div>
					{rows.length === 0 ? <div className="empty">Nav nevienas kartes šajā sarakstā.</div> : null}
					{rows.map(c => {
						const v = cardView(c, now);
						const left = daysUntil(c.validUntil, now);
						return (
							<Link key={c.id} href={`/admin/cards/${c.id}`} className="row">
								<span>
									<strong>{c.number}</strong>
									<small>{c.source === 'web' ? 'no mājaslapas' : `rēķ. ${c.number}`}</small>
								</span>
								<span style={{ minWidth: 0 }}>
									{c.buyerName}
									<small className="ellip">{c.buyerEmail}</small>
								</span>
								<span className="ellip">{c.serviceLine}</span>
								<span className="r" style={{ fontWeight: 600 }}>
									{formatEuro(c.amountCents)}
								</span>
								<span>
									<StatusPill card={c} />
								</span>
								<span className={v.expiringSoon ? 'date-warn' : ''} style={{ color: v.expiringSoon ? undefined : 'var(--ink-2)' }}>
									{c.status === 'cancelled' ? '—' : formatDate(c.validUntil)}
									{v.expiringSoon ? <small>{left} d.</small> : null}
								</span>
								<span className="arrow" aria-hidden>
									→
								</span>
							</Link>
						);
					})}
				</div>
				<span className="hint">
					Rāda {rows.length} no {all.length}. Novecojusi = rēķins nosūtīts, apmaksas termiņš pārsniegts par 7 dienām. Sarkans derīguma datums = beidzas 30 dienās.
				</span>
			</section>
		</>
	);
}
