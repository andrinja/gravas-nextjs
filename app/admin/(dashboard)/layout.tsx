import type { ReactNode } from 'react';
import { requireAdmin } from '../../../lib/auth/guard';
import { AdminShell } from '../_components/AdminShell';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const admin = await requireAdmin();
	return <AdminShell email={admin.email}>{children}</AdminShell>;
}
