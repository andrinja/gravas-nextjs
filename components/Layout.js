import Navbar from "./navbar/Navbar";
import MainFooter from "./main-footer/MainFooter";
import Seo from "./seo/Seo";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Container from "./container/style";

// Route-change progress bar and page-view tracking both live in
// pages/_app.js, driven by router.events. The <meta name="keywords"> that
// used to be emitted here has been dropped: no search engine has read it
// since 2009.
const Layout = ({ children, title, description, image = null }) => {
  return (
    <ThemeProvider theme={theme}>
      <Seo title={title || ""} description={description} image={image} />
      <Navbar />
      <Container>
		  {children}
	  </Container>
	  <MainFooter/>
    </ThemeProvider>
  )
}

export default Layout;
