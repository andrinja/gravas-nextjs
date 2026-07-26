import { useEffect } from "react";
import Head from "next/head";
import Navbar from "./navbar/Navbar";
import MainFooter from "./main-footer/MainFooter";
import Seo from "./seo/Seo";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import Container from "./container/style";
import Router from "next/router";
import NProgress from "nprogress";
import { initGA, logPageView } from "../utils/analytics";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ children, title, description, image = null }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });

  return (
    <ThemeProvider theme={theme}>
      <Seo title={title || ""} description={description} image={image} />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <meta
          name="keywords"
          content="pirts rituals, naktsmitnes, aktiva atputa, pirts rituali, kazu svinibas, svinibu telpas, viesu majas ire"
        />
      </Head>
      <Navbar />
      <Container>
		  {children}
	  </Container>
	  <MainFooter/>
    </ThemeProvider>
  )
}

export default Layout;
