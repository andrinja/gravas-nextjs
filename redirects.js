/**
 * Legacy .php URLs from the pre-Next site.
 *
 * Wired into next.config.js. They were not, for years — this file existed and
 * was imported by nothing, so every one of these 404'd.
 *
 * Only the unprefixed paths are listed. Next's i18n redirect handling matches
 * each `source` under every locale and preserves the locale in the
 * destination, so /pirts-rituals.php, /en/pirts-rituals.php and
 * /ru/pirts-rituals.php are all covered by the single entry below. The old
 * table spelled out the /en and /ru variants by hand; with `locale: false` set
 * to make those literal prefixes match, the seven unprefixed rules stopped
 * matching entirely, because Next compares against the internally
 * locale-prefixed path. Letting Next own the prefixing covers all three.
 *
 * Three entries with a literal "[slug]" in `from` (/viesu-maja/[slug],
 * /pirts-rituali/[slug], /galerijas/[slug]) have been deleted rather than
 * translated to ":slug". As path-to-regexp patterns they would have matched
 * every detail page and sent all of them to their index.
 */
module.exports = [
	{ from: '/pirts-rituals.php', to: '/pirts-rituali' },
	{ from: '/lauku-spa.php', to: '/pirts-rituali/meitenu-spa-vakars' },
	{ from: '/naktsmitnes.php', to: '/viesu-maja' },
	{ from: '/aktivaatputa.php', to: '/aktiva-atputa' },
	{ from: '/cenas.php', to: '/pirts-rituali' },
	{ from: '/atsauksmes.php', to: '/atsauksmes' },
	{ from: '/kontakti.php', to: '/kontakti' },
];
