import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { auth, isAllowedEmail } from './auth';
import { db, ensureMigrated, schema } from '../db';

export type AdminUser = { id: string; email: string; name: string | null };

/**
 * The gate every /admin page goes through. Returns the signed-in admin or
 * redirects:
 *   no session            → /admin/login
 *   email not allow-listed → sign out, /admin/login?denied
 *   no passkey enrolled    → /admin/passkey (enrol)
 *   passkey enrolled, but this session was not created with it → /admin/passkey?verify
 *
 * ADMIN_REQUIRE_PASSKEY=false relaxes the last two in development.
 */
export async function requireAdmin(): Promise<AdminUser> {
	await ensureMigrated();
	const h = await headers();
	const session = await auth.api.getSession({ headers: h });
	if (!session) redirect('/admin/login');

	const { user } = session;
	if (!isAllowedEmail(user.email)) {
		await auth.api.signOut({ headers: h }).catch(() => undefined);
		redirect('/admin/login?denied=1');
	}

	const requirePasskey = process.env.ADMIN_REQUIRE_PASSKEY !== 'false';
	if (requirePasskey) {
		const enrolled = await db.select({ id: schema.passkey.id }).from(schema.passkey).where(eq(schema.passkey.userId, user.id)).limit(1);
		if (enrolled.length === 0) redirect('/admin/passkey');
		const verified = (session.session as { passkeyVerified?: boolean }).passkeyVerified === true;
		if (!verified) redirect('/admin/passkey?verify=1');
	}

	return { id: user.id, email: user.email, name: user.name ?? null };
}

/** Session without redirects, for the login and passkey pages themselves. */
export async function currentSession() {
	await ensureMigrated();
	const h = await headers();
	return auth.api.getSession({ headers: h });
}
