import MainFooter from "./main-footer/MainFooter";
import Seo from "./seo/Seo";
import Container from "./container/style";
import { localBusiness } from "../lib/seo/structuredData";

// Per-page frame: head metadata, the page column and the site footer.
// The ThemeProvider and the Navbar live in pages/_app.js so they persist
// across route changes while the page content animates in and out.
//
// Every page carries the LocalBusiness record; pages add their own JSON-LD
// (product offers, FAQ, breadcrumbs) through `jsonLd`.
const Layout = ({ children, title, description, image = null, jsonLd = [] }) => {
  return (
    <>
      <Seo
        title={title || ""}
        description={description}
        image={image}
        jsonLd={[localBusiness(), ...jsonLd]}
      />
      <Container>
		  {children}
	  </Container>
	  <MainFooter/>
    </>
  )
}

export default Layout;
