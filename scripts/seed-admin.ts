/**
 * Development only. Creates the allow-listed admin with an email + password
 * so the dashboard can be used without Google or a passkey:
 *
 *   ADMIN_DEV_PASSWORD_LOGIN=true ADMIN_REQUIRE_PASSKEY=false yarn admin:seed
 *
 * Reads ADMIN_EMAILS (first address) and ADMIN_DEV_PASSWORD from the
 * environment. Refuses to run in production.
 */
import { ensureMigrated } from '../lib/db';
import { auth, ADMIN_EMAILS } from '../lib/auth/auth';

async function main() {
	if (process.env.NODE_ENV === 'production') throw new Error('refusing to seed a dev admin in production');
	if (process.env.ADMIN_DEV_PASSWORD_LOGIN !== 'true') throw new Error('set ADMIN_DEV_PASSWORD_LOGIN=true first');
	const email = ADMIN_EMAILS[0];
	const password = process.env.ADMIN_DEV_PASSWORD;
	if (!email) throw new Error('ADMIN_EMAILS is empty');
	if (!password || password.length < 8) throw new Error('ADMIN_DEV_PASSWORD must be at least 8 characters');

	await ensureMigrated();
	await auth.api.signUpEmail({ body: { email, password, name: 'Admin (dev)' } });
	console.log(`dev admin ready: ${email}`);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error.message || error);
		process.exit(1);
	});
