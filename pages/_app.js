import React from "react";
import App from "next/app";
import Head from 'next/head';
import { Global, css } from "@emotion/core";
import { appWithTranslation } from 'next-i18next';

//uses the App component to initialize pages
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      namespacesRequired: ["navbar"],
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
		<>
			<Global
				styles={css`
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
				<meta name="google-site-verification" content="FZcWhbzt4eDfLszahYRguIoAxD3eGvc4mYYplruNtk8"/>
				</Head>
			<Component {...pageProps} />
		</>
	)
  }
}

export default appWithTranslation(MyApp);
