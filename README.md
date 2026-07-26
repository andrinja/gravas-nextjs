# Gravas

Marketing site for Gravas — sauna rituals, guesthouse and outdoor activities
near Bauska. Next.js 13 (pages router), React 18, Emotion 10, three locales
(`lv` default, `en`, `ru`).

Production: https://www.gravas.lv

## Running it

```bash
yarn install --frozen-lockfile
yarn dev            # http://localhost:3000
yarn build          # production build
yarn lint
```

`yarn.lock` is the authoritative lockfile and is what the deploy builds from.
**Do not run `npm install`** — a mixed tree is how local silently drifted two
minor versions away from production. `package-lock.json` is gitignored to stop
a second lockfile reappearing.

## Layout

```
pages/                routes only — keep non-route modules out of here, Next
                      turns any file under pages/ into a public URL
components/           one folder per component, kebab-case, with its style.js
components/icons/     @svgr output + registry.ts (regenerate via icons:convert)
lib/sections/         the three service sections, described as data
public/locales/       translations — THE live tree
static/data/          content as i18n keys, slugs and image paths
static/               images (legacy Next path, still served)
```

### The service sections

`/pirts-rituali`, `/viesu-maja` and `/aktiva-atputa` are the same two pages
three times over. They are driven by one descriptor in
`lib/sections/registry.ts` — prefix, namespaces, hero image, whether the
section shows the pirtniece block. To change how all three behave, change the
shared page component; to change one section, change its descriptor entry.

The URL prefixes are Latvian and **SEO-frozen**. Legacy `.php` redirects and
the sitemap depend on the exact strings.

`registry.ts` is client-safe (strings only). `data.ts` and `serverProps.ts`
hold the JSON and must only be imported from `getStaticProps`/`getStaticPaths`
— that separation is what keeps ~25 KB of service data out of the browser
bundle.

## Translations

Namespaces live in `public/locales/<locale>/<namespace>.json` and are declared
in `constants/translationNamespace.ts`. Both sides must agree: a namespace
declared with no file loads empty and falls back to `common` silently, which
is how a phantom `gallery` namespace went unnoticed for years.

> There used to be a second, identical-looking tree at `static/locales/`. It
> was dead — `next-i18next.config.js` points at `public/locales` — but it kept
> receiving edits, and by the time it was deleted it held two-year-old prices.
> There is one tree. It is `public/locales/`.

### Adding a namespace

1. Create `<namespace>.json` under **every** locale in `public/locales/`.
2. Add it to `TR_NS` in `constants/translationNamespace.ts`.
3. Load it in the page's `getStaticProps` — including any namespace a shared
   child needs. `<Footer/>` translates against `how_to_reserve`; omitting it
   renders raw keys once the client hydrates.

```javascript
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';

const Page = () => {
  const { t } = useTranslation(TR_NS.NAVBAR);
  return <div>{t('my_translation_key')}</div>;
};

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, [TR_NS.NAVBAR])) },
});
```

In `.tsx`, use `useT` from `lib/useT.ts` instead — it narrows next-i18next 8's
return type so `t()` can be used directly as a React child.

There is no `fallbackLng`, so a key missing from a locale renders as the key
itself, not as Latvian.

### Arguments and pluralisation

```json
{ "key": "string with {{some_variable_name}}",
  "item": "item", "item_plural": "items" }
```

```javascript
t('key', { some_variable_name: 'value' });
t('item', { count: 55 }); // "items"
```

## Icons

`components/icons/*.js` are `@svgr` output; regenerate with
`yarn icons:convert`. After adding one, add a line to
`components/icons/registry.ts`.

Data refers to icons by token (`"bed"`, and historically `"bed.svg"` — the
suffix is meaningless, they are React components). `<Icon name={token}/>`
normalises both and renders nothing for an unknown token.

**The import specifiers in `registry.ts` must stay string literals.** Next's
SWC transform only recognises `dynamic(() => import('./Literal'))`, and only
what it recognises gets server-rendered. Building the specifier at runtime is
what previously made every data-driven icon invisible on the whole site.

## Outstanding

- `en/` and `ru/` copy for the contacts page and page chrome: the key slots
  exist and currently hold the Latvian text as a placeholder, so those pages
  still read Latvian in English and Russian.
- Dependency upgrades are deliberately deferred: Emotion 10 → 11, MUI v4 → v5,
  react-spring v8 → v9 (one file, `pages/galerijas/[slug].js`), next-i18next
  8 → 15, Next 13 → 15.
- `pages/_app.js` still defines `getInitialProps`, which opts the whole app out
  of Automatic Static Optimization.
