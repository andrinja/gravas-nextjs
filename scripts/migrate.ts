/**
 * Apply pending migrations from ./drizzle to whichever database the
 * environment points at (DATABASE_URL → Neon, otherwise the local PGlite).
 * Run as a deploy step for production: `yarn db:migrate`.
 */
import { ensureMigrated } from '../lib/db';

ensureMigrated()
	.then(() => {
		console.log(`migrated (${process.env.DATABASE_URL ? 'neon' : 'pglite'})`);
		process.exit(0);
	})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
