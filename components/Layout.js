import MainFooter from "./main-footer/MainFooter";
import Seo from "./seo/Seo";
import Container from "./container/style";

// Per-page frame: head metadata, the page column and the site footer.
// The ThemeProvider and the Navbar live in pages/_app.js so they persist
// across route changes while the page content animates in and out.
const Layout = ({ children, title, description, image = null }) => {
  return (
    <>
      <Seo title={title || ""} description={description} image={image} />
      <Container>
		  {children}
	  </Container>
	  <MainFooter/>
    </>
  )
}

export default Layout;
