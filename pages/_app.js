import React, { useEffect } from "react";
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { Raleway } from 'next/font/google';
import { Global, css } from "@emotion/react";
import { appWithTranslation } from 'next-i18next/pages';
import NProgress from 'nprogress';

// Global stylesheets may only be imported from _app in the pages router.
// nprogress.css used to be a render-blocking <link> to cdnjs in <Head>;
// now both are bundled.
import 'nprogress/nprogress.css';
import 'react-responsive-modal/styles.css';

// Self-hosted by next/font: the files are downloaded at build time and served
// from /_next/static, so there is no request to Google at runtime and no
// flash of fallback font. This replaces a <link rel="preload"> to
// fonts.googleapis.com that had no `as` attribute — browsers drop such
// preloads, and there was no <link rel="stylesheet"> either, so Raleway never
// loaded at all and the whole site rendered in Times.
//
// latin-ext covers Latvian diacritics (ā, č, ē, ģ, ī, ķ, ļ, ņ, š, ū, ž);
// cyrillic covers the Russian locale.
const raleway = Raleway({
  weight: ['300', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
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

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: ${raleway.style.fontFamily}, sans-serif;
          }
          a {
            text-decoration: none !important;
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
      <Component {...pageProps} />
    </>
  );
}

// No getInitialProps here. The old class component defined one that only
// returned `namespacesRequired`, a next-i18next v6 concept later versions
// ignore, and its mere presence opted every page without getStaticProps out
// of Automatic Static Optimization.
export default appWithTranslation(MyApp);
