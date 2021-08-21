import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config'


export default function getServerSideTranslations(locale, namespaces) {
	return serverSideTranslations(
		locale,
		namespaces,
		nextI18NextConfig,
	)
}