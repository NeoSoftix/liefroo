import Header from "./Header";
import Footer from "./Footer";
import { Seo } from "../shared";

/**
 * Page shell shared by every routed page: SEO tags, header, main content
 * and footer. Remaining props (title, description, path, noIndex, …) go
 * straight to <Seo>; `dark` switches the header to its variant for pages
 * that open on a dark hero.
 */
export default function PageLayout({ dark = false, children, ...seo }) {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo {...seo} />
      <Header dark={dark} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
