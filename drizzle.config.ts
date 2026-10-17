import { defineConfig } from 'drizzle-kit';

// `yarn db:generate` writes SQL migrations to ./drizzle from lib/db/schema.ts.
// Migrations are applied by the app itself (lib/db/index.ts ensureMigrated)
// in development, and by `yarn db:migrate` against Neon for production, so
// drizzle-kit never needs a live connection here.
export default defineConfig({
	dialect: 'postgresql',
	schema: './lib/db/schema.ts',
	out: './drizzle',
	...(process.env.DATABASE_URL
		? { dbCredentials: { url: process.env.DATABASE_URL } }
		: { driver: 'pglite', dbCredentials: { url: process.env.PGLITE_DIR || './.data/pglite' } }),
});
