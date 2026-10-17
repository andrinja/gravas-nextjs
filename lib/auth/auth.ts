import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { createAuthMiddleware, APIError } from 'better-auth/api';
import { passkey } from '@better-auth/passkey';
import { db, schema } from '../db';

/**
 * Admin sign-in for /admin.
 *
 * Policy: one allow-listed Google account (ADMIN_EMAILS), and once that
 * account has enrolled a passkey, every session must be created by that
 * passkey. Google alone then only gets you as far as the passkey prompt.
 * A passkey is device + biometric, phishing-resistant, so it is the second
 * factor the user asked for without a code to type.
 *
 * `passkeyVerified` on the session records how the session was made; the
 * admin layout enforces it (lib/auth/guard.ts).
 *
 * Development only: ADMIN_DEV_PASSWORD_LOGIN=true enables email + password
 * for the allow-listed address so the dashboard can be used without a Google
 * client or a browser authenticator. Never set it in production.
 */

export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
	.split(',')
	.map(e => e.trim().toLowerCase())
	.filter(Boolean);

export function isAllowedEmail(email: string | null | undefined): boolean {
	return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const rpID = new URL(baseURL).hostname;
const devPasswordLogin = process.env.NODE_ENV !== 'production' && process.env.ADMIN_DEV_PASSWORD_LOGIN === 'true';

export const auth = betterAuth({
	appName: 'Gravas admin',
	baseURL,
	secret: process.env.BETTER_AUTH_SECRET,
	basePath: '/api/auth',
	database: drizzleAdapter(db, { provider: 'pg', schema }),

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			// One account, so never show the account chooser twice.
			prompt: 'select_account',
		},
	},

	emailAndPassword: { enabled: devPasswordLogin },

	session: {
		expiresIn: 60 * 60 * 12, // 12 hours
		updateAge: 60 * 60, // refresh at most hourly
		additionalFields: {
			passkeyVerified: { type: 'boolean', defaultValue: false, input: false },
		},
	},

	databaseHooks: {
		user: {
			create: {
				before: async user => {
					if (!isAllowedEmail(user.email)) {
						throw new APIError('FORBIDDEN', { message: 'Šis konts nav pielaists administrācijai.' });
					}
				},
			},
		},
	},

	hooks: {
		// A session created by a passkey assertion is the only kind that counts
		// as fully verified.
		after: createAuthMiddleware(async ctx => {
			if (ctx.path === '/sign-in/passkey' || ctx.path === '/passkey/verify-authentication') {
				const created = ctx.context.newSession;
				if (created?.session?.token) {
					await ctx.context.internalAdapter.updateSession(created.session.token, { passkeyVerified: true });
				}
			}
		}),
	},

	plugins: [
		passkey({
			rpID,
			rpName: 'Gravas admin',
			origin: baseURL,
			authenticatorSelection: {
				residentKey: 'preferred',
				userVerification: 'required',
			},
		}),
		nextCookies(),
	],
});

export type Session = typeof auth.$Infer.Session;
