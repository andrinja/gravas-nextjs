import Document, { Head, Html, Main, NextScript } from "next/document";
import { colors } from "../components/theme";

// Pages in Next.js skip the definition of the surrounding document's markup;
// this extends the Document class to provide it.
//
// Fonts and global styles are NOT here. Raleway is loaded through next/font
// in pages/_app.js, and the global reset lives in the Emotion <Global> there.
// A styled-jsx <style global> block used to sit under <NextScript/>, but
// styled-jsx is not processed in _document, so the body font-family it set
// never applied.
export default class MyDocument extends Document {
  render() {
    // Every locale used to advertise lang="lv".
    const locale = this.props.__NEXT_DATA__?.locale || "lv";
    return (
      <Html lang={locale}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color={colors.primary}
          />
          <meta name="msapplication-TileColor" content={colors.primary} />
          <meta name="theme-color" content={colors.primary} />
          <link rel="shortcut icon" href="/static/favicon.png" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
