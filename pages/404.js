import Link from "next/link";
import Layout from "../components/Layout";
import { ActionLink } from "../components/hero/style";
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { TR_NS } from '../constants/translationNamespace';

const Custom404 = () => {
	const { t } = useTranslation(TR_NS.PAGES);
	return (
		<Layout title={t('not_found_title')}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', margin: '6rem 0', maxWidth: '36rem' }}>
				<h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>{t('not_found_title')}</h1>
				<p>{t('not_found_text')}</p>
				<ActionLink as={Link} href="/" className="primary">{t('not_found_home')}</ActionLink>
			</div>
		</Layout>
	)
}

// pages/404 supports getStaticProps, which is what lets it render the navbar
// with real labels instead of raw keys.
export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, [TR_NS.NAVBAR, TR_NS.PAGES]),
	},
})

export default Custom404;
