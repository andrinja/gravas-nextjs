'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { authClient } from '../../../lib/auth/client';

export function SignOutButton() {
	const router = useRouter();
	const [pending, start] = useTransition();
	return (
		<button
			type="button"
			className="btn btn-ghost-light"
			disabled={pending}
			onClick={() =>
				start(async () => {
					await authClient.signOut({});
					router.push('/admin/login');
					router.refresh();
				})
			}
		>
			Iziet
		</button>
	);
}
