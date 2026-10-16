import React, { useEffect } from "react";
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { Raleway, Cormorant_Garamond } from 'next/font/google';
import { Global, css, ThemeProvider } from "@emotion/react";
import { appWithTranslation } from 'next-i18next/pages';
import NProgress from 'nprogress';
import theme from '../components/theme';
import Navbar from '../components/navbar/Navbar';
import PageTransition from '../components/page-transition/PageTransition';

// Global stylesheets may only be imported from _app in the pages router.
// nprogress.css used to be a render-blocking <link> to cdnjs in <Head>;
// now both are bundled.
import 'nprogress/nprogress.css';
import 'react-responsive-modal/styles.css';

// Self-hosted by next/font: the files are downloaded at build time and served
// from /_next/static, so there is no request to Google at runtime and no
// flash of fallback font.
//
// latin-ext covers Latvian diacritics (ā, č, ē, ģ, ī, ķ, ļ, ņ, š, ū, ž);
// cyrillic covers the Russian locale.
const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-body',
});

// Display face for headlines (the "Lauku miers" redesign). Cormorant has no
// cyrillic subset on Google Fonts, so Russian headlines fall through to the
// Georgia/serif stack declared in theme.families.display.
const cormorant = Cormorant_Garamond({
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
});

// GA4 property. The previous react-ga integration loaded the Universal
// Analytics script (UA-24911009-1), which Google stopped processing in July
// 2023; data only kept arriving because Google forwards from the connected
// UA tag to this GA4 stream.
export const GA_MEASUREMENT_ID = 'G-TSZ2R9WG12';

function useRouteEffects() {
  const router = useRouter();
  useEffect(() => {
    const onStart = () => NProgress.start();
    const onDone = () => NProgress.done();
    const onComplete = url => {
      NProgress.done();
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
      }
    };
    // The initial page view is sent by the gtag config call itself.
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onComplete);
    router.events.on('routeChangeError', onDone);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onComplete);
      router.events.off('routeChangeError', onDone);
    };
  }, [router.events]);
}

function MyApp({ Component, pageProps }) {
  useRouteEffects();
  const router = useRouter();
  // The gallery lightbox is a full-screen view with its own close button.
  // /_error has no getStaticProps and so no navbar translations either.
  const showNavbar = !router.pathname.startsWith('/galerijas') && router.pathname !== '/_error';
  // Locale is part of the key so switching language animates like a route
  // change (asPath has no locale prefix).
  const routeKey = `${router.locale}:${router.asPath.split(/[?#]/)[0]}`;

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          :root {
            --font-body: ${raleway.style.fontFamily};
            --font-display: ${cormorant.style.fontFamily};
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            background: ${theme.colors.background};
          }
          body {
            font-family: ${theme.families.body};
            font-size: ${theme.fonts.body};
            line-height: 1.6;
            color: ${theme.colors.ink};
            background: ${theme.colors.background};
            -webkit-font-smoothing: antialiased;
          }
          h1, h2 {
            font-family: ${theme.families.display};
            font-weight: ${theme.fontWeight.semibold};
            line-height: 1.08;
            letter-spacing: -0.005em;
          }
          a {
            color: ${theme.colors.primary};
            text-decoration: none;
          }
          :focus-visible {
            outline: 2px solid ${theme.colors.primaryCool};
            outline-offset: 3px;
          }
          #nprogress .bar {
            background: ${theme.colors.secondaryDark};
            height: 3px;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px ${theme.colors.secondaryDark}, 0 0 5px ${theme.colors.secondaryDark};
          }
          .react-responsive-modal-modal {
            background: ${theme.colors.background};
            border-radius: ${theme.radii.md};
          }
        `}
      />
      <Head>
        {/* The page title used to be repeated here as a <meta name="...">
            attribute, which is not a thing. Titles are emitted by
            components/seo/Seo.tsx. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="google-site-verification" content="FZcWhbzt4eDfLszahYRguIoAxD3eGvc4mYYplruNtk8" />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      {showNavbar && <Navbar />}
      <PageTransition routeKey={routeKey}>
        <Component {...pageProps} />
      </PageTransition>
    </ThemeProvider>
  );
}

// No getInitialProps here. The old class component defined one that only
// returned `namespacesRequired`, a next-i18next v6 concept later versions
// ignore, and its mere presence opted every page without getStaticProps out
// of Automatic Static Optimization.
export default appWithTranslation(MyApp);
