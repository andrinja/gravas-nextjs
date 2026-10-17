import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

/**
 * Next 16 proxy (the file formerly called middleware). Cheap first line for
 * /admin: no session cookie at all → straight to the login page, before any
 * server component runs. The real check (allow-list, passkey policy) is
 * requireAdmin() in lib/auth/guard.ts, because a cookie's presence proves
 * nothing on its own.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isPublicAdminPath = pathname === '/admin/login' || pathname.startsWith('/admin/login/');
	if (pathname.startsWith('/admin') && !isPublicAdminPath) {
		if (!getSessionCookie(request)) {
			const url = request.nextUrl.clone();
			url.pathname = '/admin/login';
			url.search = '';
			return NextResponse.redirect(url);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
