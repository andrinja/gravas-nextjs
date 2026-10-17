import type { ReactNode } from 'react';
import { Raleway, Cormorant_Garamond } from 'next/font/google';
import './admin/admin.css';

// Root layout for the App Router side of the site (currently only /admin and
// /api/auth). The public pages keep their own document in pages/_document.js.
const raleway = Raleway({ weight: ['400', '600'], subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-body' });
const cormorant = Cormorant_Garamond({ weight: ['600'], style: ['normal', 'italic'], subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-display' });

export const metadata = {
	title: 'Gravas admin',
	robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="lv" className={`${raleway.variable} ${cormorant.variable}`}>
			<body>{children}</body>
		</html>
	);
}
