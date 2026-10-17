# Gravas

Marketing site for Gravas — sauna rituals, guesthouse and outdoor activities
near Bauska. Next.js 16 (pages router, Turbopack), React 19, Emotion 11,
next-i18next 16, three locales (`lv` default, `en`, `ru`).

Production: https://gravas.lv (www redirects to the apex host)

## Running it

```bash
yarn install --frozen-lockfile   # Node >= 22.13 (yarn checks engines)
yarn dev            # http://localhost:3000
yarn build          # production build (Turbopack)
yarn lint           # eslint . — Next 16 has no `next lint`; config is eslint.config.mjs
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
public/static/        photos, favicons, manifest — served at /static/* (moved
                      here from the deprecated root-level static/ in P14)
static/data/          content as i18n keys, slugs and image paths (build input)
static/icons/         SVG sources for icons:convert (build input, not served)
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
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { TR_NS } from '../../constants/translationNamespace';

const Page = () => {
  const { t } = useTranslation(TR_NS.NAVBAR);
  return <div>{t('my_translation_key')}</div>;
};

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, [TR_NS.NAVBAR])) },
});
```

Pages-router code imports from `next-i18next/pages` and
`next-i18next/pages/serverSideTranslations`; the bare `next-i18next` entry is
the App Router API and exports neither `useTranslation` nor `appWithTranslation`.

In `.tsx`, `useT` from `lib/useT.ts` remains as a thin wrapper from the
next-i18next 8 days; plain `useTranslation` is fine too.

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

## Design

The "Lauku miers" look (P15): cream ground, deep-green ink, brand green for
actions, muted gold for accents; Cormorant Garamond for h1/h2 over Raleway.
Everything is a token in `components/theme.js` — colours, the two font
stacks (`families`), type sizes, radii and the page layout (max width,
gutters, nav height). Both fonts are loaded with next/font in `pages/_app.js`
and exposed as `--font-display` / `--font-body`; global element styles live
in the Emotion `<Global>` there.

Shared chrome: `components/navbar`, `container`, `main-footer`, and
`reservation-band` (the green "Kā rezervēt?" band that replaced the fixed
bottom bar on detail pages). Button-shaped links are `ActionLink` in
`components/hero/style.js`; the `Button` component is for real buttons.
Section index pages put their h1 on the hero (`PageHeaderImage` with
`title`); detail pages keep the h1 below it. The three mock-up directions
that led here are on the design canvas (A was chosen).

## Gift cards admin (/admin)

An App Router area (`app/admin`) next to the public pages. Flow: create a
card (which creates its invoice, same `YYYY-NNNN` number from a yearly
sequence) → send the invoice → mark paid by hand → send the gift card →
mark redeemed. Nothing is emailed automatically; every send is a button.

```
lib/db/schema.ts        gift_cards, invoices, events, number_sequences (+ auth tables)
lib/db/index.ts         db: Neon (DATABASE_URL) or embedded PGlite in .data/ when unset
drizzle/                SQL migrations — yarn db:generate after a schema change
lib/giftcards/          status rules, validation, numbering, transitions (service.ts)
lib/auth/               Better Auth: Google + passkey; requireAdmin() gate in guard.ts
lib/mail/send.ts        Resend when RESEND_API_KEY is set, otherwise a logged dry run
app/admin/              login, passkey enrol/verify, dashboard, create, card page
proxy.ts                redirects /admin/* without a session cookie to the login page
```

Locally nothing needs provisioning: copy `.env.example` to `.env.local`,
set `ADMIN_EMAILS`, then `yarn db:migrate` and `yarn admin:seed` (with
`ADMIN_DEV_PASSWORD_LOGIN=true` and an `ADMIN_DEV_PASSWORD`) and sign in
with the password form. Production sign-in is Google, restricted to
`ADMIN_EMAILS`, plus a passkey that every session must be created with
(`ADMIN_REQUIRE_PASSKEY`, default on). On Vercel: Neon Postgres via the
Storage tab for `DATABASE_URL`, run `yarn db:migrate` as a build step,
and set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, the Google OAuth client
and later `RESEND_API_KEY`.

PDFs (`lib/pdf`): the invoice and the gift card are rendered on demand with
@react-pdf/renderer from the database row, served by
`/api/admin/cards/:id/invoice|card` and attached to the two emails. Fonts
are TTF copies of Raleway and Cormorant Garamond in `lib/pdf/fonts`; the
logo is re-emitted from `logo.svg` as vector paths. Issuer identity is in
`lib/pdf/issuer.ts`; bank details come from `INVOICE_*` env vars and are
never committed.

Public requests: the form on /davanu-karte posts to
`/api/giftcard-request`, which creates a draft (amount 0, source "web",
the customer's text as the first event) and emails the owner (MAIL_BCC, else
the first ADMIN_EMAILS address). A honeypot field drops bots. The draft
cannot be sent until the admin edits in a price.

## Images

Every photo goes through `next/image`: the heroes with `fill` + `priority`
(they are the LCP element), the cards with fixed dimensions and a `sizes`
hint. `next.config.js` serves AVIF first, caches optimized variants for 31
days, and sends a 31-day `Cache-Control` for the originals under
`/static/*` (images only; the manifest stays uncached). The files are not
content-hashed, so replacing a photo under the same name takes up to a month
to reach returning visitors — rename it if that matters.

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

- `en/` and `ru/` copy for the contacts page chrome still holds Latvian
  placeholders (`contacts_meta_*`, `contacts_header_*`). The home page,
  reviews page, 404 and service descriptions are translated.
- The www → apex redirect is a Vercel domain setting and currently a 307;
  flip it to 308 in the Vercel dashboard.
