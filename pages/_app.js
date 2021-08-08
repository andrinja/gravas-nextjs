
import React from "react";
import App from "next/app";
import Head from 'next/head';
import { appWithTranslation } from "../i18n";

'hello'

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
			<Head>
				<meta
				name="Pirts rituāli | Kāzu svinības | Viesu māja | GRAVAS"
				content="Individuāli pirts rituāli. Kāzas lauku stilā pie Bauskas. Viesu mājas īre ar aktīvo atpūtu un naktsmītnēm."/>
				<meta charSet="utf-8" />
				<meta name="robots" content="" />
				<meta name="viewport" content="width=device-width" />
				<meta name="google-site-verification" content="FZcWhbzt4eDfLszahYRguIoAxD3eGvc4mYYplruNtk8"/>
				</Head>
			<Component {...pageProps} />;
		</>
	)
  }
}

export default appWithTranslation(MyApp);
