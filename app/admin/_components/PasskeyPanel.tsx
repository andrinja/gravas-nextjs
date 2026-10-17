'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../../lib/auth/client';

type Props = { mode: 'enrol' | 'verify'; passkeyCount: number };

export function PasskeyPanel({ mode, passkeyCount }: Props) {
	const router = useRouter();
	const [pending, start] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const enrol = () =>
		start(async () => {
			setError(null);
			const res = await authClient.passkey.addPasskey({ name: navigator.platform || 'Šī ierīce' });
			if (res?.error) return setError(res.error.message || 'Neizdevās reģistrēt piekļuves atslēgu');
			// A fresh passkey does not retroactively verify the current session;
			// sign in with it once so the session carries passkeyVerified.
			const signin = await authClient.signIn.passkey();
			if (signin?.error) return setError(signin.error.message || 'Neizdevās pierakstīties ar atslēgu');
			router.push('/admin');
			router.refresh();
		});

	const verify = () =>
		start(async () => {
			setError(null);
			const res = await authClient.signIn.passkey();
			if (res?.error) return setError(res.error.message || 'Pārbaude neizdevās');
			router.push('/admin');
			router.refresh();
		});

	return (
		<div className="login-box">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="logo" src="/static/logo.svg" alt="Gravas" />
			{mode === 'enrol' ? (
				<>
					<div className="stack">
						<h1 style={{ fontSize: 28 }}>Reģistrē piekļuves atslēgu</h1>
						<p style={{ color: 'var(--ink-2)' }}>
							Administrācija prasa otru soli pēc Google pierakstīšanās: piekļuves atslēgu (Touch ID, Face ID vai drošības atslēgu) uz šīs ierīces. To prasīs katru reizi.
						</p>
					</div>
					<button type="button" className="btn btn-primary" onClick={enrol} disabled={pending}>
						{pending ? 'Gaida ierīci…' : 'Izveidot piekļuves atslēgu'}
					</button>
				</>
			) : (
				<>
					<div className="stack">
						<h1 style={{ fontSize: 28 }}>Apstiprini ar piekļuves atslēgu</h1>
						<p style={{ color: 'var(--ink-2)' }}>
							Šai sesijai vēl nav otrā soļa. Reģistrētas atslēgas: {passkeyCount}.
						</p>
					</div>
					<button type="button" className="btn btn-primary" onClick={verify} disabled={pending}>
						{pending ? 'Gaida ierīci…' : 'Apstiprināt'}
					</button>
				</>
			)}
			{error ? <p className="msg error">{error}</p> : null}
			<button
				type="button"
				className="btn btn-quiet btn-sm"
				onClick={() =>
					start(async () => {
						await authClient.signOut({});
						router.push('/admin/login');
					})
				}
			>
				Iziet
			</button>
		</div>
	);
}
