import Document, { Head, Html, Main, NextScript } from "next/document";

//Pages in Next.js skip the definition of the surrounding document's markup
//extends the Document clas
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="lv">
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
            href="/staticsafari-pinned-tab.svg"
            color="#1E514B"
          />
          <meta name="msapplication-TileColor" content="#1E514B" />
          <meta name="theme-color" content="#1E514B" />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,500,600,700&display=swap"
            rel="preload"
          />
          <link rel="short cut icon" href="/static/favicon.png" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
          <style global jsx>
            {`
              body {
                font-family: "Raleway", sans-serif;
                font-display: swap;
              }
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
            `}
          </style>
          {/* <script src="https://js.stripe.com/v3/"></script> */}
        </body>
      </Html>
    );
  }
}
