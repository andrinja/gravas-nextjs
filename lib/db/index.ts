import * as schema from './schema';

/**
 * One `db` for the whole app, picked by environment:
 *
 *   DATABASE_URL set   → Neon Postgres over WebSocket (drizzle-orm/neon-serverless),
 *                        which supports real transactions, unlike the HTTP driver.
 *   DATABASE_URL unset → PGlite, an embedded Postgres kept in .data/pglite, so
 *                        development and tests need no server at all.
 *
 * Both run the same migrations from ./drizzle. The PGlite branch is never
 * taken in production; `serverExternalPackages` in next.config.js keeps its
 * WASM out of the bundle either way.
 *
 * `db` is a lazy proxy: the connection is created on first use, not on
 * import. `next build` evaluates these modules in several workers at once,
 * and several PGlite instances opening one data directory abort.
 */

type NeonDb = import('drizzle-orm/neon-serverless').NeonDatabase<typeof schema>;
type PgliteDb = import('drizzle-orm/pglite').PgliteDatabase<typeof schema>;
type Db = NeonDb | PgliteDb;

const globalForDb = globalThis as unknown as { __gravasDb?: Db; __gravasDbReady?: Promise<void> };

function create(): Db {
	if (process.env.DATABASE_URL) {
		// Needs a global WebSocket: Node 22+, which is what Vercel runs. (No 'ws'
		// fallback on purpose; the bundler would otherwise require it statically.)
		const { Pool } = require('@neondatabase/serverless') as typeof import('@neondatabase/serverless');
		const { drizzle } = require('drizzle-orm/neon-serverless') as typeof import('drizzle-orm/neon-serverless');
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		return drizzle(pool, { schema });
	}
	if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
		// Serverless filesystems are read-only; an embedded database there would
		// fail in confusing ways later. Fail here, with the cause in the message.
		throw new Error('DATABASE_URL is not set. Attach a Neon Postgres database to the Vercel project (Storage tab) and redeploy.');
	}
	const { PGlite } = require('@electric-sql/pglite') as typeof import('@electric-sql/pglite');
	const { drizzle } = require('drizzle-orm/pglite') as typeof import('drizzle-orm/pglite');
	const dir = process.env.PGLITE_DIR || '.data/pglite';
	return drizzle(new PGlite(dir), { schema });
}

function real(): Db {
	return (globalForDb.__gravasDb ??= create());
}

export const db: Db = new Proxy({} as Db, {
	get(_target, prop) {
		const instance = real() as unknown as Record<PropertyKey, unknown>;
		const value = instance[prop];
		return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(instance) : value;
	},
});

/**
 * Apply pending migrations. Called once per process from the admin gate in
 * development (PGlite starts empty); in production run `yarn db:migrate`
 * against Neon as a deploy step instead.
 */
export function ensureMigrated(): Promise<void> {
	if (!globalForDb.__gravasDbReady) {
		globalForDb.__gravasDbReady = (async () => {
			const folder = `${process.cwd()}/drizzle`;
			if (process.env.DATABASE_URL) {
				const { migrate } = await import('drizzle-orm/neon-serverless/migrator');
				await migrate(real() as NeonDb, { migrationsFolder: folder });
			} else {
				const { migrate } = await import('drizzle-orm/pglite/migrator');
				await migrate(real() as PgliteDb, { migrationsFolder: folder });
			}
		})();
	}
	return globalForDb.__gravasDbReady;
}

export { schema };
