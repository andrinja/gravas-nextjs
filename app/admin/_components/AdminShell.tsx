import type { ReactNode } from 'react';
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

export function AdminShell({ children, email, current }: { children: ReactNode; email: string; current?: 'dashboard' | 'new' }) {
	return (
		<>
			<header className="adm-header">
				<div className="adm-brand">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/static/logo.svg" alt="Gravas" />
					<span>Dāvanu kartes</span>
				</div>
				<nav className="adm-nav" aria-label="Admin">
					<Link href="/admin" aria-current={current === 'dashboard' ? 'page' : undefined}>Pārskats</Link>
					<Link href="/admin/cards/new" aria-current={current === 'new' ? 'page' : undefined}>Jauna karte</Link>
					<span className="sep">|</span>
					<span className="user">{email}</span>
					<SignOutButton />
				</nav>
			</header>
			<main className="adm-main">{children}</main>
		</>
	);
}
