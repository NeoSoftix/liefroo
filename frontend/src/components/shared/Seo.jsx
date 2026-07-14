import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo.png";

const SITE_NAME = "Liefro";
// Fixed on purpose (not window.location.origin) — OG tags are baked into static
// HTML at build time by scripts/prerender.mjs, which runs against a local
// preview server (http://localhost:4173). Using window.location.origin there
// would bake "localhost:4173" into the deployed OG/canonical URLs.
const SITE_URL = "https://liefro.com";
const DEFAULT_TITLE = "Liefro — All-in-One Restaurant Operating System";
const DEFAULT_DESCRIPTION =
  "Manage orders, POS, delivery, marketing, and analytics from one powerful platform built for modern restaurants.";

/**
 * Sets the document title plus Open Graph / Twitter meta tags for a page.
 * `path` should be the route (e.g. "/menu-management") used to build the canonical/og:url.
 */
export default function Seo({ title, description, path = "", image, noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}${image || logo}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
