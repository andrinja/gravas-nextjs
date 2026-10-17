import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { currentSession } from '../../../lib/auth/guard';
import { isAllowedEmail } from '../../../lib/auth/auth';
import { db, schema } from '../../../lib/db';
import { PasskeyPanel } from '../_components/PasskeyPanel';

export const dynamic = 'force-dynamic';

export default async function PasskeyPage({ searchParams }: { searchParams: Promise<{ verify?: string }> }) {
	const session = await currentSession();
	if (!session) redirect('/admin/login');
	if (!isAllowedEmail(session.user.email)) redirect('/admin/login?denied=1');
	const { verify } = await searchParams;
	const keys = await db.select({ id: schema.passkey.id }).from(schema.passkey).where(eq(schema.passkey.userId, session.user.id));
	const verified = (session.session as { passkeyVerified?: boolean }).passkeyVerified === true;
	if (keys.length > 0 && verified && !verify) redirect('/admin');
	return (
		<div className="adm-centered">
			<PasskeyPanel mode={keys.length === 0 ? 'enrol' : 'verify'} passkeyCount={keys.length} />
		</div>
	);
}
