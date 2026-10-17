import { redirect } from 'next/navigation';
import { currentSession } from '../../../lib/auth/guard';
import { LoginForm } from '../_components/LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
	const session = await currentSession();
	const { denied } = await searchParams;
	if (session && !denied) redirect('/admin');
	const devPasswordLogin = process.env.NODE_ENV !== 'production' && process.env.ADMIN_DEV_PASSWORD_LOGIN === 'true';
	return (
		<div className="adm-centered">
			<LoginForm devPasswordLogin={devPasswordLogin} denied={denied === '1'} />
		</div>
	);
}
