import { useEffect } from "react";
import Head from "next/head";
import Navbar from "./navbar/Navbar";
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

const Layout = ({ children, title, description }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title || ""}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <meta property="title" content={title || ""}></meta>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="pirts rituals, naktsmitnes, aktiva atputa, pirts rituali, kazu svinibas, svinibu telpas, viesu majas ire"
        />
        <meta name="url" content="https://www.gravas.lv/"></meta>
        <meta
          property="image"
          content="https://www.gravas.lv/static/home/gravas-atputa-bauska.jpg?webp?lqip"
        ></meta>
      </Head>
      <Navbar />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;
