import { buildSitemap } from '../lib/seo/sitemap';

// Generated from lib/sections/registry.ts, so it cannot drift from the routes.
// Replaces the hand-maintained public/sitemap.xml, which had 61 URLs all
// stamped lastmod 2021-09-11, was missing the Latvian /pirts-rituali, and
// listed /viesu-maja/naktsmitnes twice.
export default function Sitemap() {
	return null;
}

export async function getServerSideProps({ res }) {
	const xml = buildSitemap(new Date().toISOString().slice(0, 10));
	res.setHeader('Content-Type', 'application/xml; charset=utf-8');
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
	res.write(xml);
	res.end();
	return { props: {} };
}
