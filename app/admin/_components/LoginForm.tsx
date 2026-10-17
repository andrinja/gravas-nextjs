'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../../lib/auth/client';

type Props = { devPasswordLogin: boolean; denied: boolean };

export function LoginForm({ devPasswordLogin, denied }: Props) {
	const router = useRouter();
	const [pending, start] = useTransition();
	const [error, setError] = useState<string | null>(denied ? 'Šis Google konts nav pielaists administrācijai.' : null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const google = () =>
		start(async () => {
			setError(null);
			const res = await authClient.signIn.social({ provider: 'google', callbackURL: '/admin' });
			if (res?.error) setError(res.error.message || 'Pierakstīšanās neizdevās');
		});

	const passkey = () =>
		start(async () => {
			setError(null);
			const res = await authClient.signIn.passkey();
			if (res?.error) return setError(res.error.message || 'Pierakstīšanās ar atslēgu neizdevās');
			router.push('/admin');
			router.refresh();
		});

	const devLogin = (e: React.FormEvent) => {
		e.preventDefault();
		start(async () => {
			setError(null);
			const res = await authClient.signIn.email({ email, password });
			if (res?.error) return setError(res.error.message || 'Nepareizs e-pasts vai parole');
			router.push('/admin');
			router.refresh();
		});
	};

	return (
		<div className="login-box">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="logo" src="/static/logo.svg" alt="Gravas" />
			<div className="stack">
				<h1 style={{ fontSize: 28 }}>Administrācija</h1>
				<p style={{ color: 'var(--ink-2)' }}>Dāvanu kartes un rēķini.</p>
			</div>
			<button type="button" className="btn btn-primary" onClick={passkey} disabled={pending}>
				Pierakstīties ar piekļuves atslēgu
			</button>
			<button type="button" className="btn btn-outline" onClick={google} disabled={pending}>
				Pierakstīties ar Google
			</button>
			{devPasswordLogin ? (
				<>
					<div className="divider">izstrādes režīms</div>
					<form onSubmit={devLogin} className="stack" style={{ gap: 10 }}>
						<label className="field">
							E-pasts
							<input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" />
						</label>
						<label className="field">
							Parole
							<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
						</label>
						<button type="submit" className="btn btn-quiet" disabled={pending}>
							Pierakstīties ar paroli
						</button>
					</form>
				</>
			) : null}
			{error ? <p className="msg error">{error}</p> : null}
		</div>
	);
}
